import { createVNode, render } from 'vue'
import loading from './index.vue'

const instance = createVNode(loading)

export default {
  mounted (el, binding) {
    render(instance, document.createElement('div'))

    setLoadingStyle(instance.el, binding.value)
    el.style.position = 'relative'
    el.appendChild(instance.el)
  },

  updated (el, binding) {
    setLoadingStyle(instance.el, binding.value)
  },
}

function setLoadingStyle (el, value) {
  el.style.opacity = value ? '1' : '0'
}