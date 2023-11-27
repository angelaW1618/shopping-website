<template>
  <section id="cart-title">
    <h1 id="shopping-cart">Shopping Cart</h1>
    <div class="clear-cart">
      <button v-on:click="clearAll">Clear All Items</button>
    </div>
  </section>
  <section id="cart-view" v-if="isLoggedIn">
    <div id="cart-table-view" v-if="itemInCart">
      <table id="cart-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="eachProduct in myProducts"
            v-bind:key="eachProduct.productId"
          >
            <td>{{ eachProduct.quantity }}</td>
            <td>{{ eachProduct.product.name }}</td>
            <td>{{ priceTag(eachProduct.product.price) }}</td>
            <td>
              {{
                priceTag(
                  itemAmount(eachProduct.product.price, eachProduct.quantity)
                )
              }}
            </td>
            <td>
              <div
                id="remove-item"
                v-on:click="removeItem(eachProduct.cartItemId)"
              >
                <font-awesome-icon class="icon" icon="fa-solid fa-xmark" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="total-price-container">
        <div class="totalPriceName">
          <p id="subtotal">Subtotal:</p>
          <p id="tax">Tax:</p>
          <p id="total">Total:</p>
        </div>
        <div class="totalPrice">
          <div id="subtotal-amount">{{ totalPrice.itemSubtotal }}</div>
          <div id="tax-amount">{{ totalPrice.tax }}</div>
          <div id="total-amount">{{ totalPrice.total }}</div>
        </div>
      </div>
    </div>
    <p v-else>No item in cart, please add.</p>
  </section>
  <div id="cart-login" v-else>
    <router-link v-bind:to="{ name: 'login' }">Login</router-link>
  </div>
</template>
<script>
import ProductService from "../services/ProductService";

export default {
  data() {
    return {
      myProducts: [],
      totalPrice: "",
      itemInCart: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },
  methods: {
    priceTag(price) {
      return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(price);
    },
    removeItem(itemId) {
      ProductService.removeItemInCart(itemId)
        .then(() => {
          window.alert("Product Removed from Cart!");
          this.$store.commit("SET_MESSAGE", "Item removed!");
          this.getCart();
        })
        .catch((error) => {
          window.alert(`ERROR: ${error}`);
        });
    },
    getCart() {
      ProductService.getProductsFromCart()
        .then((response) => {
          console.log(response.data);
          this.totalPrice = response.data;
          this.myProducts = response.data.items;
          if (this.myProducts.length > 0) {
            this.itemInCart = true;
          }
        })
        .catch((error) => {
          window.alert(`ERROR: ${error}`);
        });
    },
    itemAmount(price, quantity) {
      return price * quantity;
    },
    clearAll() {
      ProductService.clearCart()
        .then(() => {
          window.alert("All Products Removed from Cart!");
          this.$store.commit("SET_MESSAGE", "All items removed!");
          this.getCart();
        })
        .catch((error) => {
          window.alert(`ERROR: ${error}`);
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
<style scoped>
#cart-view {
  display: flex;
  width: 100%;
}
#cart-title {
  display: flex;
  justify-content: space-between;
  margin: 0px;
  align-items: center;
}
#cart-table {
  text-align: center;
  border-bottom: 1px solid black;
  width: 100%;
}
#cart-table-view {
  width: 80%;
}
#total-price-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 30px;
}
.totalPriceName {
  display: flex;
  flex-direction: column;
}
#subtotal,
#tax,
#total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  margin: 0px;
}
.totalPrice {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: left;
  padding-left: 30px;
}
#subtotal-amount,
#tax-amount,
#total-amount {
  display: flex;
  justify-content: flex-end;
}
#shopping-cart {
  font-size: 20px;
}
@media only screen and (max-width: 425px) {
  #cart-table-view {
    width: 100%;
  }
}
</style>