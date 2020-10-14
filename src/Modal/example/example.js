import Vue from 'vue'
import '../../../utils/rem'
import example from './example.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(example),
}).$mount('#app')
