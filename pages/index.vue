<template lang="pug">
<div>
  Search()
  <div v-for="filterName in filterValues">
    FilterData(
      :filterName="filterName"
      :items="findFilterValues(filterName)"
    )
  </div>
  Clear()
  v-container
    v-row
      v-col(cols)
        DataTable(
          :headers="headers"
          :items="items"
        )
        //- v-progress-circular(
        //-   v-else
        //-   width="2"
        //-   color="rs__primary"
        //-   indeterminate
        //- ).mx-auto
</div>
</template>

<script>
import DataTable from '~/components/DataTable.vue'
import Search from '~/components/Search.vue'
import Clear from '~/components/Clear.vue'
import FilterData from '~/components/FilterData.vue'
import { mapGetters } from 'vuex'
import { fetchData, getAllUniqueValues } from '../utils/dataLoader'

export default {
  components: {
    DataTable,
    Search,
    Clear,
    FilterData
  },
  middleware({ store }) {
    fetchData(store)
  },
  computed: {
    ...mapGetters({
      items: 'items',
    }),
    // Filter values and headers should be aligned 
    filterValues() {
      return ['gender', 'year', 'sales', 'country', 'color']
    },
    headers() {
      return [
        { text: 'Title', value: 'user.title', align: 'start' },
        { text: 'First name', value: 'user.first_name' },
        { text: 'Last name', value: 'user.last_name' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Year', value: 'year' },
        { text: 'Sales', value: 'sales' },
        { text: 'Country', value: 'country' },
      ]
    },
  },
  methods: {
    findFilterValues(filterName) {
      return getAllUniqueValues(filterName)
    },
  }
}
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 50%
  left: 50%
</style>


<!-- return [
{ text: 'Title', value: 'user.title', align: 'start' },
{ text: 'First name', value: 'user.first_name' },
{ text: 'Last name', value: 'user.last_name' },
{ text: 'Email', value: 'email' },
{ text: 'Gender', value: 'gender' },
{ text: 'IP address', value: 'ip_address' },
{ text: 'Year', value: 'year' },
{ text: 'Sales', value: 'sales' },
{ text: 'Country', value: 'country' },
{ text: 'Currency', value: 'currency' },
{ text: 'Color', value: 'color' },
] -->