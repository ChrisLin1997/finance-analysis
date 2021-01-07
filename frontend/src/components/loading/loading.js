import { createVNode, render } from 'vue'
import loading from './index.vue'

let rawDisply = ''

export default {
  mounted (el, binding) {
    rawDisply = el.style.display

    const instance = createVNode(loading)
    render(instance, document.createElement('div'))

    el.instance = instance
    setLoadingStyle(el.instance.el, binding.value)

    el.style.position = 'relative'
    el.appendChild(el.instance.el)
  },

  updated (el, binding) {
    setLoadingStyle(el.instance.el, binding.value)
  },
}

function setLoadingStyle (el, value) {
  el.style.display = value ? rawDisply : 'none'
}
