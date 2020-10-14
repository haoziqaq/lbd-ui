/**
* @fileOverview 摇一摇
* @platform WEB
* @author 齐皓
* @date 2020/10/10
*/
<template>
  <div class="lbd-shake"></div>
</template>

<script>
export default {
  name: 'LbdShake',
  props: {
    responseRate: {
      type: Number,
      default: 10,
    }
  },
  data: () => ({}),
  methods: {
    handleShake() {},
    startShake() {
      this.stopShake()
      let lastX, lastY, lastZ = 0
      let lastTime, currentTime
      let speed_
      lastTime = new Date().getTime()
      this.handleShake = (e) => {
        let { x, y, z } = e.accelerationIncludingGravity
        currentTime = new Date().getTime()
        if ((currentTime - lastTime) > 300) {
          speed_ = Math.abs(x + y + z - lastX - lastY - lastZ) / (currentTime - lastTime) * 300
          lastX = x
          lastY = y
          lastZ = z
          lastTime = currentTime
          if (speed_ > this.responseRate) {
            this.$emit('shake')
          }
        }
      }
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
          .then(response => {
            if (response === 'granted') {
              if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', this.handleShake)
              }
            }
          })
          .catch(err => {
            this.$emit('permissionRefused')
          })
      } else {
        if (window.DeviceMotionEvent) {
          window.addEventListener('devicemotion', this.handleShake)
        }
      }
    },
    stopShake() {
      window.removeEventListener('devicemotion', this.handleShake)
    }
  },
  beforeDestroy() {
    this.stopShake()
  }
}
</script>

<style lang="scss">
.lbd-shake {
}
</style>