/*Using JavaScript to fetch data from the API and populate your UI.*/

const API_URL = 'https://fakestoreapi.com';

async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    return products;
}

async function fetchProductDetails(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    const product = await response.json();
    return product;
}

// Initial setup to display products
window.onload = async () => {
    const products = await fetchProducts();
    displayProducts(products);
};

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

let cart = [];

function addToCart(productId) {
    fetchProductDetails(productId).then(product => {
        cart.push(product);
        updateCart();
    });
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove from Cart</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}
