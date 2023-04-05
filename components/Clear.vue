<template>
  <div>
    <v-btn data-testid="clear-btn" @click="clearAll">Clear all</v-btn>
  </div>
</template>
<script>

export default {
  name: 'ClearAll',
  methods: {
    clearAll() {
      this.$router.push({ query: {} })
    },
  },
}
</script>