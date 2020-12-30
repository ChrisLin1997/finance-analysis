<template lang="pug">
.search(:class="{ 'isActive' : isActive }")
  .search-icon(@click="handleClick()")
    awesome-icon(:icon="['fas', 'search']")
  transition(name="input")
    input.input(
      ref="inputElement"
      v-show="isActive"
      v-model="modelValue"
      @blur="handleBlur"
    )
</template>

<script>
import { ref, nextTick, watchEffect } from 'vue'

export default {
  name: 'search',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup (props, context) {
    const isActive = ref(false)
    const inputElement = ref(null)
    const handleClick = async () => {
      isActive.value = true
      await nextTick()
      if (inputElement.value) inputElement.value.focus()
    }

    watchEffect(()=> context.emit('update:modelValue', props.modelValue))
    const handleBlur = () => {
      isActive.value = false
    }

    return {
      isActive,
      inputElement,
      handleClick,
      handleBlur,
    }
  }
}
</script>

<style lang="scss" scoped>

.search {
  margin: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border-radius: 24px;
  background-color: transparent;
  transition: background-color .2s;
}

.isActive {
  background-color: $active-background;
}

.search-icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  font-size: 24px;
  border-radius: 100px;
  transition: all .2s;
  cursor: pointer;
  &:hover {
    background-color: $active-background;
    box-shadow: 0 0 4px 0 #aaa;
  }
}

.input {
  margin-left: 12px;
  width: 140px;
  height: 36px;
  color: #fff;
  background-color: transparent;
  border: none;
  outline: none;
}

.input-enter-from,
.input-leave-to {
  max-width: 0px;
}

.input-enter-active,
.input-leave-active {
  transition: all .2s;
}

.input-enter-to,
.input-leave-from {
  max-width: 140px;
}
</style>