document.addEventListener('DOMContentLoaded', () => {
    const checkoutItems = document.getElementById('checkoutItems');
    const totalPriceElem = document.getElementById('totalPrice');

    // Use the cart data stored in localStorage (if applicable)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p>Price: $${item.price}</p>
        `;
        checkoutItems.appendChild(itemDiv);
        totalPrice += item.price;
    });

    totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
});

function completePurchase() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

