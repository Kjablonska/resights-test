<template>
  <div>
    <div class="search">
      <v-text-field clearable @click:clear="clearSearchQuery" v-model="searchQuery"></v-text-field>
      <v-btn @click="search">Search</v-btn>
    </div>
  </div>
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

<style lang="sass" scoped>
  .v-text-field
    max-width: 40%
    margin-left: 10px

  .search  
    display: flex
    align-items: center
    width: 100%
    
  .v-btn
    margin-left: 15px
</style>