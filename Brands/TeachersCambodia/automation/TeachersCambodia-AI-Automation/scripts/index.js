const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Simple EJS setup without layouts

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample product data
const products = {
  hairProducts: [
    {
      id: 1,
      name: "Curl Defining Gel",
      price: 24.99,
      image: "/images/curl-gel.jpg",
      category: "Styling Products",
      description: "Professional curl defining gel for natural curls and waves"
    },
    {
      id: 2,
      name: "Moisturizing Shampoo",
      price: 18.99,
      image: "/images/shampoo.jpg",
      category: "Hair Care",
      description: "Hydrating shampoo for all hair types"
    },
    {
      id: 3,
      name: "Deep Conditioning Mask",
      price: 32.99,
      image: "/images/conditioner.jpg",
      category: "Hair Care",
      description: "Intensive repair and moisture treatment"
    },
    {
      id: 4,
      name: "Heat Protectant Spray",
      price: 22.99,
      image: "/images/heat-protectant.jpg",
      category: "Styling Products",
      description: "Protects hair from heat damage up to 450°F"
    }
  ],
  brushes: [
    {
      id: 5,
      name: "Detangling Brush",
      price: 15.99,
      image: "/images/detangling-brush.jpg",
      category: "Brushes",
      description: "Gentle detangling brush for all hair types"
    },
    {
      id: 6,
      name: "Round Brush Set",
      price: 28.99,
      image: "/images/round-brush.jpg",
      category: "Brushes",
      description: "Professional round brush set for styling"
    },
    {
      id: 7,
      name: "Wide Tooth Comb",
      price: 8.99,
      image: "/images/wide-comb.jpg",
      category: "Brushes",
      description: "Perfect for detangling wet hair"
    }
  ],
  tools: [
    {
      id: 8,
      name: "Professional Hair Dryer",
      price: 89.99,
      image: "/images/hair-dryer.jpg",
      category: "Styling Tools",
      description: "Ionic hair dryer with multiple heat settings"
    },
    {
      id: 9,
      name: "Flat Iron",
      price: 79.99,
      image: "/images/flat-iron.jpg",
      category: "Styling Tools",
      description: "Ceramic flat iron with adjustable temperature"
    },
    {
      id: 10,
      name: "Curling Wand",
      price: 65.99,
      image: "/images/curling-wand.jpg",
      category: "Styling Tools",
      description: "Professional curling wand for beautiful curls"
    },
    {
      id: 11,
      name: "Hair Trimmer",
      price: 45.99,
      image: "/images/trimmer.jpg",
      category: "Styling Tools",
      description: "Precision hair trimmer for clean cuts"
    }
  ]
};

// Shopping cart (in-memory for demo)
let cart = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: "Tammy's Shade of Curls",
    products: products,
    cartCount: cart.length
  });
});

app.get('/products', (req, res) => {
  const category = req.query.category || 'all';
  let filteredProducts = [];
  
  if (category === 'all') {
    filteredProducts = [...products.hairProducts, ...products.brushes, ...products.tools];
  } else if (category === 'hair-products') {
    filteredProducts = products.hairProducts;
  } else if (category === 'brushes') {
    filteredProducts = products.brushes;
  } else if (category === 'tools') {
    filteredProducts = products.tools;
  }
  
  res.render('products', { 
    title: "Products",
    products: filteredProducts,
    category: category,
    cartCount: cart.length
  });
});

app.get('/cart', (req, res) => {
  res.render('cart', { 
    title: "Shopping Cart",
    cart: cart,
    cartCount: cart.length
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: "About Us",
    cartCount: cart.length
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: "Contact Us",
    cartCount: cart.length
  });
});

// API Routes
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  // Find product
  const allProducts = [...products.hairProducts, ...products.brushes, ...products.tools];
  const product = allProducts.find(p => p.id == productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Check if product already in cart
  const existingItem = cart.find(item => item.id == productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  res.json({ success: true, cartCount: cart.length });
});

app.post('/api/cart/remove', (req, res) => {
  const { productId } = req.body;
  cart = cart.filter(item => item.id != productId);
  res.json({ success: true, cartCount: cart.length });
});

app.post('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  const item = cart.find(item => item.id == productId);
  
  if (item) {
    if (quantity <= 0) {
      cart = cart.filter(item => item.id != productId);
    } else {
      item.quantity = quantity;
    }
  }
  
  res.json({ success: true, cartCount: cart.length });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Tammy's Shade of Curls server running on http://localhost:${PORT}`);
  console.log(`📁 Project: Hair Products E-commerce`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
});
