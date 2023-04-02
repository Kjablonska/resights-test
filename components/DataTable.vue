<template lang="pug">
v-data-table(
  :headers="headers"
  :items="items"
  :server-items-length="pagesCount"
  :options.sync="options"
  item-key="email"
  dense
).elevation-1.mt-10
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DataTable',
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
  watch: {
    $props: {
      handler() {
      },
      deep: true,
      immediate: true,
    },
  }
}
</script>

<style lang="sass" scoped>
  .v-data-table
    max-width: 100%
</style>
