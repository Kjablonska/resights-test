<template lang="pug">
v-data-table(
  :headers="headers"
  :items="items"
  :server-items-length="pagesCount"
  :options.sync="options"
  item-key="email"
  dense
).elevation-1.mt-10
  //- <template v-slot:item.color="{ item }">
  //-   <v-chip :color="getColor(item.color)" dark>{{ item.color }}</v-chip>
  //- </template>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['headers', 'items'],
  computed: {
    ...mapGetters({
      pagesCount: 'pagesCount',
      itemsPerPage: 'itemsPerPage',
    }),
    options: {
      get() {
        return this.$store.getters['options']
      },
      set(newOptions) {
        this.$emit('optionsUpdate', newOptions)
      }
    }
  },
  // methods: {
  //   // Does not have all colors
  //   getColor(color) {
  //     return color.toLowerCase()
  //   },
  // },
}
</script>

<style lang="sass" scoped>
  .v-data-table
    max-width: 100%
</style>
