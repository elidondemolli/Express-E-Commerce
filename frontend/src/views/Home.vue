<template>
  <div>
    <section id="home">
      <div class="container">
        <h5 v-if="!isLoggedIn">Welcome BISHA</h5>
        <h5>NEW ARRIVALS</h5>
        <h1><span>BEST PRICE</span> THIS YEAR</h1>
        <p>
          SHOOMATIC OFFERS YOUR VERY COMFORTABLE <br />TIME ON WALKING AND
          EXCERICSES.
        </p>
        <a href="/shop"><button> SHOP NOW</button></a>
      </div>
    </section>
    <!-- <section id="braind">
      <div class="row">
        <img src="../../img/brandLogos/chanel.png" alt="">
      </div>
    </section> -->
    <section id="featured" class="my-5 pb-5">
      <div class="container text-center mt-5 py-5">
        <h3>Our Featured Products</h3>
        <hr class="mx-auto">
        <p>Here you can check out our new products with fair price on express</p>
      </div>
      <div class="row mx-auto container-fluid">
        <div v-for="post in featured" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <a><router-link :to="{ name: 'Product', params: { id: post._id }}">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in post.rating" :key="post.id" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(post.price) }}</h4>
          <button class="buy-button">BUY NOW</button>
          </router-link></a>
        </div>
      </div>
    </section>

    <section id="banner" class="my-5 py-5">
      <div class="container">
        <h4>MID SEASON SALE</h4>
        <h1>AUTUNUM COLLECTION<br>UP TO 20%</h1>
        <button class="text-uppercase">Shop Now</button>
      </div>
    </section>

    <section id="clothes" class="my-5 pb-5">
      <div class="container text-center mt-5 py-5">
        <h3>Clothes</h3>
        <hr class="mx-auto">
        <p>Here you can check out our new products with fair price on express</p>
      </div>
      <div class="row mx-auto container-fluid">
        <div v-for="post in clothing" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <a href=""><router-link :to="{ name: 'Product', params: { id: post._id }}">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in post.rating" :key="post.id" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(post.price) }}</h4>
          <button class="buy-button">BUY NOW</button>
          </router-link></a>
        </div>
      </div>
    </section>

    <section id="watches" class="my-5 pb-5">
      <div class="container text-center mt-5 py-5">
        <h3>Best Watches</h3>
        <hr class="mx-auto">
        <p>Here you can check out our new products with fair price on express</p>
      </div>
      <div class="row mx-auto container-fluid">
        <div v-for="post in watches" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <a href=""><router-link :to="{ name: 'Product', params: { id: post._id }}">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in post.rating" :key="post.id" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(post.price) }}</h4>
          <button class="buy-button">BUY NOW</button>
          </router-link></a>
        </div>
      </div>
    </section>

    <section id="shoes" class="my-5 pb-5">
      <div class="container text-center mt-5 py-5">
        <h3>Best Shoes</h3>
        <hr class="mx-auto">
        <p>Here you can check out our new products with fair price on express</p>
      </div>
      <div class="row mx-auto container-fluid">
        <div v-for="post in shoe" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <a href=""><router-link :to="{ name: 'Product', params: { id: post._id }}">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star">
            <i v-for="post in post.rating" :key="post.id" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
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

import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      posts: [],
      featured: [],
      watches: [],
      shoe: [],
      clothing: [],
    };
  },
  async created() {
    this.posts = await getPosts();
    const items = await getPosts();
    this.featured = items.filter(item => item.rating == 5).splice(this.generateRandomInteger(0, 3), 4);
    // this.featured = items.filter(item => item.rating == 5).splice(0, 4);
    this.watches = items.filter(items => items.category == 'Watch').splice(this.generateRandomInteger(0, 3), 4);
    this.shoe = items.filter(items => items.category == 'Shoe').splice(this.generateRandomInteger(0, 3), 4);
    this.clothing = items.filter(items => items.category != 'Shoe' && items.category != 'Watch' && items.category != 'Bag').splice(this.generateRandomInteger(0, 3), 4);
  },
  methods: {
      generateRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

<style>
#home {
  background-image: url("../../img/fashion.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: top 60px center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

#home span {
  color: coral;
}

/* Products */
.product {
  cursor: pointer;
  margin-bottom: 2rem;
}

.product img{
  transition: 0.3s all;
}

.product:hover img{
  opacity: 0.7;
}

.product .buy-button{
  background-color: #fb744f;
  transform: translate(20px);
  opacity: 0;
  transition: 0.3s all;
}

.product:hover .buy-button{
  transform: translate(0);
  opacity: 1;
}

.p-price {
  color: #4e4e4e;
}

hr{
  background-color: #fb744f !important;
  width: 30px;
  height: 5px !important;
}

.star {
  padding: 10px 0;
}

.star i{
  font-size: 0.8rem;
  color: goldenrod;
}

button {
  border: none;
}

#banner {
  background-image: url("../../img/banner.jpg");
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: top 79px center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

#banner h4{
  color: #D8D8D8;
}

#banner h1{
  color: #fff;
}

#banner button{
  background-color: black;
}

footer {
  background-color: #222222;
}

footer h5 {
  color: #D8D8D8;
  font-weight: 700;
  font-size: 1.2rem;
}

footer li{
  padding-bottom: 4px;
}

footer li a{
  font-size: 0.8rem;
  color: #999 !important;
}

footer li a:hover{
  color: #D8D8D8;
}

footer p {
  color: #999;
  font-size: 0.8rem;
}

footer .copyright a{
  color: #000;
  width: 38px;
  height: 38px;
  background-color: #fff;
  display: inline-block;
  text-align: center;
  line-height: 38px;
  border-radius: 50%;
  transition: 0.3 ease;
  margin: 0 5px;
}

footer .copyright a:hover{
  color: #fff;
  background-color: #fb744f;
}
</style>
