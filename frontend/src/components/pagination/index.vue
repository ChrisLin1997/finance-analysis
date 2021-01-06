<template lang="pug">
.pagination
  span(v-for="num of pageSize" @click="handlePage(num)" :class="{ 'active' : modelValue === num }") {{ num }}
</template>

<script>
export default {
  name: 'pagination',

  props: {
    modelValue: {
      type: Number,
      required: true,
    },

    pageSize: {
      type: Number,
      default: 0,
    },

    auto: {
      type: Boolean,
      default: false,
    },

    interval: {
      type: Number,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup (props, context) {
    const handlePage = (page) => { context.emit('update:modelValue', page) }

    if (props.auto) {
      setInterval(() => {
        const page = props.modelValue % props.pageSize + 1
        context.emit('update:modelValue', page)
      }, props.interval)
    }

    return {
      handlePage,
    }
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;

  span {
    margin: 0 4px;
    cursor: pointer;
    transition: all .2s;
    &:hover {
      opacity: .6;
    }
  }
}

.active {
  color: $active;
  font-weight: bold;
}
</style>
