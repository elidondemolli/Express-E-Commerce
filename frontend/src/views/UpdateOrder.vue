<template>
  <div>
    <section class="wrapper container">
      <div class="title">Update Order Status</div>
      <form
        method="POST"
        enctype="multipart/form-data"
        class="form"
        @submit.prevent="updateForm"
      >
      <!-- <div v-for="(items, key) in order.items" :key="items._id">
          <img :src="`../../${order.items[key].image}`" alt="" style="height: 100px;"/>
      </div> -->
        <div class="input_field">
          <label>Buyer Name</label>
          <input
            disabled
            type="text"
            v-model="order.buyerName"
            class="input"
            name="buyerName"
          />
        </div>
        <div class="input_field">
          <label>Order ID</label>
          <input
            disabled
            type="text"
            v-model="order.orderId"
            class="input"
            name="orderId"
          />
        </div>
        <div class="input_field">
          <label>Order Status</label>
          <div class="costum_select">
            <select v-model="order.carrierStatus" name="carrierStatus">
              <option disabled value="">Select</option>
              <option value="1">Order confirmed</option>
              <option value="2">Picked by courier</option>
              <option value="3">On the way</option>
              <option value="4">Ready for pickup</option>
            </select>
          </div>
        </div>
        <div class="input_field">
          <input type="submit" value="Submit" class="btn" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { getOrderedItems, updateOrderStatus } from "../api/orders";
export default {
  name: "UpdateOrder",
  data() {
    return {
        order: {}
    };
  },
  async created() {
    this.order = await getOrderedItems(this.$route.params.id);
    console.log('ds', this.order.carrierStatus)
  },
  methods: {
    async updateForm() {
      const response = await updateOrderStatus(this.$route.params.id, { carrierStatus: this.order.carrierStatus });

      this.$swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })

      this.$router.push({
        name: "Dashboard",
      });
    },
  },
};
</script>
