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

    const searchButton = document.querySelector('.search-container button');
    searchButton.addEventListener('click', searchProducts);

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });

    function searchProducts() {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => {
            return product.brand.toLowerCase().includes(query) ||
                   product.processor.toLowerCase().includes(query) ||
                   product.ram.toLowerCase().includes(query);
        });
        displayProducts(filteredProducts);
    }

    function displayProducts(products) {
        const items = document.getElementById("topowe");
        items.innerHTML = "";
        
        products.forEach((item) => {
            items.innerHTML += `
            <div class="product">        
                     <div class="zdjecie">
                        <img src="${item.image}" alt="zdjecie1">
                    </div>
                    <div class="captions">
                        <p><center>SPECYFIKACJA</center></p>
                        <p class="description">Marka: ${item.brand}</p>
                        <p class="price">Cena: ${item.price}</p>
                        <p class="description">Procesor: ${item.processor}</p>
                        <p class="description">RAM: ${item.ram}</p>
                </div>
                </div>
            `;
        });
    }
});
