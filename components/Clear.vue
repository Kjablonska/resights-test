<template>
  <div>
    <div>
      <v-btn @click="clearAll">Clear all</v-btn>
    </div>
  </div>
</template>
<script>

export default {
  methods: {
    clearAll() {
      this.$router.push({ query: {} })
    },
  },
}
</script>