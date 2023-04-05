<template>
  <v-layout row align-center justify-space-between>
    <v-flex grow pa-5>
      <v-text-field data-testid="search" clearable @click:clear="clearSearchQuery" v-model="searchQuery" />
    </v-flex>
    <v-flex shrink pa-4>
      <v-btn data-testid="search-btn" @click="search">Search</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Search',
  props: ['searchKey'],
  data() {
    return {
      searchQuery: this.searchKey
    }
  },
  methods: {
    search() {
      if (this.searchQuery && this.searchQuery !== "") {
        const queryParams = this.$route.query
        this.$router.push({ query: { ...queryParams, search: this.searchQuery } })
      }
    },
    clearSearchQuery() {
      const queryParams = this.$route.query
      this.$router.push({ query: { ...queryParams, search: undefined } })
    },
  },
  watch: {
    searchKey(newSearch) {
      this.searchQuery = newSearch
    }
  }
}
</script>
