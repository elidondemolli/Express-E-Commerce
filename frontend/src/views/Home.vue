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
        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="../../img/asd.png" alt="">
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h5 class="p-name">Sport Boots</h5>
          <h4 class="p-price">$92.32</h4>
          <button class="buy-button">BUY NOW</button>
        </div>
        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="../../img/black-bag.gif" alt="">
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h5 class="p-name">Sport Boots</h5>
          <h4 class="p-price">$92.32</h4>
          <button class="buy-button">BUY NOW</button>
        </div>
        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="../../img/bag.png" alt="">
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h5 class="p-name">Sport Boots</h5>
          <h4 class="p-price">$92.32</h4>
          <button class="buy-button">BUY NOW</button>
        </div>
        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="../../img/bag2.gif" alt="">
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h5 class="p-name">Sport Boots</h5>
          <h4 class="p-price">$92.32</h4>
          <button class="buy-button">BUY NOW</button>
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

</style>
