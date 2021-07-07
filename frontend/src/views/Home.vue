<template>
<section id="home">
  <div class="container">
    <h5>NEW ARRIVALS</h5>
    <h1><span>BEST PRICE</span> THIS YEAR</h1>
    <p>SHOOMATIC OFFERS YOUR VERY COMFORTABLE <br>TIME ON WALKING AND EXCERICSES.</p>
    <button>SHOP NOW</button>  
  </div>
</section>
</template>

<script>

import { getPosts, getPostByID, createPost, updatePost, deletePost } from '../api/posts';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
    };
  },
  async created(){
    this.posts = await getPosts();
  }

};
</script>

<style>

#home{
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

</style>
