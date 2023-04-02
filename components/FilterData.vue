<template>
  <div>
    <div v-for="filterName in filterValues">
      <v-autocomplete :ref="filterName" multiple clearable @change="filter($event, filterName)" :label="filterName"
        :items="findFilterValues(filterName)"></v-autocomplete>
    </div>
    <div>
      <button @click="clearFilters">Clear filters</button>
    </div>
  </div>
</template>
<script>
import { fetchData, getAllUniqueValues } from '../utils/dataLoader'

export default {
  name: 'FilterData',
  props: ['filterValues'],
  methods: {
    findFilterValues(filterName) {
      return getAllUniqueValues(filterName)
    },
    filter(filter, filterName) {
      if (filter.length === 0) {
        this.$store.dispatch('clearFilter', filterName)
      } else {
        this.$store.dispatch('updateFilters', { filterName, filter })
      }
      fetchData(this.$store)
    },
    clearFilters() {
      this.$store.dispatch('clearAllFilters')
      
      // TODO - this looks hacky
      this.filterValues.forEach((filter) => {
        console.log(filter)
        this.$refs[filter][0].reset()
      })
      fetchData(this.$store)
    }
  },
}
</script>