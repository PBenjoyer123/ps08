document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];

    // Fetch products from data.json and display them
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

            // Add event listeners to filter buttons
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

// Function to display products (assuming it's defined somewhere in your code)
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

// Function to add items to the cart
function addToCart(brand, image, price) {
    console.log(`Adding to cart: ${brand}, ${price}`); // Log for debugging
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = { brand, image, price: parseFloat(price) }; // Ensure price is a number
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(brand + ' has been added to the cart');
    loadCart(); // Update the cart display after adding the item
}

// Function to load and display cart items
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
        updateTotalPrice(); // Update total price after loading cart items
    }
}

// Function to remove items from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Function to update the total price
function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0); // Ensure prices are numbers
    let totalPriceElement = document.getElementById('total-price-value');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2); // Display total price as a fixed-point number
    }
}

// Check if we are on the cart page to load the cart items
if (document.getElementById('cart-items')) {
    loadCart();
}
