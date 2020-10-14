/**
* @fileOverview 垂直轮播
* @platform WEB
* @author 齐皓
* @date 2020/10/14
*/
<template>
  <div class="lbd-vertical-swiper">
    <audio class="lbd-audio" ref="audio" loop :src="audio"></audio>
    <img
      class="lbd-audio-image lbd-rotate-infinity"
      :class="{'lbd-animation-paused': audioState === 'paused'}"
      v-if="audioImage && audio"
      :src="audioImage"
      @click="changeAudioState"
    >
    <swiper
      class="lbd-swiper"
      ref="swiper"
      :options="swiperOptions"
      v-on="$listeners"
    >
      <slot/>
    </swiper>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'LbdVerticalSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    audio: {
      type: String
    },
    audioImage: {
      type: String
    }
  },
  data: () => ({
    swiperInstance: {},
    verticalSwiperSlideInstances: [],
    swiperOptions: {
      direction: 'vertical',
      noSwiping: true
    },
    audioState: 'playing'
  }),
  methods: {
    changeAudioState() {
      if (this.$refs['audio'].paused) {
        this.$refs['audio'].play()
        this.audioState = 'playing'
      } else {
        this.$refs['audio'].pause()
        this.audioState = 'paused'
      }
    }
  },
  mounted() {
    if (this.audio) {
      document.addEventListener('WeixinJSBridgeReady', () => {
        this.$refs['audio'].play()
      })
      this.$refs['audio'].play()
    }
    this.swiperInstance = this.$refs['swiper'].$swiper
  }
}
</script>

<style lang="scss">
@import '../../styles/animation';
.lbd-vertical-swiper {
  position: relative;

  .lbd-audio-image {
    position: absolute;
    top: 5vw;
    right: 5vw;
    width: 10vw;
    height: 10vw;
    z-index: 100;
  }

  .lbd-swiper {
    width: 100vw;
    height: 100vh;
  }

  .lbd-audio {
    position: absolute;
    top: -9999px;
  }
}
</style>