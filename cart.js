// Utility function to get items from local storage
function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display the cart on the page
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cart = loadCart();
    cartItemsContainer.innerHTML = ''; // Clear the container

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}

// Event listener for removing items from the cart
document.getElementById('cartItems').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Load and display the cart on page load
window.addEventListener('DOMContentLoaded', function () {
    displayCart();
});
