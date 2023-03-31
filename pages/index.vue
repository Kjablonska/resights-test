<template lang="pug">
<div>
  Search()
  v-container
    v-row
      v-col(cols)
        DataTable(
          :headers="headers"
          :items="items"
          @optionsUpdate="updatePage"
        )
        //- v-progress-circular(
        //-   v-else
        //-   width="2"
        //-   color="rs__primary"
        //-   indeterminate
        //- ).mx-auto
</div>
</template>

<!-- v-if="items.length" -->

<script>
import DataTable from '~/components/DataTable.vue'
import Search from '~/components/Search.vue'
import { mapActions, mapGetters } from 'vuex'
import { fetchData } from '../utils/dataLoader'

export default {
  components: {
    DataTable,
    Search
  },
  computed: {
    ...mapGetters({
      items: 'items',
    }),
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
  async asyncData({ store }) {
    fetchData(store)
  },
  methods: {
    ...mapActions(['updatePage']),
    updatePage(newOptions) {
      if (newOptions) {
        this.$store.dispatch('updatePageOptions', newOptions)

        fetchData(this.$store)
      }
    }
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