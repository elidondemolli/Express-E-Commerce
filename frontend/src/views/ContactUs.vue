<template>
  <div>
    <section class="wrapper container">
      <div class="title">Contact Us</div>
      <form
        method="POST"
        enctype="multipart/form-data"
        class="form"
      >
        <div class="input_field">
          <label>Name</label>
          <input
            type="text"
            class="input"
            name="name"
          />
        </div>
        <div class="input_field">
          <label>Email</label>
          <input
            type="email"
            class="input"
            name="email"
          />
        </div>
        <div class="input_field">
          <label>Phone Number</label>
          <input
            type="number"
            class="input"
            name="number"
          />
        </div>
        <div class="input_field">
          <label>Subject</label>
          <textarea class="form-control" rows="10"></textarea>
        </div>
        <div class="input_field">
          <input type="submit" value="Submit" class="btn" />
        </div>
      </form>
    </section>
  </div>
</template>

<style>
</style>