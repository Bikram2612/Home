// // Make navbar to all the pages
// fetch('navbar.html')
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById('navbar').innerHTML = data;
//     });

// // After click of menu make active 
// const nav_link = document.querySelectorAll('.nav-link');
//   nav_link.forEach(function(link){
//     link.addEventListener('click',function(){
//       nav_link.forEach(l=> l.classList.remove('active'));
//       this.classList.add('active');
//         });
// });

// Since i am loading the nav bar dynamically so i have to use this way
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;

    const nav_link = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split("/").pop();

    nav_link.forEach(function(link) {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    //Cart page redirect
    document.getElementById('btn-cart').addEventListener('click',function(){
       window.location.href = 'Cart.html';
    })
    //login page redirect
    document.getElementById('btn-login').addEventListener('click',function(){
       window.location.href = 'Login.html';
    })
    //Signup page redirect
    document.getElementById('btn-register').addEventListener('click',function(){
       window.location.href = 'SignUp.html';
    })
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    btn_content = document.getElementById('btn-cart')
    btn_content.innerHTML = `<i class="fas fa-shopping-cart nav-icon-space"></i>Cart(${totalQuantity})`;

  });