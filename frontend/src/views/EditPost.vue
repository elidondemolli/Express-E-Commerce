<template>
  <div>
    <section class="wrapper container">
      <div class="title">Edit Product</div>
      <form
        method="POST"
        enctype="multipart/form-data"
        class="form"
        @submit.prevent="updateForm"
      >
        <div class="input_field">
          <label>Title</label>
          <input
            type="text"
            v-model="product.title"
            class="input"
            name="title"
          />
        </div>
        <div class="input_field">
          <label>Content</label>
          <input
            type="text"
            class="input"
            name="content"
            v-model="product.content"
          />
        </div>
        <img class="img-fluid mb-3" :src="`/${product.image}`" alt="" />
        <div class="input_field">
          <label>Image</label>
          <input
            type="file"
            id="file"
            ref="file"
            @change="selectFile"
            class="input"
            name="image"
          />
        </div>
        <div class="input_field">
          <label>Rating</label>
          <div class="costum_select">
            <select v-model="product.rating" name="rating" id="">
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div class="input_field">
          <label>Category</label>
          <input
            type="text"
            class="input"
            name="category"
            v-model="product.category"
          />
        </div>
        <div class="input_field">
          <label>Price</label>
          <input
            type="text"
            class="input"
            name="price"
            v-model="product.price"
          />
        </div>
        <div class="input_field">
          <input type="submit" value="Submit" class="btn" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { updatePost, getPostByID } from "../api/posts";
export default {
  name: "Edit-post",
  data() {
    return {
      product: {
        title: "",
        content: "",
        image: "",
        rating: "",
        category: "",
        price: "",
      },
      image: "",
    };
  },
  async created() {
    this.product = await getPostByID(this.$route.params.id);
  },
  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
    },
    async updateForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.product.title);
      formData.append("content", this.product.content);
      formData.append("rating", this.product.rating);
      formData.append("category", this.product.category);
      formData.append("price", this.product.price);
      formData.append("old_image", this.product.image);

      const response = await updatePost(this.$route.params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.$router.push({
        name: "Home",
        params: { message: response.message },
      });
    },
  },
};
</script>


<style>
.wrapper {
  margin-top: 140px;
  max-width: 800px !important;
  width: 100%;
  background: #eeeded;
  padding: 30px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.125);
}

.wrapper .title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #313131;
  text-transform: uppercase;
  text-align: center;
}

.wrapper .form {
  width: 100%;
}

.wrapper .form .input_field {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.wrapper .form .input_field label {
  width: 100px;
  color: #757575;
  margin-right: 10px;
  font-size: 14px;
}

.wrapper .form .input_field .input {
  width: 100%;
  outline: none;
  border: 1px solid #d5dbd9;
  font-size: 15px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: all 3s ease;
}

.wrapper .form .input_field .costum_select {
  position: relative;
  width: 100%;
  height: 37px;
}

.wrapper .form .input_field .costum_select select {
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #d5dbd9;
  width: 100%;
  height: 100%;
  padding: 8px 10px;
  border-radius: 3px;
  outline: none;
}

.wrapper .form .input_field .costum_select select:before {
  content: "";
  position: absolute;
  top: 12;
  right: 10;
  border: 8px solid;
  border-color: black;
}

.wrapper .form .input_field:focus,
.wrapper .form .input_field .input:focus,
.wrapper .form .input_field select:focus {
  border: 1px solid #181817;
}

.wrapper .form .input_field .btn {
  width: 100%;
  padding: 8px 10px;
  font-size: 15px;
  border: 0;
  background: #b6b5b5;
  cursor: pointer;
  border-radius: 3px;
  outline: none;
}

.wrapper .form .input_field:last-child {
  margin-bottom: 0;
}

.wrapper .form .input_field .btn:hover {
  background: #9e9e9e;
}

@media (max-width: 420px) {
  .wrapper .form .input_field {
    flex-direction: column;
    align-items: flex-start;
  }

  .wrapper .form .input_field label {
    margin-bottom: 5px;
  }
}
</style>