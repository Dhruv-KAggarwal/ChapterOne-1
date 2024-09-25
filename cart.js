// Utility function to get cookies
function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

// Utility function to set cookies
function setCookie(name, value, expires) {
    let expiresDate = "";
    if (expires) {
        let date = new Date();
        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000)); // days
        expiresDate = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expiresDate + "; path=/";
}

// Utility function to delete cookies
function deleteCookie(name) {
    setCookie(name, "", -1);
}

// Function to load the cart from cookies
function loadCart() {
    let cart = getCookie('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to save the cart to cookies
function saveCart(cart) {
    setCookie('cart', JSON.stringify(cart), 1); // cookie lasts 1 day
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
                <span>${item.name} - $${item.price}</span>
                <input type="number" value="${item.quantity}" min="1" class="cart-quantity" data-index="${index}">
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

// Function to add an item to the cart
function addToCart(name, price) {
    let cart = loadCart();
    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1; // Increment quantity if item already in cart
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    saveCart(cart);
    displayCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}

// Function to update the quantity of an item in the cart
function updateCartQuantity(index, quantity) {
    let cart = loadCart();
    cart[index].quantity = quantity;
    saveCart(cart);
    displayCart();
}

// Event listener for adding items to the cart
document.getElementById('addToCartBtn').addEventListener('click', function () {
    const itemName = document.getElementById('itemName').innerText;
    const itemPrice = parseFloat(document.getElementById('itemPrice').innerText.replace('$', ''));
    addToCart(itemName, itemPrice);
});

// Event listener for removing items from the cart
document.getElementById('cartItems').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Event listener for updating item quantities
document.getElementById('cartItems').addEventListener('input', function (e) {
    if (e.target.classList.contains('cart-quantity')) {
        const index = e.target.getAttribute('data-index');
        const quantity = parseInt(e.target.value);
        if (quantity > 0) {
            updateCartQuantity(index, quantity);
        }
    }
});

// Clear cookies when the tab is closed
window.addEventListener('beforeunload', function () {
    deleteCookie('cart');
});

// Load and display the cart on page load
window.addEventListener('DOMContentLoaded', function () {
    displayCart();
});
