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
    <footer class="mt-5 py-5">
      <div class="row container mx-auto pt-5">
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <img height="100px" src="../img/Express-Logo.png" alt="">
          <p class="pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lorem ultrices, venenatis ex vehicula. Nam vel lorem ultrices, venenatis ex vehicula. Nam vel lorem ultrices, venenatis ex vehicula.</p>
        </div>
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <h5 class="pb-2">Featured</h5>
          <ul class="text-uppercase list-unstyled">
            <li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Boys</a></li>
            <li><a href="#">Girls</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Shoes</a></li>
            <li><a href="#">Clothes</a></li>
          </ul>
        </div>
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <h5 class="pb-2">Contact Us</h5>
          <div>
            <h6 class="text-uppercase">Address</h6>
            <p>123 Dheu i Bardhe, Gjilan, KOSOVO</p>
          </div>
          <div>
            <h6 class="text-uppercase">Phone</h6>
            <p>(383) 44-444-444</p>
          </div>
           <div>
            <h6 class="text-uppercase">Email</h6>
            <p>Express@Exp.com</p>
          </div>
        </div>
        <div class="footer-one col-lg-3 col-md-6 col-12">
          <h5 class="pb-2">Instagram</h5>
          <div class="row">
            <img class="img-fluid w-25 h-100 m-2" src="../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../img/shoe2.jpg">
            <img class="img-fluid w-25 h-100 m-2" src="../img/shoe2.jpg">
          </div>
      </div>
      </div>
      <div class="copyright mt-5">
        <div class="row container mx-auto">
          <div class="col-lg-4 col-md-6 col-12 text-nowrap mb-2">
            <p>Express @ 2021. All Rights Reserved</p>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <a href="#"><i class="fab fa-facebook-square"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
            <a href="#"><i class="fab fa-instagram-square"></i></a>
          </div>
        </div>
      </div>
    </footer>
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

  footer {
  background-color: #222222;
}

footer h5 {
  color: #D8D8D8;
  font-weight: 700;
  font-size: 1.2rem;
}

footer li{
  padding-bottom: 4px;
}

footer li a{
  font-size: 0.8rem;
  color: #999 !important;
}

footer li a:hover{
  color: #D8D8D8;
}

footer p {
  color: #999;
  font-size: 0.8rem;
}

footer .copyright a{
  color: #000;
  width: 38px;
  height: 38px;
  background-color: #fff;
  display: inline-block;
  text-align: center;
  line-height: 38px;
  border-radius: 50%;
  transition: 0.3 ease;
  margin: 0 5px;
}

footer .copyright a:hover{
  color: #fff;
  background-color: #fb744f;
}
}

</style>
