<template>
  <v-layout row align-center justify-space-between>
    <v-flex grow pa-5>
      <v-text-field clearable @click:clear="clearSearchQuery" v-model="searchQuery" />
    </v-flex>
    <v-flex shrink pa-4>
      <v-btn @click="search">Search</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchQuery: this.$store.getters['searchQuery'],
    }
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        const queryParams = this.$route.query
        this.$router.push({ query: { ...queryParams, search: this.searchQuery } })
      }
    },
    clearSearchQuery() {
      const queryParams = this.$route.query
      this.$router.push({ query: { ...queryParams, search: undefined } })
    },
  },
}
</script>
