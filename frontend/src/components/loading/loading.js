import { defineComponent} from 'vue'
const loadingConstructor = defineComponent(require("./index.vue").default)

export default {
  mounted (el, binding) {
    // const app = document.getElementById('app')
    console.log(loadingConstructor.mount())
    // app.appendChild()
    const elementInfo = el.getBoundingClientRect()
    const x = elementInfo.x
    const y = elementInfo.y
    const width = elementInfo.width
    const height = elementInfo.height
  }
}