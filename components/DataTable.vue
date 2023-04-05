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
  :item-class="getColor"
  dense
).elevation-1.mt-10
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DataTable',
  props: ['headers', 'items'],
  data() {
    return {
      sort: {
        sortBy: this.$store.getters['sortBy'],
        sortDesc: this.$store.getters['sortDesc']
      },
      itemsPerPage: this.$store.getters['itemsPerPage'],
    }
  },
  computed: {
    ...mapGetters({
      pagesCount: 'pagesCount',
      showColors: 'showColors',
    }),
    page: {
      get() {
        console.log(this.$store.getters['page']);
        return this.$store.getters['page']
      },
      set(value) {
        const queryParams = this.$route.query
        this.$router.push({ query: { ...queryParams, page: value } })
      }
    }
  },
  methods: {
    sortItems() {
      const queryParams = this.$route.query
      if (!this.sort || !this.sort.sortBy || this.sort.sortBy.length === 0) {
        this.$router.push({ query: { ...queryParams, sortDesc: undefined, sortBy: undefined } })
      } else {
        this.$router.push({ query: { ...queryParams, sortDesc: this.sort.sortDesc, sortBy: this.sort.sortBy } })
      }
    },
    getColor(item) {
      if (this.showColors)
        return item.color.toLowerCase() + "-background"
    },
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
  }
}
</script>

<style lang="sass">
  $categories-colors-map: ("red": #FFCCCB, "pink": #f7c8f7, "blue": #9ec0f7, "yellow": #f7e4bc, "green": #c1f7bc, "purple": #c479fc, "violet": #c8a3f7, "khaki": #829481, "puce": #e6c4cc, "fuscia": #FDD5F9, "teal": #8EE2BF, "mauv": #C78DB6, "crimson": #fabbcd, "indigo": #C9C1EE, "aquamarine": #A8D3E6, "turquoise": #77FCFA, "orange": #fad5bb, "maroon": #E0B6BD, "goldenrod": #EDAF28)

  @each $category, $color in $categories-colors-map 
    .#{$category}-background
      background-color: scale-color($color, $alpha: -70%)
      transition: .25s

    .#{$category}-background:hover
      background-color: scale-color($color, $alpha: -50%) !important
  
  .v-data-table
    max-width: 100%

  .v-data-table th 
    font-size: 14px !important
    font-weight: bold
  
  .v-data-table::v-deep td
    font-size: 12px !important
  
</style>
