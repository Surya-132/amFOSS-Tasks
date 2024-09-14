const API_URL = 'https://fakestoreapi.com';

let products = [];
let cart = [];

async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    const fetchedProducts = await response.json();
    products = fetchedProducts;
    return products;
}

async function fetchProductDetails(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    const product = await response.json();
    return product;
}

window.onload = async () => {
    const productData = await fetchProducts();
    displayProducts(productData);

    const commandInput = document.getElementById('commandInput');
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            handleCommandInput(command);
            commandInput.value = '';
        }
    });
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

function addToCart(productId) {
    fetchProductDetails(productId).then(product => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        document.getElementById('terminal').value += `\nAdded ${product.title} to cart.`;
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    document.getElementById('terminal').value += `\nRemoved product with ID: ${productId} from cart.`;
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    const checkoutLink = document.getElementById('checkoutLink');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        checkoutLink.style.display = 'none';
    } else {
        checkoutLink.style.display = 'inline-block';
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
}

function viewCart() {
    if (cart.length === 0) {
        document.getElementById('terminal').value += `\nYour cart is empty.`;
    } else {
        document.getElementById('terminal').value += `\nItems in your cart:\n`;
        cart.forEach(item => {
            document.getElementById('terminal').value += `${item.title} - $${item.price}\n`;
        });
    }
}

function clearTerminal() {
    document.getElementById('terminal').value = '';
}

function searchProductByName(productName) {
    const query = productName.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0) {
        document.getElementById('terminal').value += `\nNo products found matching: ${productName}`;
    } else {
        document.getElementById('terminal').value += `\nFound ${filteredProducts.length} product(s) matching "${productName}":\n`;
        filteredProducts.forEach(product => {
            document.getElementById('terminal').value += `${product.title} - $${product.price}\n`;
        });
    }
}

function sortProducts(criteria) {
    let sortedProducts;

    if (criteria === 'price') {
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (criteria === 'name') {
        sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));
    }

    displayProducts(sortedProducts);
    document.getElementById('terminal').value += `\nProducts sorted by ${criteria}`;
}

function handleCommandInput(command) {
    const parts = command.split(' ');
    const action = parts[0];
    const arg = parts[1];

    if (action === 'clear') {
        clearTerminal();
    } else if (action === 'sort') {
        if (arg === 'price' || arg === 'name') {
            sortProducts(arg);
        } else {
            document.getElementById('terminal').value += `\nInvalid sort criteria. Use 'price' or 'name'.`;
        }
    } else if (action === 'details') {
        const productId = parseInt(arg, 10);
        fetchProductDetails(productId).then(product => {
            document.getElementById('terminal').value += `\n${product.title}: ${product.description}, Price: $${product.price}`;
        });
    } else if (action === 'add') {
        const productId = parseInt(arg, 10);
        addToCart(productId);
    } else if (action === 'remove') {
        const productId = parseInt(arg, 10);
        removeFromCart(productId);
    } else if (action === 'cart') {
        viewCart();
    } else if (action === 'search') {
        searchProductByName(arg);
    } else {
        document.getElementById('terminal').value += `\nUnknown command: ${command}`;
    }
}

window.onload = async () => {
    const productData = await fetchProducts();
    displayProducts(productData);

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    const commandInput = document.getElementById('commandInput');
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            handleCommandInput(command);
            commandInput.value = '';
        }
    });
};
