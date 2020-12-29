import { ref, createVNode, render } from 'vue'
import loading from './index.vue'


export default {
  mounted (el, binding) {
    const instance = createVNode(loading)

    render(instance, document.createElement('div'))

    el.instance = instance
    el.style.position = 'relative'
    el.appendChild(el.instance.el)
  },
 
  updated (el, binding) {
  },
}