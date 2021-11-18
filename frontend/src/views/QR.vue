<template>
  <div class="container text-center mt-5 py-5">
    <div class="row mt-5 py-5">
            <div class="card">
                <div class="text-center mt-3 p-2"> <img src="../../img/download.png" width="20%"> </div>
                <div class="text-center"> <small class="text-uppercase flat">DISCOUNT CODE</small> </div>
                <div class="d-flex justify-content-center px-2">
                    <div class="d-flex flex-row">
                        <h1 class="mt-0 off">{{ code }}</h1>
                    </div>
                </div>
                <div class="line">
                    <hr>
                </div>
                <div class="text-center mb-5"> <span class="text-uppercase">Valid till 23 december</span> </div>
                <div class="text-right p-1"> <small>*EXPRESS</small> </div>
            </div>
        </div>
</div>
</template>

<script>
import {
  getDiscount,
} from "../api/posts";

import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      discount: 0,
      code: 0,
    };
  },
  async created() {
    this.code = Math.floor(Math.random() * 10000);
    console.log('rout', this.code);
    this.discount = await getDiscount(this.$route.params.id, this.code);
    this.posts = await getPosts();
    const items = await getPosts();
    this.featured = items.filter(item => item.rating == 5).splice(this.generateRandomInteger(0, 11), 4);
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
    ...mapGetters(["user"])
  }
};
</script>

<style>
body {
    background-color: #eee
}

.card {
    border: none;
    position: relative
}

.off {
    font-size: 60px;
    margin-top: -16px !important;
    color: black
}

.flat {
    font-size: 20px
}

.star {
    margin-top: 25px !important;
    font-size: 28px
}

.line {
    padding-right: 8rem !important;
    padding-left: 8rem !important
}

.line hr {
    height: 2px;
    width: 100%;
    background-color: #555555 !important;
}

@media(max-width:571px) {
  .card {
    width: 300px;
  }
}
</style>
