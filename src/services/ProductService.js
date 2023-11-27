import axios from 'axios';

export default {

  getProducts() {
    return axios.get('/products')
  },
  getProductById(id) {
    return axios.get(`/products/${id}`)
  },
  addProductToCart(product) {
    const cartItemDto = {
     
      "productId": product.productId,
      "quantity": 1


    }
    return axios.post('/cart/items', cartItemDto)

  },
  
  getProductsFromCart() {
    return axios.get('/cart')
  },
  removeItemInCart(itemId) {
    return axios.delete(`/cart/items/${itemId}`)
  },
  clearCart() {
    return axios.delete(`/cart`)
  }


}
 // "productId": product.productId,
      // "productSku": product.productSku,
      // "name": product.name,
      // "description": product.description,
      // "price": product.price,
      // "imageName": product.imageName
      