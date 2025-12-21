// Product Data
const products = [
    {
        id: 1,
        name: "Karseell Maca Power Collagen",
        price: 100.00,
        category: "treatments",
        image: "fas fa-leaf",
        description: "Maca essence repair collagen for dry, damaged hair. Cleanses chemically treated hair and relaxes tense scalp."
    },
    {
        id: 2,
        name: "Karseell Argan Oil",
        price: 150.00,
        category: "oils",
        image: "fas fa-tint",
        description: "Professional argan oil for dry hair or body skin. Provides superior moisture and repair benefits."
    },
    {
        id: 3,
        name: "Afri'pure Rosemary + Mint Hair Growth Oil",
        price: 120.00,
        category: "oils",
        image: "fas fa-seedling",
        description: "Hair growth oil that reduces hair loss, soothes scalp, provides itch relief, prevents dandruff, and promotes hair growth."
    },
    {
        id: 4,
        name: "Afri'pure Shea Butter + Marula Oil",
        price: 120.00,
        category: "oils",
        image: "fas fa-tint",
        description: "Moisturising hair oil that seals in moisture, soothes irritated scalp, protects from UV damage, and smooths frizz."
    },
    {
        id: 5,
        name: "Afri'pure Peppermint Oil",
        price: 180.00,
        category: "oils",
        image: "fas fa-leaf",
        description: "Adds shine and glow to your hair. Stimulates scalp, reduces dandruff, and promotes hair growth."
    },
    {
        id: 6,
        name: "Afri'pure Jojoba Oil",
        price: 180.00,
        category: "oils",
        image: "fas fa-tint",
        description: "Hydrates and conditions hair and scalp. Provides non-greasy conditioning for all hair types."
    },
    {
        id: 7,
        name: "Afri'pure Avocado Oil",
        price: 180.00,
        category: "oils",
        image: "fas fa-seedling",
        description: "Soft, shiny moisturised hair. Strengthens hair, reduces inflammation, contains vitamins A, B, D, and E."
    },
    {
        id: 8,
        name: "Afri'pure Argan Oil",
        price: 180.00,
        category: "oils",
        image: "fas fa-tint",
        description: "Superior shine and lustre. Anti-aging, moisturizing, and repairing damaged hair with natural benefits."
    },
    {
        id: 9,
        name: "Frizz Rebel Coconut & Sweet Almond Oil",
        price: 190.00,
        category: "oils",
        image: "fas fa-tint",
        description: "50% more volume. Coconut and sweet almond oil blend for frizz control and hair nourishment."
    },
    {
        id: 10,
        name: "One Step Hair Dryer & Styler",
        price: 380.00,
        category: "dryers",
        image: "fas fa-wind",
        description: "Smooth, frizz-free blowouts in half the time! Professional hot air brush with straightening and drying functions."
    },
    {
        id: 11,
        name: "Professional Hair Rollers Set",
        price: 190.00,
        category: "curlers",
        image: "fas fa-circle",
        description: "Set of 20 professional hair rollers for creating beautiful curls and waves. Perfect for all hair types."
    },
    {
        id: 12,
        name: "Professional Hair Brush",
        price: 150.00,
        category: "brushes",
        image: "fas fa-brush",
        description: "High-quality hair brush with flexible bristles for gentle detangling and styling. Perfect for daily use."
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryCards = document.querySelectorAll('.category-card');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartCount();
    
    // Ensure logo displays properly on mobile
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.addEventListener('load', function() {
            this.style.display = 'block';
        });
        logoImage.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }
});

// Setup Event Listeners
function setupEventListeners() {
    // Filter and sort
    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
    
    // Cart modal
    closeModal.addEventListener('click', () => cartModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.style.display = 'none';
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', checkout);
    
    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            categoryFilter.value = category;
            filterProducts();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Forms
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    document.getElementById('newsletter-form').addEventListener('submit', handleNewsletterForm);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Display Products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <i class="${product.image}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">R${product.price.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter and Sort Products
function filterProducts() {
    let filteredProducts = [...products];
    
    // Category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    const sortBy = sortFilter.value;
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
        default:
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayProducts(filteredProducts);
}

// Shopping Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>R${item.price.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})} x ${item.quantity}</p>
            </div>
            <div>
                <span>R${itemTotal.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})" style="color: red;">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// Cart Modal
document.querySelector('.cart-icon').addEventListener('click', function(e) {
    e.preventDefault();
    updateCartDisplay();
    cartModal.style.display = 'block';
});

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: R${total.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n\nThis is a demo website. In a real application, you would be redirected to a payment processor.`);
    
    // Clear cart
    cart = [];
    updateCartCount();
    updateCartDisplay();
    cartModal.style.display = 'none';
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Form Handlers
function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
}

function handleNewsletterForm(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter signup
    showNotification('Thank you for subscribing to our newsletter!');
    e.target.reset();
}

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b9d;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Effects
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Logo handling
function handleLogoDisplay() {
    const logoImage = document.querySelector('.logo-image');
    const logoText = document.querySelector('.logo-text');
    
    if (logoImage && logoText) {
        // Check if image loaded successfully
        if (logoImage.complete && logoImage.naturalHeight !== 0) {
            logoText.style.display = 'none';
        } else {
            // If image failed to load, show text
            logoImage.style.display = 'none';
            logoText.style.display = 'block';
        }
        
        // Add event listeners for better handling
        logoImage.addEventListener('load', function() {
            logoText.style.display = 'none';
        });
        
        logoImage.addEventListener('error', function() {
            this.style.display = 'none';
            logoText.style.display = 'block';
        });
    }
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Handle logo display
    handleLogoDisplay();
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.category-card, .product-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape' && cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    }
    
    // Ctrl/Cmd + K to open cart
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        updateCartDisplay();
        cartModal.style.display = 'block';
    }
});

