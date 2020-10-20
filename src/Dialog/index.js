import Vue from 'vue'
import Dialog from './Dialog'

function mount(instance) {
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}

function bindEvent(instance, resolve, reject) {
  instance.$on('input', (value) => {
    instance.value = value
  })
  instance.$on('confirm', () => {
    resolve()
  })
  instance.$on('cancel', () => {
    reject()
  })
}

Dialog.install = function(Vue) {
  Vue.component(Dialog.name, Dialog)
}

Dialog.alert = function(options) {
  const propsData = typeof options === 'string'
    ? { message: options }
    : options
  return new Promise((resolve, reject) => {
    const DialogCtor = Vue.extend(Dialog)
    const instance = mount(new DialogCtor({
      propsData: {
        value: true,
        ...propsData,
        _dynamic: true
      }
    }))
    bindEvent(instance, resolve, reject)
  })
}

Dialog.confirm = function(options) {
  const propsData = typeof options === 'string'
    ? { message: options }
    : options
  return new Promise((resolve, reject) => {
    const DialogCtor = Vue.extend(Dialog)
    const instance = mount(new DialogCtor({
      propsData: {
        value: true,
        showCancelButton: true,
        ...propsData,
        _dynamic: true
      }
    }))
    bindEvent(instance, resolve, reject)
  })
}

export default Dialog
