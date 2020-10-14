<template>
  <div class="main-container">
    <lbd-shake ref="shake" @shake="handleShake" @permissionRefused="handlePermissionRefused"/>
    <button @click="$refs['shake'].startShake()">授权</button>
    <div>次数: {{ count }}</div>
  </div>
</template>

<script>
import Shake from '../Shake'
export default {
  name: 'example',
  components: {
    [Shake.name]: Shake
  },
  data: () => ({
    count: 0
  }),
  methods: {
    handleShake() {
      this.count++
    },
    handlePermissionRefused() {
      console.log(2)
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
