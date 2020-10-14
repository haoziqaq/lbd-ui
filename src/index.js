import Drawer from './Drawer'
import LuckyDraw from './LuckyDraw'
import Modal from './Modal'
import Shake from './Shake'
import VerticalSwiper from './VerticalSwiper'
import VerticalSwiperSlide from './VerticalSwiperSlide'

export {
  Drawer,
  LuckyDraw,
  Modal,
  Shake,
  VerticalSwiper,
  VerticalSwiperSlide
}

export default {
  install(Vue) {
    Vue.component(Drawer.name, Drawer)
    Vue.component(LuckyDraw.name, LuckyDraw)
    Vue.component(Modal.name, Modal)
    Vue.component(Shake.name, Shake)
    Vue.component(VerticalSwiper.name, VerticalSwiper)
    Vue.component(VerticalSwiperSlide.name, VerticalSwiperSlide)
  }
}
