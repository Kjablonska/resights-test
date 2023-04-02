<template>
  <div>
    <div>
      <v-text-field clearable @click:clear="clearSearchQuery" v-model="searchQuery"></v-text-field>
      <button @click="search">Search</button>
    </div>
  </div>
</template>
<script>
import { clearSearchQuery } from '../utils/dataLoader'

export default {
  name: 'Search',
  data() {
    return {
      searchQuery: "",
    }
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        this.$store.dispatch('updateSearchQuery', this.searchQuery)
        this.$emit('updateItems')
      }
    },
    clearSearchQuery() {
      clearSearchQuery(this.$store)
    },
  },
}
</script>
