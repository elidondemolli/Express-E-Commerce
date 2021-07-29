<template>
  <div class="container">
    <section id="featured" class="my-5 py-5">
      <div class="container mt-5 py-5">
        <div style="float: right;" class="hamam2">
          <input class="search" type="text" v-model="title" />
          <input class="button" type="submit" @click.prevent="filteredNames" value="Search" />
        </div>
        <div>
          <h3>Our Products</h3>
        <hr />
        <p>
          Here you can check out our new products with fair prices on Express
        </p>
        </div>
      </div>
      <div class="row mx-auto container">
        <div v-if="notFound"><h1>{{ notFound }}</h1></div>
        <div
          v-for="post in paginatedOrders"
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
      <button style="display: block; margin: auto;" @click="loadMore" v-if="currentPage * maxPerPage < posts.length">Load More</button>
    </section>
  </div>
</template>

<script>
import { getPosts, searchPosts } from "../api/posts";

export default {
  data() {
    return {
      currentPage: 1,
      maxPerPage: 16,
      title: "",
      posts: [],
      notFound: "",
    };
  },
  async created() {
    this.posts = await getPosts();
  },
  methods: {
    async filteredNames() {
      if (this.title == null || this.title == "" || this.title == undefined) {
        this.posts = await getPosts();
        this.notFound = "";
      } 
      this.posts = await searchPosts(this.title);
      if(this.posts <= 0){
        this.notFound = "Sorry there, i cant find anything with that word :(";
      } else {
        this.notFound = "";
      }
    },
    loadMore() {
      this.currentPage += 1;
    }
  },
  computed: {
      paginatedOrders() {
        return this.posts.slice(0, this.currentPage * this.maxPerPage);
    }
  }
};
</script>

<style>
@media only screen and (max-width: 768px) {
  .hamam2{
    float: none !important;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .hamam2 .search {
    width: 80%;
  }

  .hamam2 .button {
    width: 20%;
  }
}

.button:hover{
    border-color: #5a5a5a;
    background-color:  #5a5a5a;
    color: rgb(255, 255, 255);
    transition: 0.3s ease;
}
</style>
