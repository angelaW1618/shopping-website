<template>
  <div id="main-nav">
    <nav class="nav-list">
      <div class="left-nav">
        <router-link v-bind:to="{name: 'products'}" id="home-link">Home</router-link>
        <router-link v-bind:to="{name: 'cart'}" id="cart-link">Cart</router-link>
      </div>

      <div class="nav-message">
        <div id="messageWindow" v-if="messageVisible">{{ message }}</div>
      </div>

      <div class="right-nav">
        <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token">
          Logout
        </router-link>
        <router-link v-bind:to="{ name: 'login' }" v-else>Login</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageVisible: false,
      message: ''
    }
  },
  computed: {
    currentMessage() {
      return this.$store.state.message;
    }
  },
    methods: {
      
      showMessage(newMessage) {
        this.messageVisible = true;
        this.message = newMessage;
        setTimeout(() => {
          this.messageVisible = false;
          this.$store.commit('CLEAR_MESSAGE');
        }, 3000);
      }
    },
    watch: {
      currentMessage(newMessage) {
        if (newMessage) {
          this.showMessage(newMessage);
        }
      }
    }
  }
  

</script>

<style>
#main-nav {
  background: white;
  border: 1px solid black;
  border-top: none;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  position: sticky;
  top:auto;
  z-index: 1000;
}
.nav-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
}
#cart-link {
  padding-left: 30px;
}
.left-nav,
.right-nav,
.nav-message {
  display: flex;
  flex: 1;
  justify-content: center;
}
.left-nav {
  justify-content: flex-start;
}
.right-nav {
  justify-content: flex-end;
}
#messageWindow {
  background-color: lightgreen;
  padding: 10px 10px;
  text-align: center;
}
</style>