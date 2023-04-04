<template>
  <div>
    <div>
      <v-checkbox class="color-checkbox" v-model="showColor" label="Show colors"></v-checkbox>
    </div>
  </div>
</template>
<script>
import * as TYPES from '../store/mutationTypes'

export default {
  computed: {
    showColor: {
      get() {
        return this.$store.getters['showColor']
      },
      set(value) {
        this.$store.commit(TYPES.SET_SHOW_COLORS, value)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .color-checkbox
    padding-left: 10px
</style>