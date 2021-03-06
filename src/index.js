import ClockIn from './ClockIn'
import Dialog from './Dialog'
import Drawer from './Drawer'
import LuckyDraw from './LuckyDraw'
import Modal from './Modal'
import Questions from './Questions'
import ScratchCard from './ScratchCard'
import Shake from './Shake'
import Tabs from './Tabs'
import VerticalSwiper from './VerticalSwiper'
import VerticalSwiperSlide from './VerticalSwiperSlide'

export {
  ClockIn,
  Dialog,
  Drawer,
  LuckyDraw,
  Modal,
  Questions,
  ScratchCard,
  Shake,
  Tabs,
  VerticalSwiper,
  VerticalSwiperSlide
}

export default {
  install(Vue) {
    Vue.component(ClockIn.name, ClockIn)
    Vue.component(Dialog.name, Dialog)
    Vue.component(Drawer.name, Drawer)
    Vue.component(LuckyDraw.name, LuckyDraw)
    Vue.component(Modal.name, Modal)
    Vue.component(Questions.name, Questions)
    Vue.component(ScratchCard.name, ScratchCard)
    Vue.component(Shake.name, Shake)
    Vue.component(Tabs.name, Tabs)
    Vue.component(VerticalSwiper.name, VerticalSwiper)
    Vue.component(VerticalSwiperSlide.name, VerticalSwiperSlide)
  }
}
