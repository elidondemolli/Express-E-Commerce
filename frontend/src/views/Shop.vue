<template>
  <div class="container">
    <section id="featured" class="my-5 py-5">
      <div class="container mt-5 py-5">
        <h3>Our Products</h3>
        <hr>
        <p>Here you can check out our new products with fair prices on Express</p>
      </div>
      <div class="row mx-auto container">
        <div v-for="post in posts" :key="post._id" class="product text-center col-lg-3 col-md-4 col-6">
            <a href=""><router-link :to="{ name: 'Product', params: { id: post._id }}">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in post.rating" :key="post.id" class="fas fa-star"></i>
          </div>
          <span></span>
          <h5 class="p-name">{{post.title}}</h5>
          <!-- <h4 class="p-content">{{post.content.substring(0, 20) + "..."}}</h4> -->
          <h4 class="p-price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(post.price) }}</h4>
          <button class="buy-button">BUY NOW</button>
            </router-link></a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
} from "../api/posts";

export default {
  name: "Shop",
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = await getPosts();
  },
};
</script>

<style>
.product img {
  width: 100%;
  height: 61.8%;
  box-sizing: border-box;
  object-fit: cover;
}

.p-price {
  color: #4e4e4e;
}

a { text-decoration: none !important; color: black !important;  }
</style>