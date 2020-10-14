/**
* @fileOverview 抽屉
* @platform MP | WEB
* @author 齐皓
* @date 2020/10/10
*/
<template>
  <div
    class="lbd-drawer"
    v-if="isShowModal"
    :style="{'background-color': modalColor}"
    :class="[modalFade]"
    @click="closeDrawer"
    @animationend="handleAnimationend"
    :catchtouchmove="!canScroll"
    @touchmove="handleModalTouchmove"
  >
    <div
      class="main"
      :class="[drawerSlide, `position-${position}`]"
      :style="{'background-color': drawerColor}"
      @click.stop
    >
      <slot/>
    </div>
  </div>
</template>

<script>
const slideAnimations = {
  bottom(open) {
    return open ? 'lbd-bottom-slide-up' : 'lbd-bottom-slide-down'
  },
  top(open) {
    return open ? 'lbd-top-slide-down' : 'lbd-top-slide-up'
  },
  left(open) {
    return open ? 'lbd-left-slide-right' : 'lbd-left-slide-left'
  },
  right(open) {
    return open ? 'lbd-right-slide-left' : 'lbd-right-slide-right'
  }
}
export default {
  name: 'LbdDrawer',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    modalColor: {
      type: String,
      default: 'rgba(0, 0, 0, .8)'
    },
    drawerColor: {
      type: String,
      default: '#fff'
    },
    canScroll: {
      type: Boolean,
      default: false
    },
    // top right bottom left
    position: {
      type: String,
      default: 'bottom'
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.value) {
          this.drawerSlide = this.createSlideAnimate(true)
          this.modalFade = 'lbd-fade-in'
          this.isShowModal = true
        } else {
          this.drawerSlide = this.createSlideAnimate(false)
          this.modalFade = 'lbd-fade-out'
        }
      }
    }
  },
  data: () => ({
    isShowModal: false,
    drawerSlide: 'lbd-slide-up',
    modalFade: 'lbd-fade-in',
  }),
  methods: {
    closeDrawer() {
      if (this.closeOnClickOverlay) {
        this.$emit('input', false)
      }
    },
    handleAnimationend() {
      if (!this.value) {
        this.isShowModal = false
      }
    },
    createSlideAnimate(open) {
      return slideAnimations[this.position](open)
    },
    handleModalTouchmove(event) {
      !this.canScroll && event.preventDefault()
    }
  },
}
</script>

<style lang="scss">
@import "../../styles/animation";
.lbd-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  .main {
    position: absolute;
  }

  .position-left {
    left: 0;
    top: 0;
  }

  .position-right {
    right: 0;
    top: 0;
  }

  .position-top {
    left: 0;
    top: 0;
  }

  .position-bottom {
    left: 0;
    bottom: 0;
  }
}
</style>