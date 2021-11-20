<template>
  <div>
    <section class="container sproduct my-5 pt-5">
      <div class="row mt-5">
        <div v-if="paidFor" class="alert alert-success text-center">
          Thank you for shopping with us :)
        </div>
        <div class="col-lg-5 col-md-12 col-12">
          <img
            class="prod-img img-fluid w-100 pb-1"
            :src="`../../${product.image}`"
            alt=""
            style="width: 100% !important; object-fit: cover;"
          />
        </div>
        <div class="col-lg-6 col-md-12 col-12">
          <h6>{{ product.category }}</h6>
          <h3 class="">{{ product.title }}</h3>
          <h4 class="p-price">
            {{
              new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(product.price)
            }}
          </h4>
          <!-- <button @click="addToCart" class="buy-btn">Add to Cart</button> -->
          <a
            type="submit"
            class="card-link-secondary small text-uppercase"
            @click="addToCart"
            ><i class="fas fa-shopping-cart mr-1"></i> Add to cart
          </a>
          <div style="width: 200px" class="my-3" ref="paypal"></div>
          <router-link
            v-if="user != undefined && user.role == 'Admin'"
            :to="{ name: 'Edit-post', params: { id: product._id } }"
            ><input type="submit" class="btn btn-primary" value="Edit"
          /></router-link>
          <input
            v-if="user != undefined && user.role == 'Admin'"
            type="submit"
            value="DELETE"
            class="btn btn-danger"
            @click="removePost(product._id)"
          />
          <h4 class="mt-3 mb-3">Product Details</h4>
          <span>{{ product.content }}</span>
        </div>
      </div>
    </section>

    <section id="related" class="my-10">
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
          <a href="" @click="reloadPage"
            ><router-link :to="{ name: 'Product', params: { id: post._id } }">
              <img class="img-fluid mb-3" :src="`../../${post.image}`" alt="" />
              <div class="star">
                <i
                  v-for="post in post.rating"
                  :key="post.id"
                  class="fas fa-star"
                ></i>
              </div>
              <h5 class="p-name">{{ post.title }}</h5>
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
import { getPosts, getPostByID, deletePost, getQR_Code } from "../api/posts";
import { carts } from "../api/user";
import { mapGetters } from "vuex";

export default {
  name: "Product",
  data() {
    return {
      posts: [],
      product: {},
      qr: "",
      loaded: false,
      paidFor: false,
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AbW4zqlEW0FoHX2rfjYDuUY6EVzoCUqntd7q9mhyvaAmKztE4hpGDwZ-VnUx_Sn5JAjCYibpo-GMXNDa&currency=EUR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  async created() {
    const data = await getPosts();
    this.product = await getPostByID(this.$route.params.id);
    // this.posts = data.filter(item => item._id != this.$route.params.id && item.category == this.product.category).splice(0, 4);
    this.posts = data.filter( (item) => item._id != this.$route.params.id && item.category == this.product.category).splice(this.generateRandomInteger(0, 3), 4);
    this.QR_C(this.product._id);
  },
  methods: {
    async QR_C(id) {
      function probability(n) {
        return Math.random() < n;
      }
      var prob = 0.5;
      if (probability(prob)) {
        this.qr = await getQR_Code(id);
        console.log('qrqrqrqrq', this.qr)
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: `Hooray! Scan this QR Code and you will get a discount!`,
          html: `<img src=${this.qr.qr} style='width:150px;'>
                 <p>Or Click <a href=${window.location.protocol}//${window.location.host}/discount/${this.qr.jwt_QR_Token}>here</a></p>`,
          showConfirmButton: false,
        });
      }
    },
    async addToCart() {
      if (localStorage.getItem("id")) {
        const products = await carts(this.user._id, { product: this.product });
        this.$swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item has been added to cart!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You need to be logged in to add this item to cart!",
          footer: '<a href="/login">http://www.express.com/login</a>',
        });
      }
    },
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          style: {
            color: "silver",
            shape: "pill",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.title,
                  amount: {
                    value: this.product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            setTimeout(() => {
              this.paidFor = false;
            }, 3000);
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
    reloadPage() {
      window.location.reload();
    },
    async removePost(id) {
      await deletePost(id);
      this.$router.push({ name: "Shop" });
    },
    generateRandomInteger(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
body > div > div  > section.container.sproduct.my-5.pt-5 iv > div.col-lg-5.col-md-12.col-12 > img {
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
}

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

.inputNum {
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

.p-price {
  color: #4e4e4e;
}

.buy-btn {
  background: #999;
  opacity: 1;
  transition: 0.3 all;
}

</style>
