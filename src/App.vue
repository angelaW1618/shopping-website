<template>
  <div id="cart-app">
    <div id="top-display">
    <header-component />

    <nav-component />
    </div>
    <main>
      <router-view />
    </main>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '../src/components/HeaderComponent.vue'
import NavComponent from '../src/components/NavComponent.vue'
import FooterComponent from  '../src/components/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    NavComponent,
    FooterComponent
  }
}
</script>

<style>
template {
  font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
main {
  min-height: 100vh;
}
#cart-app {
  width: 100%;
} 
#top-display {
   position: sticky;
    top: 0;
    z-index: 9999;
}

@media only screen and (max-width: 768px) {
   
    article.product-card {
        width: 40%;
    }
    #logo {
        width: 100%;
        object-fit: contain;
    }

}
@media only screen and (max-width: 425px) {
    html {
        font-size: 13px;
    }
    section#cart-view {
      width: 100%;
    }
    #cart-table-view {
      width: 100%;
    }
   
    article.product-card {
        width: 90%;
    }
    .search-input {
        width: 80px;
    }
    #logo {
        width: 100%;
        object-fit: contain;
    }
}


</style>