document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.kontakt-btn').addEventListener('click', () => {
        window.location.href = '#kontakt';
    });
  
    document.querySelector('.koszyk-btn').addEventListener('click', () => {
        window.location.href = 'koszyk.html';
    });
  });
  
  
  let slideIndex = 1;
  showSlides(slideIndex);
  
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slajd");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];
  
    fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
  
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const type = button.getAttribute('data-type');
                    const filteredProducts = allProducts.filter(product => product.type === type);
                    displayProducts(filteredProducts);
                });
            });
        })
        .catch(error => console.error('Error loading the products:', error));
  });
  
  function displayProducts(products) {
    //const items = document.querySelectorAll('.items .item');
    const items = document.getElementById("items");
    console.log(items);
    items.innerHTML = "";
    products.forEach( (product) => {
      items.innerHTML += `
      <div class="item">
      <button class="item-btn" onclick="window.location.href='oferta.html?id=${product.id}'">
              <div class="img-container">
                  <img src="${product.image}" alt="${product.weapon}">
              </div>
              <div class="item-details">
                  <h2>${product.weapon}</h2>
                  <p>${product.skin}</p>
                  <p class="price">€${product.price}</p>
                  <button class="addCart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i></button>
              </div>
              </button>
          </div>
      `;
    });
    document.querySelectorAll('.addCart').forEach(button => {
      button.addEventListener('click', addToCart);
  });
  }
  
  //dodawanie do koszyka
  function addToCart(event) {
    const productId = event.target.closest('button').getAttribute('data-id');
    fetch('db.json')
      .then(response => response.json())
      .then(data => {
        const product = data.products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          product.quantity = 1;
          cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert("Dodano do koszyka!")
      })
      .catch(error => console.error('Error adding product to cart:', error));
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.querySelector('.icon-cart span').textContent = cartCount;
  }
  
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];
  
    fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
            updateCartCount();
  
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const type = button.getAttribute('data-type');
                    const filteredProducts = allProducts.filter(product => product.type === type);
                    displayProducts(filteredProducts);
                });
            });
        })
        .catch(error => console.error('Error loading the products:', error));
  
    // Search functionality
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = document.getElementById('search-input').value.toLowerCase();
      const filteredProducts = allProducts.filter(product => 
        product.weapon.toLowerCase().includes(searchTerm) ||
        product.skin.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
    });
  
  
    // Pobranie zalogowanego użytkownika z pamięci sesji
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if(loggedInUser != null)
    {
      const element = document.getElementById("konto-dropdown-opcje");
      element.innerHTML = `<a  onclick="logout()" class="logout-btn"> Wyloguj się</a>`;
      document.getElementById("konto-btn").textContent = loggedInUser;
    }
  });
  
  
  
  function logout()
  {
    sessionStorage.removeItem('loggedInUser');
    location.reload()
  }