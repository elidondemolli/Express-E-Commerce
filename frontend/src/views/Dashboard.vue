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
      aria-controls="my-table"
    ></b-pagination>
  </div>

  <b-table :items="products" :fields="products_fields" caption-top :per-page="perPage" :current-page="PcurrentPage" id="product-table">
      <template #table-caption>Products Table.</template>
      <template #cell(image)="image">
        <img class="prod-img img-fluid" style="max-width: 150px;" :src="`../../${image.item.image}`" alt="" />
      </template>
      <template #cell(content)="content">
        <p>{{content.item.content.substring(0, 200) + "..."}}</p>
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
  </div>
</template>



<script>
import { getAllUsers, deleteUser } from '../api/user'
import { getPosts, deletePost } from '../api/posts'
import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        perPage: 5,
        UcurrentPage: 1,
        PcurrentPage: 1,
        users: [],
        user_fields: ['name', 'email', 'role', 'date', 'Edit', 'delete'],
        products_fields: ['image', 'title', 'category', 'content', 'rating', 'price', 'created', 'edit', 'delete'],
        products: []

      }
    },
    async created(){
        this.users = await getAllUsers();
        this.products = await getPosts();
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
              this.users= this.users.filter(users=>users._id != id)
              this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
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
              console.log('asdasdasdass', this.products)
              this.products= this.products.filter(products=>products._id != id)
              this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
      }
    },
    computed: {
      ...mapGetters(["user"]),
      userRows() {
        return this.users.length
      },
      productRows() {
        return this.products.length
      }
    }
  }
</script>