<template lang="pug">
v-data-table(
  :headers="headers"
  :items="items"
  :server-items-length="pagesCount"
  :items-per-page.sync="itemsPerPage"
  :sort-by.sync="sort.sortBy"
  :sort-desc.sync="sort.sortDesc"
  :page.sync="page"
  item-key="email"
  dense
).elevation-1.mt-10
</template>
<script>
import { mapGetters } from 'vuex'
import * as TYPES from '../store/mutationTypes'

export default {
  name: 'DataTable',
  props: ['headers', 'items'],
  data() {
    return {
      sort: {
        sortBy: this.$store.getters['sortBy'],
        sortDesc: this.$store.getters['soerDesc']
      },
      itemsPerPage: this.$store.getters['itemsPerPage'],
      page: this.$store.getters['page']
    }
  },
  computed: {
    ...mapGetters({
      pagesCount: 'pagesCount',
    }),
  },
  methods: {
    sortItems() {
      const queryParams = this.$route.query
      if (!this.sort || !this.sort.sortBy || this.sort.sortBy.length === 0) {
        this.$router.push({ query: { ...queryParams, sortDesc: undefined, sortBy: undefined } })
        this.$store.commit(TYPES.SET_SORT_BY, [])
        this.$store.commit(TYPES.SET_SORT_DESC, false)
      } else {
        this.$router.push({ query: { ...queryParams, sortDesc: this.sort.sortDesc, sortBy: this.sort.sortBy } })
      }
    }
  },
  watch: {
    sort: {
      handler() {
        this.sortItems()
      },
      deep: true
    },
    itemsPerPage: {
      handler() {
        const queryParams = this.$route.query
        this.$router.push({ query: { ...queryParams, itemsPerPage: this.itemsPerPage, page: 1 } })
      }
    },
    page: {
      handler() {
        const queryParams = this.$route.query
        this.$router.push({ query: { ...queryParams, page: this.page } })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-data-table
    max-width: 100%
</style>
