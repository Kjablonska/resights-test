<template>
  <div>
    <div>
      <button @click="clearAll">Clear all</button>
    </div>
  </div>
</template>
<script>
import { fetchData } from '../utils/dataLoader'

export default {
  methods: {
    clearAll() {
      this.$store.dispatch('clearAll')
      fetchData(this.$store)
    },
  },
}
</script>