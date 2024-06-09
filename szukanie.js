// Funkcja wyszukiwania
function search() {
    var input = document.getElementById('searchInput').value.toLowerCase(); // Pobierz wartość pola wyszukiwania i przekształć ją na małe litery
    var resultsContainer = document.getElementById('results');
    var specialResultsContainer = document.getElementById('specialResults');
    resultsContainer.innerHTML = ''; // Wyczyść wyniki poprzedniego wyszukiwania
    specialResultsContainer.innerHTML = ''; // Wyczyść poprzednie szczególne wyniki

    // Ukryj domyślne produkty na stronie głównej
    var homeProducts = document.querySelectorAll('.home-products');
    homeProducts.forEach(function(product) {
        product.classList.add('hidden');
    });

    // Wczytaj dane JSON z pliku
    fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Wystąpił problem podczas pobierania danych.');
        }
        return response.json();
    })
    .then(jsonData => {
        // Sprawdź, czy dane JSON zawierają klucz 'item'
        if (!jsonData || !jsonData.item) {
            throw new Error('Nie znaleziono danych produktów w pliku JSON.');
        }

        // Przeszukaj dane JSON i znajdź dopasowania
        var matchingResults = jsonData.item.filter(function(item) {
            // Sprawdź, czy nazwa produktu, marka lub cena zawiera wprowadzony tekst
            return item.type.toLowerCase().includes(input) || 
                   item.brand.toLowerCase().includes(input) || 
                   item.price.toLowerCase().includes(input);
        });

        // Podziel wyniki na szczególne i pozostałe
        var specialResults = matchingResults.filter(function(item) {
            return item.special === true;
        });

        var otherResults = matchingResults.filter(function(item) {
            return item.special !== true;
        });

        // Wyświetl szczególne produkty
        if (specialResults.length > 0) {
            specialResults.forEach(function(item) {
                var resultItem = document.createElement('div');
                resultItem.classList.add('product'); // Dodaj klasę dla stylizacji CSS
                resultItem.innerHTML = `
                    <a href="link_do_podstrony_produktu.html">
                        <img src="${item.image}" alt="${item.type}">
                        <div class="product-info">
                            <p class="name">${item.type} - ${item.brand}</p>
                            <p class="price">${item.price}</p>
                        </div>
                    </a>
                `;
                specialResultsContainer.appendChild(resultItem);
            });
        } else {
            specialResultsContainer.textContent = 'Brak wyników.';
        }

        // Wyświetl inne produkty
        if (otherResults.length > 0) {
            otherResults.forEach(function(item) {
                var resultItem = document.createElement('div');
                resultItem.classList.add('product'); // Dodaj klasę dla stylizacji CSS
                resultItem.innerHTML = `
                    <a href="link_do_podstrony_produktu.html">
                        <img src="${item.image}" alt="${item.type}">
                        <div class="product-info">
                            <p class="name">${item.type} - ${item.brand}</p>
                            <p class="price">${item.price}</p>
                        </div>
                    </a>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.textContent = 'Brak wyników.';
        }

        // Pokaż sekcje wyników, jeśli są wyniki
        document.getElementById('szczegolneProduktySection').style.display = specialResults.length > 0 ? 'block' : 'none';
        document.getElementById('productSection').style.display = otherResults.length > 0 ? 'block' : 'none';
    })
    .catch(error => {
        console.error('Wystąpił błąd podczas wczytywania danych:', error);
        resultsContainer.textContent = 'Błąd podczas wczytywania danych.';
        specialResultsContainer.textContent = 'Błąd podczas wczytywania danych.';
    });
}
