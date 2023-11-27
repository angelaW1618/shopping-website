<template>
  <div id="search-box">
    <input
      type="text"
      name="search"
      placeholder="Search..."
      class="search-input"
      v-on:keyup="onKeyUp"
    />
    <button class="icon-button" id="search-button">
      <font-awesome-icon
            class="icon"
            icon="fa-solid fa-magnifying-glass icon action"
          />
    </button>
  </div>
</template>
<script>
export default {
    methods: {
    onKeyUp(event) {
      const searchTerm = event.target.value;
      this.$store.commit('SET_SEARCHTERM', searchTerm);
    }
}
}
</script>
<style>
</style>