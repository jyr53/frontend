<template>
  <div>{{ purifiedText }}</div>
</template>
<script>
export default {
  name: 'OptionsFilter',
  props: {
    texte: {
      type: String,
      required: true,
    },
  },
  computed: {
    purifiedText() {
      return this.texte.replace(/<\/?span[^>]*>/g, '')
    },
  },
}
</script>
