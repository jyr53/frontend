<template>
  <v-chip>
    <span>{{ purifiedText }}</span>
  </v-chip>
</template>
<script>
export default {
  name: 'SelectionsFilter',
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
