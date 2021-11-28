<template>
  <div class="container text-center mt-5 py-5">
<div class="">
    <article class="card">
        <header class="card-header"> My Orders / Tracking </header>
        <div class="card-body">
            <h6 style="color: black">Order ID: {{this.$route.params.orderId}}</h6>
            <article class="card">
                <div class="card-body row">
                    <div class="col"> <strong>Estimated Delivery time:</strong> <br>{{ deliveryDate.toDateString() }} </div>
                    <div class="col"> <strong>Shipping BY:</strong> <br> DHL, | <i class="fa fa-phone"></i> +383 44 555 555 </div>
                    <div class="col"> <strong>Status:</strong> <br> Picked by the courier </div>
                    <div class="col"> <strong>Tracking #:</strong> <br> BD045903594059 </div>
                </div>
            </article>
            <div class="track">
                <div :class="`${1 <= carrierStatus ? 'step active' : 'step'}`"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">Order confirmed</span> </div>
                <div :class="`${2 <= carrierStatus ? 'step active' : 'step'}`"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Picked by courier</span> </div>
                <div :class="`${3 <= carrierStatus ? 'step active' : 'step'}`"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> On the way </span> </div>
                <div :class="`${4 <= carrierStatus ? 'step active' : 'step'}`"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Ready for pickup</span> </div>
            </div>
            <hr>
            <ul class="row" style="justify-content: center;"> 
                <li v-for="item in items.items" :key="item._id" class="col-md-4">
                    <figure class="itemside mb-3">
                        <router-link :to="{name: 'Product', params: { id: item.product }}"><div class="aside"><img :src="`../${item.image}`" class="img-sm border" /></div></router-link>
                        <figcaption class="info align-self-center">
                            <p class="title">{{item.category}} <br> {{item.title}}</p> <span class="text-muted"> {{ new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR"}).format(item.price)}}</span>
                        </figcaption>
                    </figure>
                </li>
            </ul>
            <hr> <a href="#" class="btn btn-secondary" style="color: white !important;" data-abc="true"> <i class="fa fa-chevron-left"></i> Back to orders</a>
        </div>
    </article>
</div>
        </div>
</template>
 
<script>
import {
  getOrderedItems
} from "../api/posts";
 
import { mapGetters } from 'vuex';
 
export default {
  name: "OrderTrack",
  data() {
    return {
      deliveryDate: null,
      newdate: null,
      items: [],
      carrierStatus: 0
    };
  },
  async created() {
    this.deliveryDate = new Date();
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 7);
    this.items = await getOrderedItems(this.$route.params.orderId);
    this.carrierStatus = this.items.carrierStatus;
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
.card {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.10rem
}
 
.card-header:first-child {
    border-radius: calc(0.37rem - 1px) calc(0.37rem - 1px) 0 0
}
 
.card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1)
}
 
.track {
    position: relative;
    background-color: #ddd;
    height: 7px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 60px;
    margin-top: 50px
}
 
.track .step {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    width: 25%;
    margin-top: -18px;
    text-align: center;
    position: relative
}
 
.track .step.active:before {
    background: #FF5722
}
 
.track .step::before {
    height: 7px;
    position: absolute;
    content: "";
    width: 100%;
    left: 0;
    top: 18px
}
 
.track .step.active .icon {
    background: #ee5435;
    color: #fff
}
 
.track .icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: relative;
    border-radius: 100%;
    background: #ddd
}
 
.track .step.active .text {
    font-weight: 400;
    color: #000
}
 
.track .text {
    display: block;
    margin-top: 7px
}
 
.itemside {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%
}
 
.itemside .aside {
    position: relative;
    -ms-flex-negative: 0;
    flex-shrink: 0
}
 
.img-sm {
    width: 80px;
    height: 80px;
    padding: 7px
}
 
ul.row,
ul.row-sm {
    list-style: none;
    padding: 0
}
 
.itemside .info {
    padding-left: 15px;
    padding-right: 7px
}
 
.itemside .title {
    display: block;
    margin-bottom: 5px;
    color: #212529
}
 
p {
    margin-top: 0;
    margin-bottom: 1rem
}
</style>