function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + ' has been added to the cart');
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            let div = document.createElement('div');
            div.className = 'cart-item';
            div.textContent = item;
            cartItemsDiv.appendChild(div);
        });
    }
}

// Check if we are on the cart page to load the cart items
if (document.getElementById('cart-items')) {
    loadCart();
}
