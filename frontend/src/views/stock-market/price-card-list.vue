<template lang="pug">
section(class="w-full flex justify-between")
  article(v-for="item of data" :key="item.id" class="p-4 w-64 h-24 flex flex-col justify-between font-bold bg-grayPrimary rounded-lg cursor-pointer")
    div(class="w-full flex justify-between text-lg")
      span(class="text-active") {{ item.name }}
      span(:class="item.isUp ? 'text-up' : 'text-down'") {{ item.price }}
    div(class="w-full flex justify-between")

    div(class="w-full flex justify-between opacity-80")
      span {{ item.id }}
      span(:class="item.isUp ? 'text-up' : 'text-down'") {{ item.change }} ( {{ item.changePercent }} )

</template>

<script>
export default {
  name: 'price-card-list',

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  setup () {
  },
}
</script>
