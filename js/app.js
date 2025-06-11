let allProducts = [];

fetch('https://fakestoreapi.com/products')
  .then(res => res.json()) 
  .then(data => {
    allProducts = data;
    render(allProducts);
  });

// Rendering function
function render(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = products.map(p => `
    <div class="card" style="width: 18rem; padding: 13px; text-align: center; margin: 10px auto;">
      <img src="${p.image}" class="card-img-top custom" alt="${p.title}" style="width: 100%; height: 250px; object-fit: contain;">
      <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title">${p.title.slice(0,12)}...</h5>
        <p class="card-text">${p.description.slice(0, 85)}...</p>
        <p class="card-text border border-secondary rounded px-3 py-1 fw-bold d-inline-block mt-2">$ ${p.price}</p>
        <div class="d-flex gap-2 mt-2">
          <a href="About.html" class="btn btn-dark">Details</a>
          <a href="Cart.html" class="btn btn-dark add-to-cart" data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-image="${p.image}">Add to Cart</a>
        </div>
      </div>
    </div>
  `).join('');

  // Attach "Add to Cart" functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const item = {
        id: this.dataset.id,
        title: this.dataset.title,
        price: parseFloat(this.dataset.price),
        image: this.dataset.image,
        quantity: 1
      };
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      // alert("Item added to cart!");
      location.reload();
    });
  });
}

// Filter buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.textContent.trim();

      if (category === 'All') {
        render(allProducts);
      } else {
        const filtered = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
        render(filtered);
      }
    });
  });
});
