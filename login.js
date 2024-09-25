// Utility function to set cookies
function setCookie(name, value, expires) {
    let date = new Date();
    date.setTime(date.getTime() + expires * 60 * 1000); // expires in minutes
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

// Utility function to delete cookies
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to check if user is logged in
function isLoggedIn() {
    return document.cookie.split(';').some((item) => item.trim().startsWith('user='));
}

// Show/hide profile icon based on login status
function toggleProfileIcon() {
    const profileContainer = document.getElementById('profileContainer');
    if (isLoggedIn()) {
        profileContainer.style.display = 'block';
    } else {
        profileContainer.style.display = 'none';
    }
}

// Login function
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Check credentials
    if (username === 'admin' && password === 'admin') {
        // Store user identity in a cookie (valid for 10 minutes)
        setCookie('user', 'admin', 10);
        alert('Login successful! Welcome, admin.');
        window.location.href = "cart.html"; // Redirect to another page, e.g., cart.html
    } else {
        // Show error message if login fails
        errorMessage.textContent = "Invalid username or password!";
        errorMessage.style.display = "block";
    }
});

// Show/Hide password functionality
document.getElementById('showPassword')?.addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

// Clear cookies when the tab is closed
window.addEventListener('beforeunload', function() {
    deleteCookie('user');
});

// Profile dropdown functionality
const profileIcon = document.getElementById('profileIcon');
const dropdownMenu = document.getElementById('dropdownMenu');

if (profileIcon) {
    profileIcon.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
}

// Sign Out functionality
document.getElementById('signOutLink')?.addEventListener('click', function() {
    deleteCookie('user'); // Remove user cookie
    alert('You have signed out.');
    window.location.href = "login.html"; // Redirect to login page
});

// Close dropdown if clicking outside of it
window.addEventListener('click', function(event) {
    if (!profileIcon?.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Check login status on page load
window.onload = function() {
    toggleProfileIcon();
};
