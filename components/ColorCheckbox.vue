<template>
  <div>
    <v-checkbox data-testid="color-checkbox" class="color-checkbox" v-model="showColor" label="Show colors"></v-checkbox>
  </div>
</template>
<script>
export default {
  computed: {
    showColor: {
      get() {
        return this.$store.getters['showColor']
      },
      set(value) {
        this.$store.dispatch('setShowColors', value)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .color-checkbox
    padding-left: 10px
</style>