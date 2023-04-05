<template>
  <div>
    <v-autocomplete multiple clearable v-model="filterValue" @change="filter($event, filterName)" :label="filterName"
      :items="items" />
  </div>
</template>
<script>

export default {
  name: 'FilterData',
  props: ['filterName', 'items'],
  computed: {
    filterValue() {
      return this.$store.getters['filters'][this.filterName]
    }
  },
  methods: {
    filter(filter, filterName) {
      const queryParams = this.$route.query
      this.$router.push({ query: { ...queryParams, [filterName]: filter.length > 0 ? filter : undefined } })
    },
  },
}
</script>
<style lang="sass" scoped>
  .v-autocomplete
    text-transform: capitalize
    max-width: 200px  
</style>
