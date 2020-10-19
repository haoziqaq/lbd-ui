/**
* @fileOverview 刮刮卡
* @platform WEB
* @author 齐皓
* @date 2020/10/19
*/
<template>
  <div ref="scratchCard" class="lbd-scratch-card">
    <div class="inner-container" v-show="isShowInner">
      <img class="inner-image" :src="innerImage"/>
    </div>
    <canvas ref="scratchCanvas"></canvas>
  </div>
</template>
<script>

export default {
  name: 'LbdScratchCard',
  data() {
    return {
      canvas: null,
      isShowInner: false,
      firstTouch: true
    }
  },
  props: {
    scratchRadius: {
      type: Number,
      default: 15
    },
    scratchClearRatio: {
      type: Number,
      default: 0.3
    },
    coverImage: {
      type: String,
      required: true
    },
    innerImage: {
      type: String,
      required: true
    }
  },
  methods: {
    init() {
      const canvasWrap = this.$refs['scratchCard']
      this.canvas = this.$refs['scratchCanvas']
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width = canvasWrap.clientWidth
      this.canvas.height = canvasWrap.clientHeight
      this.createCanvasCover()
      this.canvas.addEventListener('touchstart', this.handleCanvasTouchstart)
    },
    createCanvasCover() {
      const coverImage = new Image()
      coverImage.src = this.coverImage
      coverImage.onload = () => {
        this.ctx.drawImage(coverImage, 0, 0, this.canvas.width, this.canvas.height)
      }
    },
    handleCanvasTouchstart(e) {
      e.preventDefault()
      if (this.firstTouch) {
        this.$emit('start')
        this.firstTouch = false
      }
      this.isShowInner = true
      this.canvas.addEventListener('touchmove', this.handleCanvasTouchmove)
      document.addEventListener('touchend', this.handleCanvasTouchend)
    },
    handleCanvasTouchmove(e) {
      e.preventDefault()
      const touch = e.touches[0]
      const canvasPos = this.canvas.getBoundingClientRect(),
        scrollT = document.documentElement.scrollTop || document.body.scrollTop,
        scrollL = document.documentElement.scrollLeft || document.body.scrollLeft,
        mouseX = touch.pageX - canvasPos.left - scrollL,
        mouseY = touch.pageY - canvasPos.top - scrollT

      this.ctx.beginPath()
      this.ctx.fillStyle = '#FFFFFF'
      this.ctx.globalCompositeOperation = 'destination-out'
      this.ctx.arc(mouseX, mouseY, this.scratchRadius, 0, 2 * Math.PI)
      this.ctx.fill()
    },
    handleCanvasTouchend(e) {
      e.preventDefault()
      this.canvas.removeEventListener('touchmove', this.handleCanvasTouchmove)
      document.removeEventListener('touchend', this.handleCanvasTouchend)
      this.computeArea()
    },
    computeArea() {
      let pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      let transPixels = []

      pixels.data.map((item, i) => {
        const pixel = pixels.data[i + 3]
        if (pixel === 0) {
          transPixels.push(pixel)
        }
      })

      if (transPixels.length / pixels.data.length > this.scratchClearRatio) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.removeEventListener('touchstart', this.handleCanvasTouchstart)
        this.canvas.removeEventListener('touchmove', this.handleCanvasTouchmove)
        document.removeEventListener('touchend', this.handleCanvasTouchend,)
        this.$emit('clear')
      }
    }
  },
  mounted() {
    this.$nextTick(() => this.init())
  }
}
</script>

<style lang='scss'>
.lbd-scratch-card {
  position: relative;
  width: 90%;
  height: 40vw;
  margin: 0 auto;

  .inner-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    .inner-image {
      width: 100%;
      height: 100%;
    }
  }

  canvas {
    position: relative;
    z-index: 2;
    position: absolute;
  }
}
</style>
