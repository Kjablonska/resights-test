<template>
    <div>
        <v-autocomplete @click="search" label="Autocomplete"
            :items="['Male, Female, Agender, Genderqueer, Polygender, Bigender, Non-binary, Genderfluid']"></v-autocomplete>
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
        search(searchQuery) {
            if (this.searchQuery !== "") {
                this.$store.commit(TYPES.SET_SEARCH_QUERY, this.searchQuery)
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
  