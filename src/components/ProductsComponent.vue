<template>
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

  <div>
    <section v-if="cardView" id="product-cards">
      <article
        class="product-card"
        v-for="eachProduct in filteredProducts"
        v-bind:key="eachProduct.productId"
      >
        <router-link :to="'/products/' + eachProduct.productId">
          <div class="sku">{{ eachProduct.productSku }}</div>
        </router-link>
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
        <div
          class="cart"
          title="Add item to cart"
          v-on:click="addToCart(eachProduct)"
        >
          <font-awesome-icon
            class="icon"
            icon="fa-solid fa-cart-plus icon action"
          />
        </div>
      </article>
    </section>

    <div v-else class="tableView">
      <table id="product-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="eachProduct in filteredProducts"
            v-bind:key="eachProduct.productId"
          >
            <td>{{ eachProduct.productSku }}</td>
            <router-link :to="'/products/' + eachProduct.productId">
              <td>{{ eachProduct.name }}</td>
            </router-link>
            <td>{{ eachProduct.description }}</td>
            <td>{{ priceTag(eachProduct.price) }}</td>
            <td><button v-on:click="addToCart(eachProduct)">Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import ProductService from "../services/ProductService";

export default {
  props: ["productData"],
  data() {
    return {
      cardView: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
    filteredProducts() {
      const searchTerm = this.$store.state.searchTerm.toLowerCase();
      return this.productData.filter((eachProduct) => {
        return (
          !searchTerm || eachProduct.name.toLowerCase().includes(searchTerm)
        );
      });
    },
  },

  methods: {
    onKeyUp(event) {
      this.searchTerm = event.target.value;
    },
    displayDescription(event) {
      const id = Number(event.currentTarget.getAttribute("data-id"));
      const product = this.productData.find((p) => p.productId === id);
      this.$store.commit("SET_MESSAGE", product.description);
      console.log("success");
    },
    priceTag(price) {
      return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(price);
    },
    addToCart(product) {
      const userId = this.$store.state.user.userId;
      if (this.isLoggedIn) {
        ProductService.addProductToCart(product, userId)
          .then(() => {
            window.alert("Product Added to Cart!");
            this.$store.commit("SET_MESSAGE", "Item added to cart!");
          })
          .catch((error) => {
            window.alert(`ERROR: ${error}`);
          });
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
<style>
#product-table {
  text-align: center;
  width: 80%;
}
  
</style>