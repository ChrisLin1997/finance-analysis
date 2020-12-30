import { createVNode, render } from 'vue'
import loading from './index.vue'

export default {
  mounted (el, binding) {
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
  el.style.opacity = value ? '1' : '0'
}