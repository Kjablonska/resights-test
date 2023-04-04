<template>
  <div class="filters">
    <v-autocomplete :ref="filterName" multiple clearable v-model="filterValue" @change="filter($event, filterName)"
      :label="filterName" :items="items"></v-autocomplete>
  </div>
</template>
<script>

export default {
  name: 'FilterData',
  props: ['filterName', 'items'],
  data() {
    return { filterValue: this.$store.getters['filters'][this.filterName] }
  },
  methods: {
    findCurrentValue(filterName) {
      const currentFilter = this.$store.getters['filters']
      return currentFilter[filterName]
    },
    filter(filter, filterName) {
      const queryParams = this.$route.query
      this.$router.push({ query: { ...queryParams, [filterName]: filter.length > 0 ? filter : undefined } })
    },
  },
}
</script>
<style lang="sass" scoped>
  .v-autocomplete
    max-width: 40%
    margin-left: 10px
  .filters

</style>