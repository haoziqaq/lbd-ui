<template>
  <div class="main-container">
    <button @click="isShowTop = !isShowTop">top</button>
    <button @click="isShowBottom = !isShowBottom">bottom</button>
    <button @click="isShowLeft = !isShowLeft">left</button>
    <button @click="isShowRight = !isShowRight">right</button>
    <lbd-drawer v-model="isShowBottom">
      <template>
        <div class="drawer-bottom">底部弹出</div>
      </template>
    </lbd-drawer>
    <lbd-drawer v-model="isShowTop" position="top">
      <template>
        <div class="drawer-top">顶部弹出</div>
      </template>
    </lbd-drawer>
    <lbd-drawer v-model="isShowLeft" position="left">
      <template>
        <div class="drawer-left">左侧弹出</div>
      </template>
    </lbd-drawer>
    <lbd-drawer v-model="isShowRight" position="right">
      <template>
        <div class="drawer-right">右侧弹出</div>
      </template>
    </lbd-drawer>
  </div>
</template>

<script>
import Drawer from '../Drawer'
export default {
  name: 'example',
  components: {
    [Drawer.name]: Drawer
  },
  data: () => ({
    isShowBottom: false,
    isShowTop: false,
    isShowLeft: false,
    isShowRight: false
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

.drawer-bottom, .drawer-top {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100vw;
  height: 1rem;
  font-size: .32rem;
}

.drawer-left, .drawer-right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35vw;
  height: 100vh;
  font-size: .32rem;
}
</style>
