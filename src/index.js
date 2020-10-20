import Dialog from './Dialog'
import Drawer from './Drawer'
import LuckyDraw from './LuckyDraw'
import Modal from './Modal'
import ScratchCard from './ScratchCard'
import Shake from './Shake'
import Tabs from './Tabs'
import VerticalSwiper from './VerticalSwiper'
import VerticalSwiperSlide from './VerticalSwiperSlide'

export {
  Dialog,
  Drawer,
  LuckyDraw,
  Modal,
  ScratchCard,
  Shake,
  Tabs,
  VerticalSwiper,
  VerticalSwiperSlide
}

export default {
  install(Vue) {
    Vue.component(Dialog.name, Dialog)
    Vue.component(Drawer.name, Drawer)
    Vue.component(LuckyDraw.name, LuckyDraw)
    Vue.component(Modal.name, Modal)
    Vue.component(ScratchCard.name, ScratchCard)
    Vue.component(Shake.name, Shake)
    Vue.component(Tabs.name, Tabs)
    Vue.component(VerticalSwiper.name, VerticalSwiper)
    Vue.component(VerticalSwiperSlide.name, VerticalSwiperSlide)
  }
}
