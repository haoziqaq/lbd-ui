/**
* @fileOverview 模态框
* @platform MP | WEB
* @author 齐皓
* @date 2020/10/10
*/
<template>
  <div
    class="lbd-modal"
    v-if="isShowModal"
    :style="{'background-color': modalColor}"
    :class="[modalFade]"
    @click="closeModal"
    @animationend="handleAnimationend"
    :catchtouchmove="!canScroll"
    @touchmove="handleModalTouchmove"
  >
    <div class="main" @click.stop>
      <slot/>
    </div>
    <div class="close" @click="$emit('input', false)">
      <slot name="close"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LbdModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    modalColor: {
      type: String,
      default: 'rgba(0, 0, 0, .8)'
    },
    canScroll: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.value) {
          this.modalFade = 'lbd-fade-in'
          this.isShowModal = true
        } else {
          this.modalFade = 'lbd-fade-out'
        }
      }
    }
  },
  data: () => ({
    isShowModal: false,
    modalFade: 'lbd-fade-in'
  }),
  methods: {
    closeModal() {
      if (this.closeOnClickOverlay) {
        this.$emit('input', false)
      }
    },
    handleAnimationend() {
      if (!this.value) {
        this.isShowModal = false
      }
    },
    handleModalTouchmove(event) {
      !this.canScroll && event.preventDefault()
    }
  },
}
</script>

<style lang="scss">
@import "../../styles/animation";
.lbd-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  .close {
    margin-top: 2vh;
  }
}
</style>