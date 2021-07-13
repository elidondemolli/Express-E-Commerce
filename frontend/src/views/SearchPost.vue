<template>
  <div class="container">
    <section id="featured" class="my-5 py-5">
      <div class="container mt-5 py-5">
        <div class="hamam2">
          <input type="text" v-model="title" />
          <input type="submit" @click.prevent="filteredNames" value="Search" />
        </div>
        <h3>Our Products</h3>
        <hr />
        <p>
          Here you can check out our new products with fair prices on Express
        </p>
      </div>
      <div class="row mx-auto container">
        <div v-if="posts.length <= 0"><h1>{{ notFound }}</h1></div>
        <div
          v-for="post in posts"
          :key="post._id"
          class="product text-center col-lg-3 col-md-4 col-12"
        >
          <a href=""
            ><router-link :to="{ name: 'Product', params: { id: post._id } }">
              <img class="img-fluid mb-3" :src="`${post.image}`" alt="" />
              <div class="star">
                <i
                  v-for="post in post.rating"
                  :key="post.id"
                  class="fas fa-star"
                ></i>
              </div>
              <span></span>
              <h5 class="p-name">{{ post.title }}</h5>
              <!-- <h4 class="p-content">{{post.content.substring(0, 20) + "..."}}</h4> -->
              <h4 class="p-price">
                {{
                  new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(post.price)
                }}
              </h4>
              <button class="buy-button">BUY NOW</button>
            </router-link></a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getPosts, searchPosts } from "../api/posts";

export default {
  data() {
    return {
      title: "",
      posts: [],
      notFound: "Sorry there, i cant find anything with that word :(",
    };
  },
  async created() {
    this.posts = await getPosts();
  },
  methods: {
    async filteredNames() {
      if (this.title == null || this.title == "" || this.title == undefined) this.posts = await getPosts();
      this.posts = await searchPosts(this.title);
    },
  },
};
</script>
