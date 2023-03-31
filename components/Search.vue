<template>
  <div>
    <v-autocomplete clearable @change="search" v-model="searchQuery" label="Autocomplete"
            :items="['Male', 'Female', 'Agender', 'Genderqueer', 'Polygender', 'Bigender', 'Non-binary', 'Genderfluid']"></v-autocomplete>
    <div>
      <v-text-field clearable @click:clear="clearSearch" v-model="searchQuery"></v-text-field>
    <button @click="search">Search</button>
  </div>
  </div>
</template>

<script>
import { fetchData, clearSearch } from '../utils/dataLoader'
import * as TYPES from '../store/mutationTypes'

export default {
  data() {
    return {
      searchQuery: "",
    }
  },
  methods: {
    search() {
      console.log("search")
      if (this.searchQuery !== "") {
        this.$store.commit(TYPES.SET_SEARCH_QUERY, this.searchQuery)
        fetchData(this.$store)
      }
    },
    filter() {
      console.log("search")
      if (this.searchQuery !== "") {
        this.$store.commit(TYPES.SET_FILTER, this.searchQuery)
        fetchData(this.$store)
      }
    },
    clearSearch() {
      console.log("clearSearch")
      clearSearch(this.$store)
    }
  },
}
</script>
