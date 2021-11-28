<template>
    <div class="container mt-5 py-5">
<section>

  <div class="row">

    <div class="col-lg-8">

      <div class="mb-3">

        <div class="pt-4 wish-list">

          <h5 class="mb-4">Cart (<span>{{cartItems && cartItems.length}}</span> items)</h5>

          <div v-for="item in cartItems" :key="item._id" class="row mb-4">
            <div class="col-md-5 col-lg-3 col-xl-3">
              <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                <router-link :to="{ name: 'Product', params: {id: item.product}}">
                    <img class="img-fluid w-100" :src="`${item.image}`" alt="Sample">
                </router-link>
              </div>
            </div>
            <div class="col-md-7 col-lg-9 col-xl-9">
              <div>
                <div class="d-flex justify-content-between">
                  <div>
                    <h5>{{item.title}}</h5>
                    <p class="mb-3 text-muted text-uppercase small">{{item.category}}</p>
                    <p class="mb-2 text-muted text-uppercase small">Color: blue</p>
                    <p class="mb-3 text-muted text-uppercase small">Size: M</p>
                  </div>
                  <small id="passwordHelpBlock" class="form-text text-muted text-center">
                      (Note, {{item.quantity}} piece)
                    </small>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <a type="submit" class="card-link-secondary small text-uppercase mr-3" @click="removePost(item._id)"><i
                        class="fas fa-trash-alt mr-1"></i> Remove item </a>
                  </div>
                  <p class="mb-0"><span><strong id="summary">{{
                  new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.price)
                }}</strong></span></p >
                </div>
              </div>
            </div>

          </div>

          <p><i class="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
            items to your cart does not mean booking them.</p>

        </div>
      </div>

      <div class="mb-3">
        <div class="pt-4">

          <h5 class="mb-4">Expected shipping delivery</h5>

          <p class="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
        </div>
      </div>

      <div class="mb-3">
        <div class="pt-4">

          <h5 class="mb-4">We accept</h5>

          <img class="mr-2" width="45px"
            src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
            alt="Visa">
          <img class="mr-2" width="45px"
            src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
            alt="American Express">
          <img class="mr-2" width="45px"
            src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
            alt="Mastercard">
          <img class="mr-2" width="45px"
            src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
            alt="PayPal acceptance mark">
        </div>
      </div>

    </div>

    <div class="col-lg-4">

      <div class="mb-3">
        <div class="pt-4">

          <h5 class="mb-3">The total amount of</h5>

          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Temporary amount
              <span>{{
                  new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(total)
                }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>Gratis</span>
            </li>
            <li v-if="discount_fee > 0" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Discount fee
              <span>
                - {{new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(codes.price)
                }}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>The total amount of</strong>
                <strong>
                  <p class="mb-0">(including VAT)</p>
                </strong>
              </div>
              <span><strong>{{
                  new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(total * 1.02)
                }}</strong></span>
            </li>
          </ul>

          <div ref="paypals"></div>

        </div>
      </div>

      <div class="mb-3">
        <div class="pt-4">

          <div>
            <a class="dark-grey-text d-flex justify-content-between" v-b-toggle="'collapse'" data-toggle="collapse" href="#collapseExample"
            aria-expanded="false" aria-controls="collapseExample">
            Add a discount code (optional)
            <span><i class="fas fa-chevron-down pt-1"></i></span>
          </a>
            <b-collapse id="collapse">
              <div class="md-form md-outline mb-0">
              <input type="number" v-model="input" id="discount-code" class="form-control font-weight-light"
                  placeholder="Enter discount code">
              <button type="button" @click="discount" class="btn btn-secondary btn-block">Submit</button>
              <div v-if="this.code_success" class="alert alert-success">Code Applied Successfully!</div>
              <div v-if="this.code_success == false" class="alert alert-danger">Code does not exist!</div>
              <div v-if="this.code_expired " class="alert alert-danger">Code has expired!</div>
              <div v-if="this.input_check" class="alert alert-danger">You have to type in the code!</div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>

    </div>

  </div>

</section>
    </div>
</template>

<script>
import { getCarts, deleteCarts, getUsers } from "../api/user";
import { code, discountToken, delete_discountCodes, createOrderedItems } from "../api/posts";
export default {
  data() {
    return {
      cartItems: null,
      total: 0,
      input: null,
      codes: {},
      code_success: null,
      code_expired: null,
      input_check: false,
      discount_fee: 0,
      loaded: false,
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
    try {
      this.cartItems = await getCarts(localStorage.getItem("id"));
      this.cartItems.forEach((item) => {
        return (this.total += item.price * item.quantity);
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          style: {
            color: 'black',
            label: 'pay',
            tagline: false,
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'EXPRESS E-COMMERCE PAY',
                  amount: {
                    value: (this.total * 1.02).toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log('ORDERS', order);
            const user = await getUsers();
            const orderApproved = {
              buyerId: user._id,
              orderId: order.id,
              carrierStatus: 1,
              items: this.cartItems,
            }
            const sendOrderedItems = await createOrderedItems(orderApproved);
            console.log('send', sendOrderedItems);
            console.log('orderApproved', orderApproved);
            this.$router.push(`/OrderTrack/${sendOrderedItems.orderId}`); 
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypals);
    },
    async discount() {
      try {
        this.codes = await code(this.input);
        const tokenAvailability = await discountToken(this.codes.discount_token);
        if (tokenAvailability) {
            this.$swal.fire({
            title: 'Are you sure?',
            text: "You can use this discount code only once!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, i want to use it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
              this.discount_fee = this.codes.price;
              this.price();
              this.code_success = true;
              await delete_discountCodes(this.codes._id);
              setTimeout(() => {
                this.code_success = null;
              }, 3000);
            }
          })
        }
      } catch (error) {
        this.discount_fee = 0;
        if(error.response.data.message == false){
          this.code_success = false;
          setTimeout(() => {
          this.code_success = null;
          }, 3000);
        } else if(this.input == null) {
          this.input_check = true;
          setTimeout(() => {
            this.input_check = false;
          }, 3000);
        } else {
          this.code_expired = true;
          await delete_discountCodes(this.codes._id);
          setTimeout(() => {
          this.code_expired = null;
          }, 3000);
        }
      }
    },
    async removePost(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let newPrice = 0;
            await deleteCarts(localStorage.getItem("id"), id);
            this.cartItems = this.cartItems.filter((item) => item._id != id);
            this.cartItems.forEach((item) => {
              newPrice += item.price * item.quantity;
              if (newPrice != 0) {
                return (this.total = newPrice);
              }
            });
            this.$swal.fire("Deleted!", "Post has been deleted.", "success");
          }
        });
    },
    price() {
      this.total -= this.codes.price;
    },
  },
};
</script>
