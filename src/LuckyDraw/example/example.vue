<template>
  <div class="main-container">
    <lbd-lucky-draw
      ref="luckyDraw"
      @luckyDrawEnd="stop"
      @reset="handleReset"
    >
      <template #plate>
        <img class="plate" src="./draw.png">
      </template>
      <template #bin>
        <img class="start" src="./draw_start.png" @click="start">
      </template>
    </lbd-lucky-draw>
    <button @click="$refs['luckyDraw'].reset()">reset</button>
  </div>
</template>

<script>
import LuckyDraw from '../LuckyDraw'
export default {
  name: 'example',
  components: {
    [LuckyDraw.name]: LuckyDraw
  },
  methods: {
    start() {
      this.$refs['luckyDraw'].luckyDraw(180)
    },
    stop(rotate) {
      console.log(`转盘相对位置是${rotate}`)
    },
    handleReset() {
      console.log('转盘重置了...')
    }
  }
}
</script>

<style lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

body {
  margin: 0;
  padding: 0;
}

.plate {
  width: 6rem;
  height: 6rem;
}

.start {
  width: 1.6rem;
}

button {
  margin-top: .2rem;
  font-size: .35rem;
}
</style>
