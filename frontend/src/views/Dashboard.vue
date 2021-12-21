<template>
  <div class="container py-5 mt-5">
    <h1>Hello {{user.name}}</h1>
    
    <b-table :items="users" :fields="user_fields" caption-top :per-page="perPage" :current-page="UcurrentPage" id="my-table">

      <template #table-caption>Users Table.</template>

      <template #cell(date)="date">
        <p>{{new Date(date.item.date).toLocaleString('en-GB', { timezone: 'UTC'})}}</p>
      </template>

       <template #cell(edit)="edit_id">
        <router-link :to="{ name: 'EditUser', params: { id: edit_id.item._id}}"><input type="submit" class="btn btn-primary" value="Edit" ></router-link>
      </template>

      <template v-slot:cell(delete)="data">
        <input type="submit" value="Delete" class="btn btn-danger" @click="removeUser(data.item._id)">
      </template>

    </b-table>
    <div class="overflow-auto">
      <b-pagination
        v-model="UcurrentPage"
        :total-rows="userRows"
        :per-page="perPage"
        aria-controls="my-table">
      </b-pagination>
    </div>

  <b-table :items="products" :fields="products_fields" caption-top :per-page="perPage" :current-page="PcurrentPage" id="product-table">

      <template #table-caption>Products Table.</template>

      <template #cell(image)="image">
        <router-link :to="{ name: 'Product', params:{ id: image.item._id }}">
          <img class="prod-img img-fluid" style="max-width: 150px;" :src="`../../${image.item.image}`" alt="" />
        </router-link>
      </template>

      <template #cell(content)="content">
        <p>{{content.item.content.substring(0, 200) + "..."}}</p>
      </template>

      <template #cell(price)="price">
        <p>{{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", }).format(price.item.price)}}</p>
      </template>

      <template #cell(created)="created">
        <p>{{new Date(created.item.created).toLocaleString('en-GB', { timezone: 'UTC'})}}</p>
      </template>

      <template #cell(edit)="edit_id">
        <router-link :to="{ name: 'Edit-post', params: { id: edit_id.item._id}}"><input type="submit" class="btn btn-primary" value="Edit" ></router-link>
      </template>

      <template v-slot:cell(delete)="data">
        <input type="submit" value="Delete" class="btn btn-danger" @click="removePost(data.item._id)">
      </template>

  </b-table>

     <div class="overflow-auto">
      <b-pagination
        v-model="PcurrentPage"
        :total-rows="productRows"
        :per-page="perPage"
        aria-controls="product-table"
      ></b-pagination>
    </div>

  <b-table :items="orderedItems" :fields="order_fields" caption-top :per-page="perPage" :current-page="OcurrentPage" id="orders-table">

      <template #table-caption>Orders Table.</template>

      <template #cell(orderId)="orderId">
         <router-link :to="{ name: 'OrderTrack', params: { orderId: orderId.item.orderId }}"><strong>#{{orderId.item.orderId}}</strong></router-link>
      </template>

      <template #cell(carrierStatus)="carrierStatus">
        <div v-if="carrierStatus.item.carrierStatus == 1">Order Confirmed</div>
        <div v-if="carrierStatus.item.carrierStatus == 2">Picked by courier</div>
        <div v-if="carrierStatus.item.carrierStatus == 3">On the way</div>
        <div v-if="carrierStatus.item.carrierStatus == 4">Ready for pickup</div>
      </template>

      <template #cell(update_order)="update_order">
        <router-link :to="{ name: 'UpdateOrder', params: { id: update_order.item.orderId }}"><input type="submit" class="btn btn-primary" value="Edit" ></router-link>
      </template>

      <template v-slot:cell(delete_order)="delete_order">
        <input type="submit" value="Delete" class="btn btn-danger" @click="removeOrder(delete_order.item._id)">
      </template>

    </b-table>
    <div class="overflow-auto">
      <b-pagination
        v-model="OcurrentPage"
        :total-rows="orderRows"
        :per-page="perPage"
        aria-controls="orders-table">
      </b-pagination>
    </div>

  </div>
</template>



<script>
import { getAllUsers, deleteUser } from '../api/user';
import { getPosts, deletePost } from '../api/posts';
import { getAllOrderedItems, deleteOrderedItems } from '../api/orders';
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        perPage: 5,
        UcurrentPage: 1,
        OcurrentPage: 1,
        PcurrentPage: 1,
        users: [],
        user_fields: ['name', 'email', 'role', 'date', 'Edit', 'delete'],
        order_fields: ['orderId', 'buyerId', 'buyerName', 'carrierStatus', 'update_order', 'delete_order'],
        products_fields: ['image', 'title', 'category', 'content', 'rating', 'price', 'created', 'edit', 'delete'],
        products: [],
        orderedItems: [],
      }
    },
    async created(){
        this.users = await getAllUsers();
        this.products = await getPosts();
        this.orderedItems = await getAllOrderedItems();
    },
    methods: {
      async removeUser(id) {
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
              await deleteUser(id);
              this.users= this.users.filter(users =>  users._id != id)
              this.$swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            }
          })
      },
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
              await deletePost(id);
              this.products= this.products.filter(products => products._id != id)
              this.$swal.fire(
                'Deleted!',
                'Post has been deleted.',
                'success'
              )
            }
          }
        )
      },
      async removeOrder(id) {
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
              await deleteOrderedItems(id);
              this.orderedItems = this.orderedItems.filter(orderedItems => orderedItems._id != id)
              this.$swal.fire(
                'Deleted!',
                'Order has been deleted.',
                'success'
              )
            }
          }
        )
      }
    },
    computed: {
      ...mapGetters(["user"]),
      userRows() {
        return this.users.length
      },
      productRows() {
        return this.products.length
      },
      orderRows() {
        return this.orderedItems.length
      }
    }
  }
</script>