<template>
  <div class="main-container">
    <button @click="isShowModal = !isShowModal">toggle</button>
    <lbd-modal v-model="isShowModal">
      <template>
        <img class="rule" src="./rule.png">
      </template>
      <template #close>
        <img class="close" src="./close.png">
      </template>
    </lbd-modal>
  </div>
</template>

<script>
import Modal from '../Modal'
export default {
  name: 'example',
  components: {
    [Modal.name]: Modal
  },
  data: () => ({
    isShowModal: true,
    isShowModal2: true
  })
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

.rule {
  height: 65vh;
}

.close {
  width: .8rem;
}
</style>
