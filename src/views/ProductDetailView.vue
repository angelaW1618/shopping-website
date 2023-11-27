<template>
  <section id="product-detail-title">
    <h1>Product Details</h1>
    <button id="cart-button">
    <div class="cart" title="Add item to cart" v-on:click="addToCart(product)">
      <font-awesome-icon
        class="icon"
        icon="fa-solid fa-cart-plus icon action"
      />
      <p>Add to cart</p>
    </div>
    </button>
  </section>

  <section id="product-detail">
    <div class="product-name">{{ product.name }}</div>
    <div class="sku">{{ product.productSku }}</div>
    <div class="price">{{ priceTag(product.price) }}</div>
    <div id="description">{{ product.description }}</div>
    <div class="product-image"><img src="https://via.placeholder.com/350x250.jpg" /></div>
  </section>
</template>
<script>
import ProductService from "../services/ProductService";

export default {
  data() {
    return {
      product: {},
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    }
  },
  methods: {
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
   
    priceTag(price) {
      return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(price);
    },
  },
  created() {
    this.productId = this.$route.params.id;
    ProductService.getProductById(this.productId)
      .then((response) => {
        this.product = response.data;
        console.log(this.product);
      })
      .catch((error) => {
        this.error = `Could not get product by id ${this.productId}.`;
        console.log(this.error, error.response);
      });
  },
};
</script>
<style scoped>
#product-detail-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h1 {
    font-size: 25px;
}
.product-name {
    font-size: 20px;
    text-decoration: underline;
}
.cart {
    display: flex;
    align-items: center;
    height: 30px;
  
}
p {
    padding-left: 10px;
    
}
.product-image {
    padding-top: 10px;
}
@media only screen and (max-width: 425px) {
   p {
       display: none;
   }
}
</style>