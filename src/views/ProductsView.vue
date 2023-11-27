<template>
  <div class="home">
    <!-- <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
    </div>
    <h2>Loading spinner demonstration</h2>
    <p>
      This is a demonstration of how you can show or hide a "spinner" icon to
      let the user know something is happening. Before calling an API, you'd set
      the data property <code>isLoading</code> to <code>true</code>. When the
      call completes, set it to <code>false</code>.
    </p>
    <p>
      For this demonstration, clicking the checkbox below sets
      <code>isLoading</code> to <code>true</code>, so it simulates what the user
      would see when your app is accessing an API.
    </p>
    <input type="checkbox" name="loading" id="loading" v-model="isLoading" /> Is
    Loading
    <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </p>
    <h2>Font-awesome demonstration</h2>
    <p>
      This code shows you how you can include Font-awesome icons on your page. Below are two icons: 
      one to indicate a "tile" view of products, and another to indicate a "table" view. There's also a little bit
      of styling to get you started, but you can style it your own way. And there's a property to track which view is "active".
    </p>
    <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: cardView }"
      v-on:click="cardView = true"
      icon="fa-solid fa-grip"
      title="View tiles"
    />
    <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: !cardView }"
      v-on:click="cardView = false"
      icon="fa-solid fa-table"
      title="View table"
    /> -->

    <!--     
     <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,
      but you must <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add items to your shopping cart.
    </p>
      <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: cardView }"
      v-on:click="cardView = true"
      icon="fa-solid fa-grip"
      title="View tiles"
    />
    <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: !cardView }"
      v-on:click="cardView = false"
      icon="fa-solid fa-table"
      title="View table"
    /> 
    
    <section id="intro">
      <div id="titleSearchBar">
        <h1 id="title">Products</h1>
        <form action="/search" method="get" class="search-bar">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            class="search-input"
            v-on:keyup="onKeyUp"
          />
          <button type="submit" class="search-button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <p id="introduction">
        Welcome to my shopping site. You can search products by name in the
        search bar. You can also add items to your cart. Happy shopping!
      </p>
    </section>
    <section id="product-cards">
      <article
        class="product-card"
        v-for="eachProduct in filteredProducts"
        v-bind:key="eachProduct.productId"
      >
        <div class="sku">{{ eachProduct.productSku }}</div>
        <div class="price">{{ priceTag(eachProduct.price) }}</div>
        <div
          class="product-name"
          v-bind:data-id="eachProduct.productId"
          v-on:click="displayDescription"
        >
          {{ eachProduct.name }}
        </div>
        <div class="product-image">
          <img src="https://via.placeholder.com/350x250.jpg" />
        </div>
        <div class="cart">
          <i
            class="fa-solid fa-cart-plus icon action"
            title="Add item to cart"
          ></i>
        </div>
      </article>
    </section>

    <div class="tableView">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eachProduct in filteredProducts"
        v-bind:key="eachProduct.productId">
        <td>{{ eachProduct.name }}</td>
        <td>{{ eachProduct.description }}</td>
        <td>{{ priceTag(eachProduct.price) }}</td>
        <td><button v-on:click="addToCart(product)">Add</button></td>

          </tr>
        </tbody>
      </table>

    </div> -->

    <header class="view-header">
      <div id="title-searchBar">
        <h1 id="title">Products</h1>
        <search-bar-component />
      </div>
      <intro-component />
    </header>
    <products-component v-bind:productData="products" />
    <!-- <div v-for="eachProduct in products" v-bind:key="eachProduct.productId">
      <router-link :to="'/products/' + eachProduct.productId">
        <products-component v-bind:productData="products" />
      </router-link>
    </div> -->
  </div>
</template>

<script>
import IntroComponent from "../components/IntroComponent.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductsComponent from "../components/ProductsComponent.vue";
import SearchBarComponent from "../components/SearchBarComponent.vue";
import ProductService from "../services/ProductService";

export default {
  components: { IntroComponent, SearchBarComponent, ProductsComponent },
  data() {
    return {
      isLoading: false,
      cardView: true,
      products: [],
      searchTerm: "",
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
    filteredProducts() {
      return this.products.filter((eachProduct) => {
        return (
          !this.searchTerm ||
          eachProduct.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },

  methods: {
    onKeyUp(event) {
      this.searchTerm = event.target.value;
    },
    // displayDescription(event) {
    //   const id = Number(event.currentTarget.getAttribute("data-id"));
    //   const product = this.products.find((p) => p.productId === id);
    //   this.$store.commit("SET_MESSAGE", product.description);
    //   console.log("success");
    // },
    priceTag(price) {
      return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(price);
    },
    addToCart(product) {
      if (this.isLoggedIn) {
        this.$store.commit("addToCart", product);
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },

  created() {
    ProductService.getProducts()
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        window.alert(`ERROR: ${error}`);
      });
  },
};
</script>

<style>
#spinner {
  color: green;
}

.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

#title-searchBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding-top: 20px;
}

#title {
  font-size: 30px;
}

.search-bar {
  grid-area: search;
  display: flex;
  height: 30px;
  align-items: center;
}

.search-input {
  border: 1px solid black;
  padding: 5px;
}

#product-cards {
  grid-area: productCards;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}
.product-card {
  display: grid;
  width: 25%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "sku price"
    "name name"
    "image image"
    ". cart";
  border: 1px solid black;
  padding: 10px 10px;
  overflow: hidden;
}

.sku {
  grid-area: sku;
}
.price {
  grid-area: price;
  justify-self: right;
}
.product-name {
  grid-area: name;
}
.product-image {
  grid-area: image;
  justify-self: center;
}
.product-image img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
.cart {
  grid-area: cart;
  justify-self: right;
}

.product-name:hover {
  text-decoration: underline;
  color: blueviolet;
  cursor: pointer;
}
.product-card:hover {
  transform: scale(1.05);
}
.cart:hover {
  cursor: pointer;
}

footer {
  background-color: white;
  border: 1px solid black;
  padding: 5px 20px;
  position: sticky;
  bottom: 0;
  z-index: 998;
}

#title {
  grid-area: title;
}
#introduction {
  grid-area: introduction;
}
</style>