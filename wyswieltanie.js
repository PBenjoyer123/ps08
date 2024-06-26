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
    const items = document.getElementById("topowe");
    items.innerHTML = "";
    
    products.forEach((item) => {
        items.innerHTML += `
        <div class="product-container">
            <div class="product">
                <div class="zdjecie">
                    <img src="${item.image}" alt="${item.brand}">
                </div>
                <div class="captions">
                    <p><center>SPECYFIKACJA</center></p>
                    <p class="description">Marka: ${item.brand}</p>
                    <p class="price">Cena: ${item.price} PLN</p>
                    <p class="description">Procesor: ${item.processor}</p>
                    <p class="description">RAM: ${item.ram}</p>
                </div>
            </div>
            <div class="opis1">
                <p><center><h3>Opis<h3></center></p>
                <p class="opis2">${item.description}</p>
                <button class="cart-button" onclick="addToCart('${item.brand}', '${item.image}', '${item.price}')">Dodaj do koszyka</button>
            </div>
        </div>
        
        `;
    });
}

function addToCart(brand, image, price) {
    console.log('Adding to cart:', { brand, image, price });
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = { brand, image, price };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(brand + ' has been added to the cart');
    loadCart(); 
}


function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Loading cart:', cart);
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
                        <p><center>Opis</center></p>
                        <p class="description">Marka: ${item.brand}</p>
                        <p class="price">Cena: ${item.price} PLN</p>
                    </div>
                    <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItemsDiv.appendChild(div);
        });
    }
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

if (document.getElementById('cart-items')) {
    loadCart();
}

document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = sliderWrapper.querySelectorAll('img');
    const prevButton = document.querySelector('.poprzedni');
    const nextButton = document.querySelector('.nastepny');
    let currentIndex = 0;

    function updateSliderPosition() {
        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }
        updateSliderPosition();
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSliderPosition();
    });

    updateSliderPosition();
});
