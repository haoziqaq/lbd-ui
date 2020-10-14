/**
* @fileOverview 转盘
* @platform MP | WEB
* @author 齐皓
* @date 2020/10/10
*/
<template>
  <div class="lbd-lucky-draw">
    <div class="lbd-plate-container">
      <div
        class="lbd-plate"
        :style="{
        'transform': `rotate(${rotate}deg)`,
        'transition': `all ${stopped ? 0 : duration}s`
        }"
        @transitionend="$emit('luckyDrawEnd', pickedRotate)"
        v-if="mode === 'plate'"
      >
        <slot name="plate" />
      </div>
      <div class="lbd-plate" v-else>
        <slot name="plate" />
      </div>
      <div
        class="lbd-bin"
        :style="{
        'transform': `translate(-50%, -50%) rotate(${rotate}deg)`,
        'transition': `all ${stopped ? 0 : duration}s`
        }"
        @transitionend="$emit('luckyDrawEnd', pickedRotate)"
        v-if="mode === 'bin'"
      >
        <slot name="bin" />
      </div>
      <div class="lbd-bin" v-else>
        <slot name="bin" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LbdLuckyDraw',
  props: {
    baseRotate: {
      type: Number,
      default: 1800
    },
    duration: {
      type: Number,
      default: 5
    },
    mode: {
      type: String,
      default: 'plate'
    }
  },
  data: () => ({
    stopped: true,
    rotate: 0,
    pickedRotate: 0,
  }),
  methods: {
    luckyDraw(rotate) {
      this.stopped = false
      this.pickedRotate = rotate
      this.rotate = this.baseRotate + this.pickedRotate
    },
    reset() {
      this.stopped = true
      this.rotate = 0
      this.pickedRotate = 0
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss">
.lbd-lucky-draw {
  display: flex;
  justify-content: center;

  .lbd-plate-container {
    position: relative;

    .lbd-plate {
      position: relative;
      z-index: 1;
    }

    .lbd-bin {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
    }
  }
}
</style>