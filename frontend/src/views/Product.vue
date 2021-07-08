<template>
<div>
    <section class="container product my-5 pt-5">
        <div class="row mt-5 ">
            <div class="col-lg-5 col-md-12 col-12">
                <img class="img-fluid w-100 pb-1" src="../../img/shoe1.jpg" alt="">

                <div class="small-img-group">
                    <div class="small-img-col">
                        <img src="../../img/shoe1.jpg" width="100%" class="small-img" alt="">
                    </div>
                    <div class="small-img-col">
                        <img src="../../img/shoe1.jpg" width="100%" class="small-img" alt="">
                    </div>
                    <div class="small-img-col">
                        <img src="../../img/shoe1.jpg" width="100%" class="small-img" alt="">
                    </div>
                    <div class="small-img-col">
                        <img src="../../img/shoe1.jpg" width="100%" class="small-img" alt="">
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-12">
                <h6>Home T-Shirt</h6>
                <h3 class="py-4">Men's Fashion T Shirt</h3>
                <h2>$133.00</h2>
                <select class="my-3">
                    <option value="">XXL</option>
                    <option value="">XL</option>
                    <option value="">M</option>
                    <option value="">S</option>
                </select>
                <input type="number" value="1">
                <button class="buy-btn">Add to Cart</button>
                <h4 class="mt-5 mb-5">Product Details</h4>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ex vel tellus eleifend cursus. Donec nec laoreet ex, sed pulvinar ex. Nulla lacinia finibus leo non ultrices. In suscipit, enim a vestibulum commodo, sem enim imperdiet orci, ultrices accumsan dolor libero vel tortor. Sed ac lacus ligula. Phasellus elementum, augue sed maximus vulputate, nunc libero posuere ante, sed imperdiet neque est vel massa. Suspendisse hendrerit risus a laoreet luctus. Aenean vulputate consectetur mi et tempor. Fusce iaculis dui eu sem viverra, eget fermentum magna congue. Sed non vehicula sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at eros vehicula, interdum leo nec, volutpat ex.</span>

            </div>
        </div>
    </section>

    <section id="featured" class="my-5 py-5">
      <div class="container mt-5 py-5">
        <h3>Our Products</h3>
        <hr>
        <p>Here you can check out our new products with fair prices on Express</p>
      </div>
      <div class="row mx-auto container">
        <div v-for="post in posts" :key="post.id" class="product text-center col-lg-3 col-md-4 col-6">
          <img class="img-fluid mb-3" :src="`${post.image}`" alt="">
          <div class="star"> 
            <i v-for="post in post.rating" :key="post.id" class="fas fa-star"></i>
          </div>
          <h5 class="p-name">{{post.title}}</h5>
          <h4 class="p-price">{{post.content.substring(0, 20) + "..."}}</h4>
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
  name: "Product",
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

.small-img-group {
    display: flex;
    justify-content: space-between;
}

.small-img-col {
    flex-basis: 24%;
    cursor: pointer;
}

.product select{
    display: block;
    padding: 5px 10px;
}

.product input{
    width: 50px;
    height: 40px;
    padding-left: 10px;
    font-size: 16px;
    margin-right: 10px;
}

.product input:focus {
    outline: none;
}

.buy-btn {
    background: #999;
    opacity: 1;
    transition: 0.3 all;
}

</style>