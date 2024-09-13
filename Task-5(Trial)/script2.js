/*JavaScript for Command Handling*/

const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('commandInput');

commandInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleCommand(commandInput.value);
        commandInput.value = '';
    }
});

function handleCommand(command) {
    const [cmd, arg] = command.split(' ');

    switch (cmd) {
        case 'list':
            fetchProducts().then(products => {
                terminal.value = products.map(p => `${p.id}: ${p.title} - $${p.price}`).join('\n');
            });
            break;
        case 'details':
            fetchProductDetails(arg).then(product => {
                terminal.value = `Title: ${product.title}\nDescription: ${product.description}\nPrice: $${product.price}`;
            });
            break;
        case 'add':
            addToCart(arg);
            terminal.value = `Product ${arg} added to cart.`;
            break;
        case 'remove':
            removeFromCart(arg);
            terminal.value = `Product ${arg} removed from cart.`;
            break;
        case 'cart':
            terminal.value = cart.map(item => `${item.id}: ${item.title} - $${item.price}`).join('\n');
            break;
        case 'buy':
            window.location.href = 'checkout.html';
            break;
        case 'clear':
            terminal.value = '';
            break;
        case 'search':
            searchProducts(arg);
            break;
        case 'sort':
            sortProducts(arg);
            break;
        default:
            terminal.value = 'Unknown command.';
    }
}

function searchProducts(name) {
    fetchProducts().then(products => {
        const results = products.filter(p => p.title.toLowerCase().includes(name.toLowerCase()));
        terminal.value = results.map(p => `${p.id}: ${p.title} - $${p.price}`).join('\n');
    });
}

function sortProducts(criteria) {
    fetchProducts().then(products => {
        const sorted = products.sort((a, b) => {
            if (criteria === 'price') {
                return a.price - b.price;
            } else if (criteria === 'name') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
        displayProducts(sorted);
        terminal.value = 'Products sorted.';
    });
}

