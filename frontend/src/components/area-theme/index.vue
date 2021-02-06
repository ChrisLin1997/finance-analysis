<template lang="pug">
.area(class="mt-4 mb-6")
  header(class="text-left")
    slot(name="pretitle")
    awesome-icon(:icon="['fas', icon]" class="mr-2")
    span {{ title }}
    slot(name="posttitle")
  article(class="mt-2")
    slot(name="content")
</template>

<script>
export default {
  name: 'area-theme',

  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
