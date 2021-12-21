<template>
  <div class="container text-center mt-5 py-5">
    <div class="row mt-5 py-5">
            <div class="card">
                <div class="text-center mt-3 p-2"> <img src="../../img/download.png" width="20%"> </div>
                <div class="text-center"> <small class="text-uppercase flat">DISCOUNT CODE</small> </div>
                <div class="d-flex justify-content-center px-2">
                    <div class="d-flex flex-row">
                        <h1 class="mt-0 off">{{ code ? code : 'Code has expired.' }}</h1>
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
} from "../api/qrCode";

import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      discount: 0,
      code: 0,
      discountToken: {}
    };
  },
  async created() {
      this.discountToken = await discountToken(this.$route.params.token);
      this.code = this.discountToken.code;
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
