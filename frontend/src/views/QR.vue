<template>
  <div class="container text-center mt-5 py-5">
    <div class="row mt-5 py-5">
            <div class="card">
                <div class="text-center mt-3 p-2"> <img src="../../img/download.png" width="20%"> </div>
                <div class="text-center"> <small class="text-uppercase flat">DISCOUNT CODE</small> </div>
                <div class="d-flex justify-content-center px-2">
                    <div class="d-flex flex-row">
                        <h1 class="mt-0 off">{{ product.discount_code ? product.discount_code : code }}</h1>
                    </div>
                </div>
                <div class="line">
                    <hr>
                </div>
                <div class="text-center mb-5"> <span class="text-uppercase">Valid for 15 minutes</span> </div>
                <div class="text-right p-1"> <small>*EXPRESS</small> </div>
            </div>
        </div>
  </div>
</template>

<script>
import {
  discountToken,
  getDiscount, getPostByID
} from "../api/posts";

import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      product: {},
      discount: 0,
      code: 0,
      discountToken: {}
    };
  },
  async created() {
      this.discountToken = await discountToken(this.$route.params.token);
      this.code = this.discountToken.code;
      console.log(this.discountToken, 'discountTokennandsakjdnasjkhnkj')
    // this.product = await getPostByID(this.discountToken.product_id);
    // if(!this.product.discount_code || this.product.discount_code === 0) {
    //   this.code = this.generateRandomInteger(1000, 9999);
    //   this.discount = await getDiscount(this.discountToken.product_id, this.code);
    // }
  },
  methods: {
    generateRandomInteger(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
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
</style>
