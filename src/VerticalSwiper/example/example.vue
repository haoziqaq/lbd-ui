<template>
  <div class="main-container">
    <lbd-vertical-swiper
      ref="swiper"
      audio="http://www.yinpin.com/upload/jiansheshengtaiyiju1009020.mp3"
      :audio-image="require('./audio.svg')"
    >
      <lbd-vertical-swiper-slide
        background-color="red"
        :index="0"
      >
        <div class="page-1 animate__animated animate__slideInLeft">
          <div>page1</div>
          <div @click="isShowPage = !isShowPage">toggle page2</div>
        </div>
      </lbd-vertical-swiper-slide>
      <lbd-vertical-swiper-slide
        background-color="yellow"
        v-if="isShowPage"
        :index="1"
      >
        <div class="page-1 animate__animated animate__slideInLeft">page2</div>
      </lbd-vertical-swiper-slide>
      <lbd-vertical-swiper-slide
        :background-image="require('./bg.jpg')"
        :no-swipe="noSwipe"
        :index="2"
      >
        <div class="page-2 animate__animated animate__slideInRight">
          <div>page3</div>
          <div @click="noSwipe = !noSwipe">no swipe {{ noSwipe }}</div>
        </div>
      </lbd-vertical-swiper-slide>
    </lbd-vertical-swiper>
  </div>
</template>

<script>
import VerticalSwiper from '../VerticalSwiper'
import VerticalSwiperSlide from '../../VerticalSwiperSlide/VerticalSwiperSlide'
import 'animate.css'
export default {
  name: 'example',
  components: {
    [VerticalSwiper.name]: VerticalSwiper,
    [VerticalSwiperSlide.name]: VerticalSwiperSlide
  },
  data: () => ({
    noSwipe: false,
    isShowPage: true
  })
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

.page-1, .page-2 {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: .45rem;
  color: #fff;
}
</style>
