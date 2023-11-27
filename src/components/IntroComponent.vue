<template>
  <div>
    <p id="login-message" v-show="!isLoggedIn">
       Welcome to my shopping site! You may browse anonymously as much as you wish, but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </p>
    <section id="intro">
      <p id="introduction">
       You can <span>search products</span> by name in the
        search bar. You can also <span>add items</span> to your cart. Click on <span>product sku</span> to view product details. Click on <span>product name</span> to display description. <span>Toggle</span> to view products in a table. Happy shopping!
      </p>
    </section>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    }
  }
};
</script>
<style>
span {
  font-weight: bold;
}
</style>