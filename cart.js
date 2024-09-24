// Simulating adding items to the cart
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const book = {
            title: document.querySelectorAll('.book-card h3')[index].innerText,
            price: document.querySelectorAll('.book-card p')[index].innerText
        };
        cartItems.push(book);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert(`${book.title} added to cart!`);
    });
});

// Displaying items in the cart
window.addEventListener('DOMContentLoaded', () => {
    const cartSection = document.querySelector('.cart-items');
    if (cartItems.length > 0) {
        cartSection.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
            </div>
        `).join('');
    } else {
        cartSection.innerHTML = '<p>Your cart is empty</p>';
    }
});
