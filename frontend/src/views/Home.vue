<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
          <v-card class="pa-1">
            <img height="250" :src="`${post.image}`">
            <v-btn class="ml-4 mt-3" small outlined color="indigo">
              {{ post.category }}
            </v-btn>
            <v-card-title class="headline">
              {{ post.title }}
            </v-card-title>
            <v-card-text class="py-0">
              <p>{{ post.content.substring(0, 100) + "..." }}</p>  
            </v-card-text>  
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
