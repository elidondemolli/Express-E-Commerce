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

    <p class="mt-3">Current Page: {{ currentPage }}</p>
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
        
      }
    },
    async created(){
        this.users = await getAllUsers();
    },
    methods: {
      async removePost(id) {
          console.log(id)
          await deleteUser(id);
          this.$router.push({ name: "Dashboard"});
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