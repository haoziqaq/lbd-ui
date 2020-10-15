/**
* @fileOverview 垂直轮播滑块
* @platform WEB
* @author 齐皓
* @date 2020/10/14
*/
<template>
  <swiper-slide
    class="lbd-vertical-swiper-slide"
    :class="{'swiper-no-swiping': noSwipe}"
  >
    <div
      class="slide-background"
      :style="{
      'background-color': backgroundColor,
      'background-image': `url(${backgroundImage})`,
      'background-size': backgroundSize
      }"
    >
      <div
        class="slide-content"
        v-if="slideIndex === activeIndex || !lazy"
      >
        <slot/>
      </div>
    </div>
  </swiper-slide>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper'
import { findBrothersComponents, findComponentUpward } from '../../utils/componentHelper'
export default {
  name: 'LbdVerticalSwiperSlide',
  components: {
    SwiperSlide
  },
  props: {
    lazy: {
      type: Boolean,
      default: true
    },
    noSwipe: {
      type: Boolean,
      default: false
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    backgroundSize: {
      type: String,
      default: '100% 100%'
    },
    index: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    slideIndex: undefined,
    verticalSwiperInstance: null
  }),
  computed: {
    activeIndex() {
      return this.verticalSwiperInstance && this.verticalSwiperInstance.swiperInstance.activeIndex
    }
  },
  mounted() {
    this.verticalSwiperInstance = findComponentUpward(this, 'LbdVerticalSwiper')
    this.verticalSwiperInstance.verticalSwiperSlideInstances =
      findBrothersComponents(this, 'LbdVerticalSwiperSlide', false)
        .sort((a, b) => a.index - b.index)
    this.verticalSwiperInstance.resetSlideIndex()
  },
  destroyed() {
    this.verticalSwiperInstance.verticalSwiperSlideInstances.splice(
      this.verticalSwiperInstance.verticalSwiperSlideInstances.indexOf(this),
      1
    )
    this.verticalSwiperInstance.resetSlideIndex()
  }
}
</script>

<style scoped lang="scss">
.lbd-vertical-swiper-slide {
  width: 100vw;
  height: 100vh;

  .slide-background {
    width: 100vw;
    height: 100vh;
  }
}
</style>