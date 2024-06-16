document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            allProducts = data.items;
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
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    products.forEach(product => {
        let div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.brand}">
            <p>${product.brand}</p>
            <p>${product.price} PLN</p>
            <button onclick="addToCart('${product.brand}', '${product.image}', ${parseFloat(product.price)})">Add to Cart</button>
        `;
        productsDiv.appendChild(div);
    });
}

function addToCart(brand, image, price) {
    console.log(`Adding to cart: ${brand}, ${price}`); 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = { brand, image, price: parseFloat(price) }; 
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(brand + ' has been added to the cart');
    loadCart(); 
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            let div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="product">        
                    <div class="captions">
                        <p><center>SPECYFIKACJA</center></p>
                        <p class="description">Marka: ${item.brand}</p>
                        <p class="price">Cena: ${parseFloat(item.price).toFixed(2)} PLN</p> <!-- Ensure price is displayed as a fixed-point number -->
                    </div>
                    <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItemsDiv.appendChild(div);
        });
        updateTotalPrice(); 
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0); 
    let totalPriceElement = document.getElementById('total-price-value');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2); 
    }
}

if (document.getElementById('cart-items')) {
    loadCart();
}
