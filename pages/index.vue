<template lang="pug">
<div>
  <v-container justify-center>
    <v-card>
      <v-container>
        <v-layout align-center>
          <v-card-title>Search and filter</v-card-title>
          <v-spacer/>
          Clear()
        </v-layout>
          ColorCheckbox()
          Search(
            :searchKey="searchQuery"
          )
        <v-layout row justify-space-around>
          <v-flex v-for="filterName in filterValues" :key="filterName" shrink>
            FilterData(
              :filterName="filterName"
              :items="findFilterValues(filterName)"
            )
          </v-flex>
        </v-layout>     
      </v-container>
    </v-card>
  </v-container>

  </v-container>
    v-container
      v-row
        v-col(cols)
          DataTable(
            v-if="isMounted"
            :headers="headers"
            :items="items"
          )
          v-progress-circular(
            v-else
            width="2"
            color="rs__primary"
            indeterminate
          ).mx-auto
</div>
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import Search from '@/components/Search.vue'
import Clear from '@/components/Clear.vue'
import ColorCheckbox from '@/components/ColorCheckbox.vue'
import FilterData from '@/components/FilterData.vue'
import { mapGetters } from 'vuex'
import { fetchData, getAllUniqueValues } from '../api/dataLoader'

export default {
  components: {
    DataTable,
    Search,
    Clear,
    FilterData,
    ColorCheckbox
  },
  middleware({ store }) {
    fetchData(store)
  },
  computed: {
    ...mapGetters({
      items: 'items',
      searchQuery: 'searchQuery',
    }),
    // Filter values and headers should be aligned 
    filterValues() {
      return ['gender', 'year', 'sales', 'country', 'color']
    },
    headers() {
      return [
        { text: 'Title', value: 'user.title', align: 'start', sortable: false, align: 'center', width: "10%" },
        { text: 'First name', value: 'user.first_name', sortable: false, align: 'center', width: "15%" },
        { text: 'Last name', value: 'user.last_name', sortable: false, align: 'center', width: "15%" },
        { text: 'Email', value: 'email', align: 'center', width: "20%" },
        { text: 'Gender', value: 'gender', align: 'center', width: "10%" },
        { text: 'Year', value: 'year', align: 'center', width: "10%" },
        { text: 'Sales', value: 'sales', align: 'center', width: "10%" },
        { text: 'Country', value: 'country', align: 'center', width: "10%" },
      ]
    },
  },
  data() {
    return {
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
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