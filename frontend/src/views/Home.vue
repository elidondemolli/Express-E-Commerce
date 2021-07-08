<template>
  <div>
    <section id="home">
      <div class="container">
        <h5>NEW ARRIVALS</h5>
        <h1><span>BEST PRICE</span> THIS YEAR</h1>
        <p>
          SHOOMATIC OFFERS YOUR VERY COMFORTABLE <br />TIME ON WALKING AND
          EXCERICSES.
        </p>
        <button>SHOP NOW</button>
      </div>
    </section>
    <!-- <section id="braind">
      <div class="row">
        <img src="../../img/brandLogos/chanel.png" alt="">
      </div>
    </section> -->
    <section id="featured" class="my-5 pb-5">
      <div class="container text-center mt-5 py-5">
        <h3>Our Featured</h3>
        <hr class="mx-auto">
        <p>Here you can check out our new products with fair price on express</p>
      </div>
      <div class="row mx-auto container-fluid">
        <div v-for="post in posts" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in posts" :key="post.rating" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{post.content.substring(0, 20) + "..."}}</h4>
          <button class="buy-button">BUY NOW</button>
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
        <div v-for="post in posts" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in posts" :key="post.rating" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{post.content.substring(0, 20) + "..."}}</h4>
          <button class="buy-button">BUY NOW</button>
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
        <div v-for="post in posts" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in posts" :key="post.rating" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{post.content.substring(0, 20) + "..."}}</h4>
          <button class="buy-button">BUY NOW</button>
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
        <div v-for="post in posts" :key="post.id" class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in posts" :key="post.rating" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{post.content.substring(0, 20) + "..."}}</h4>
          <button class="buy-button">BUY NOW</button>
        </div>
      </div>
    </section>

    <footer class="mt-5 py-5">
      <div class="row container mx-auto pt-5">
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <img height="100px" src="../../img/Express-Logo.png" alt="">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lorem ultrices, venenatis ex vehicula.</p>
        </div>
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <h5 class="pb-2">Featured</h5>
          <ul class="text-uppercase list-unstyled">
            <li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Boys</a></li>
            <li><a href="#">Girls</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Shoes</a></li>
            <li><a href="#">Clothes</a></li>
          </ul>
        </div>
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <h5 class="pb-2">Contact Us</h5>
          <div>
            <h6 class="text-uppercase">Address</h6>
            <p>123 Dheu i Bardhe, Gjilan, KOSOVO</p>
          </div>
          <div>
            <h6 class="text-uppercase">Phone</h6>
            <p>(383) 44-444-444</p>
          </div>
           <div>
            <h6 class="text-uppercase">Email</h6>
            <p>Express@Exp.com</p>
          </div>
        </div>
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <h5 class="pb-2">Instagram</h5>
          <div class="row">
            <img class="img-fluid w-25 h-100 m-2" src="../../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../../img/shoe2.jpg">
          </div>
      </div>
      </div>
      <div class="copyright mt-5">
        <div class="row container mx-auto">
          <div class="col-lg-4 col-md-6 col-12 text-nowrap">
            <p>Express @ 2021. All Rights Reserved</p>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <a href="#"><i class="fab fa-facebook-square"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
            <a href="#"><i class="fab fa-instagram-square"></i></a>
          </div>
        </div>
      </div>
    </footer>
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
  name: "Home",
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

footer h5{
  color: #D8D8D8;
  font-weight: 700;
  font-size: 1.2rem;
}

footer li{
  padding-bottom: 4px;
}

footer li a{
  font-size: 0.8rem;
  color: #999;
}

footer li a:hover{
  color: #D8D8D8;
}

</style>
