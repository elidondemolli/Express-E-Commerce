<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top">
      <div class="container">
        <img height="50px" src="../img/download.png">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span><i id="bar" class="fas fa-bars"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/shop">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add-post">Add Post</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <i class="fal fa-search"></i>
            </li>
            <li class="nav-item">
              <i class="fal fa-shopping-bag"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
  
</template>


<script>
export default {
  data: () => ({
    drawer: null,
  }),
};
</script>


<style>

.navbar {
  font-size: 16px;
  top: 0;
  left: 0;
}

.navbar-light .navbar-nav .nav-link{
  padding: 0 20px;
  color: rgb(0, 0, 0);
  transition: 0.3s ease;
}

.navbar-light .navbar-nav .nav-link:hover,
.navbar i:hover,
.navbar-light .navbar-nav .nav-link.active,
navbar i.active {
  color: coral;
}

.navbar i{
  font-size: 1.2rem;
  padding: 0 7px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s ease;
}

/* Mobile Navigation */
.navbar-light .navbar-toggler {
  border: none;
  outline: none;
}

#bar {
  font-size: 1.5rem;
  padding: 7px;
  cursor: pointer;
  font-weight: 0.3 ease;
  color: black;
}

#bar:hover,
#bar.active{
  color: #fff;
}

@media only screen and (max-width: 991px) {
  body > div > nav > div > button:hover,
  body > div > nav > div > button:focus{
    background-color: coral;
  }

  body > div > nav > div > button:hover #bar,
  body > div > nav > div > button:focus #bar {
    color: #fff;
  }

  #navbarSupportedContent > ul {
    margin: 1rem;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
  }

  #navbarSupportedContent > ul > li:nth-child(n) > a {
    padding: 10px 0;
  }
}

</style>
