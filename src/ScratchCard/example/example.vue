<template>
  <div class="main-container">
    <lbd-scratch-card
      class="scratch-card"
      :cover-image="require('./cover_card.png')"
      :inner-image="require('./win_card.png')"
      @start="handleScratchStart"
      @clear="handleScratchClear"
    />
  </div>
</template>

<script>
import ScratchCard from '../ScratchCard'
export default {
  name: 'example',
  components: {
    [ScratchCard.name]: ScratchCard
  },
  data: () => ({
    isShowModal: false
  }),
  methods: {
    handleScratchStart() {
      console.log('开始清除')
    },
    handleScratchClear() {
      console.log('清除完成')
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

.scratch-card {
  width: 60vw;
  height: 30vw;
  margin-top: 10vw;
}
</style>
