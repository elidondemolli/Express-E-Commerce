<template>
    <div class="container mt-5 py-5">
<section>

  <div class="row">

    <div class="col-lg-8">

      <div class="mb-3">

        <div class="pt-4 wish-list">

          <h5 class="mb-4">Cart (<span>{{cartItems.length}}</span> items)</h5>

          <div v-for="item in cartItems" :key="item._id" class="row mb-4">
            <div class="col-md-5 col-lg-3 col-xl-3">
              <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                <img class="img-fluid w-100"
                  :src="`${item.image}`" alt="Sample">
                <a href="#!">
                  <div class="mask">
                    <img class="img-fluid w-100"
                      :src="`${item.image}`">
                    <div class="mask rgba-black-slight"></div>
                  </div>
                </a>
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

          <p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
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

          <button type="button" class="btn btn-primary btn-block">go to checkout</button>

        </div>
      </div>

      <div class="mb-3">
        <div class="pt-4">

          <a class="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample"
            aria-expanded="false" aria-controls="collapseExample">
            Add a discount code (optional)
            <span><i class="fas fa-chevron-down pt-1"></i></span>
          </a>

          <div class="collapse" id="collapseExample">
            <div class="mt-3">
              <div class="md-form md-outline mb-0">
                <input type="text" id="discount-code" class="form-control font-weight-light"
                  placeholder="Enter discount code">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</section>
    </div>
</template>

<script>
import { getCarts, deleteCarts } from '../api/user'
export default {
    data() {
        return {
          cartItems: null,
          total: 0
        }
    },
    async created() {
      try {
        
        this.cartItems = await getCarts(localStorage.getItem('id'))
        this.cartItems.forEach(item => {
            return this.total += item.price * item.quantity;
        });

      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async removePost(id) {
        this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
              let newPrice = 0;
              await deleteCarts(localStorage.getItem('id'), id);
              this.cartItems = this.cartItems.filter(item => item._id != id) 
              this.cartItems.forEach(item => {
                  newPrice += item.price * item.quantity;
                  if(newPrice != 0){
                    return this.total = newPrice;
                  } else {
                    return this.total = 0;
                  }
              });
              this.$swal.fire(
                'Deleted!',
                'Post has been deleted.',
                'success'
              )
            }
          })
      },
    },
}
</script>