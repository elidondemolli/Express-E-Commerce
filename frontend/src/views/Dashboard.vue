<template>
  <div class="container py-5 mt-5">
    <h1>Hello {{user.name}}</h1>
    <b-table :items="users" :fields="user_fields" caption-top :per-page="perPage" :current-page="currentPage" id="my-table">
      <template #table-caption>Users Table.</template>
      <template #cell(index)="index">
        {{ index.index + 1}}
      </template>
       <template #cell(edit)="edit_id">
        <router-link :to="{ name: 'EditUser', params: { id: edit_id.item._id}}"><input type="submit" class="btn btn-primary" value="Edit" ></router-link>
      </template>
      <template v-slot:cell(delete)="data">
        <input type="submit" value="Delete" class="btn btn-danger" @click="removePost(data.item._id)">
      </template>
    </b-table>
     <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>

  <b-table :items="products" :fields="products_fields" caption-top :per-page="perPage" :current-page="currentPage" id="my-table">
      <template #table-caption>Products Table.</template>
      <template #cell(index)="index">
        {{ index.index + 1}}
      </template>
       <template #cell(image)="image">
        <img class="prod-img img-fluid" style="max-width: 150px;" :src="`../../${image.item.image}`" alt="" />
      </template>
      <template v-slot:cell(delete)="data">
        <input type="submit" value="Delete" class="btn btn-danger" @click="removePost(data.item._id)">
      </template>
    </b-table>
     <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
  </div>
</template>



<script>
import { getAllUsers, deleteUser } from '../api/user'
import { getPosts } from '../api/posts'
import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        perPage: 5,
        currentPage: 1,
        users: [],
        user_fields: ['index', 'name', 'email', 'role', 'date', 'Edit', 'delete'],
        products_fields: ['index', 'image', 'title', 'category', 'content', 'rating', 'price', 'created', 'edit', 'delete'],
        products: []

      }
    },
    async created(){
        this.users = await getAllUsers();
        this.products = await getPosts();
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
              await deleteUser(id);
              this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              window.location.reload();
            }
          })
      }
    },
    computed: {
      ...mapGetters(["user"]),
      rows() {
        return this.users.length
      }
    }
  }
</script>