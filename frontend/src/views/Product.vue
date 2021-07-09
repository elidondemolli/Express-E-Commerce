<template>
  <div>
    <section class="container sproduct my-5 pt-5">
      <div class="row mt-5">
        <div class="col-lg-5 col-md-12 col-12">
          <img class="prod-img img-fluid w-100 pb-1" :src="`../../${product.image}`" alt="" />
        </div>
        <div class="col-lg-6 col-md-12 col-12">
          <h6>{{ product.category }}</h6>
          <h3 class="">{{ product.title }}</h3>
          <h2>${{ product.price }}</h2>
          <select class="my-3">
            <option value="">XXL</option>
            <option value="">XL</option>
            <option value="">M</option>
            <option value="">S</option>
          </select>
          <input type="number" value="1" />
          <button class="buy-btn">Add to Cart</button>
          <h4 class="mt-5 mb-3">Product Details</h4>
          <span>{{ product.content }}</span>
        </div>
      </div>
    </section>

    <section id="related" class="my-5 pb-5">
      <div class="container text-center mt-5 py-5">
        <h3>Related Items</h3>
        <hr class="mx-auto" />
        <p>
          Here you can check out our new products with fair price on express
        </p>
      </div>
      <div class="row mx-auto container-fluid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="product text-center col-lg-3 col-md-4 col-12"
        >
        <a href="" @click="reloadPage"><router-link :to="{ name: 'Product', params: { id: post._id }}">
          <img class="img-fluid mb-3" :src="`../../${post.image}`" alt="" />
          <div class="star">
            <i
              v-for="post in post.rating"
              :key="post.id"
              class="fas fa-star"
            ></i>
          </div>
          <h5 class="p-name">{{ post.title }}</h5>
          <h4 class="p-price">{{ post.content.substring(0, 20) + "..." }}</h4>
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
  name: "Product",
  data() {
    return {
      posts: [],
      product: {},
    };
  },
  async created() {
    const data = await getPosts();
    this.product = await getPostByID(this.$route.params.id);
    this.posts = data.filter(item => item.category == this.product.category).splice(0, 4);
  },
  methods: {
    reloadPage() {
      window.location.reload();
    }
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

.sproduct select {
  display: block;
  padding: 5px 10px;
}

.sproduct input {
  width: 50px;
  height: 40px;
  padding-left: 10px;
  font-size: 16px;
  margin-right: 10px;
}

.sproduct input:focus {
  outline: none;
}

.prod-img {
  height: auto !important;
}

.buy-btn {
  background: #999;
  opacity: 1;
  transition: 0.3 all;
}
</style>