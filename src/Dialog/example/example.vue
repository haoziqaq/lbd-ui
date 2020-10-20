<template>
  <div class="main-container">
    <lbd-dialog
      v-model="isShowDialog"
      title="声明式弹窗"
      message="测试声明式弹窗"
      :show-cancel-button="true"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
    <button @click="showDialog">弹出</button>
  </div>
</template>

<script>
import Dialog from '../index'
export default {
  name: 'example',
  components: {
    [Dialog.name]: Dialog
  },
  data: () => ({
    isShowDialog: false
  }),
  methods: {
    showDialog() {
      this.isShowDialog = true
      Dialog
        .confirm('测试confirm')
        .then(() => {
          console.log('confirm确认')
        })
        .catch(() => {
          console.log('confirm取消')
        })

      Dialog
        .alert({
          title: '测试alert标题',
          message: '测试alert内容'
        })
        .then(() => {
          console.log('alert确认')
        })

      Dialog
        .alert('测试alert')
        .then(() => {
          console.log('alert确认')
        })
    },
    handleConfirm() {
      console.log('声明式确认')
    },
    handleCancel() {
      console.log('声明式取消')
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
</style>
