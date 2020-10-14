<template>
  <div class="main-container">
    <lbd-vertical-swiper
      ref="swiper"
      audio="http://www.yinpin.com/upload/jiansheshengtaiyiju1009020.mp3"
      audio-image="http://as.eqh5.com/h5_view_2/images/bgmBtn-fbd2dc.svg"
    >
      <lbd-vertical-swiper-slide background-color="red">
        <div class="page-1 animate__animated animate__slideInLeft">page1</div>
      </lbd-vertical-swiper-slide>
      <lbd-vertical-swiper-slide
        :background-image="require('./bg.jpg')"
        :no-swipe="noSwipe"
      >
        <div class="page-2 animate__animated animate__slideInRight">
          <div>page2</div>
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
    noSwipe: false
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
