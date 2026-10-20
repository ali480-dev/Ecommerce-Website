
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    category: "Clothing",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
    description: "Comfortable everyday style",
  },
  {
    id: 2,
    name: "Premium Running Shoes",
    category: "Shoes",
    price: 3499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    description: "Made for everyday movement",
  },
  {
    id: 3,
    name: "Minimalist Wrist Watch",
    category: "Accessories",
    price: 4299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    description: "A timeless everyday accessory",
  },
  {
    id: 4,
    name: "Everyday Backpack",
    category: "Accessories",
    price: 2199,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
    description: "Space for all your essentials",
  },
  {
    id: 5,
    name: "Modern Sunglasses",
    category: "Accessories",
    price: 1599,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
    description: "Complete your look",
  },
  {
    id: 6,
    name: "Casual Sneakers",
    category: "Shoes",
    price: 2999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700",
    description: "Comfort meets modern design",
  },
  {
    id: 7,
    name: "Everyday Hoodie",
    category: "Clothing",
    price: 2499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700",
    description: "Soft, relaxed and versatile",
  },
  {
    id: 8,
    name: "Leather Shoulder Bag",
    category: "Accessories",
    price: 2799,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700",
    description: "A stylish daily companion",
  },
];

const formatPrice = (price) =>
  `Rs. ${price.toLocaleString("en-PK")}`;

function readSavedCart() {
  try {
    return JSON.parse(localStorage.getItem("shopease-cart")) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(readSavedCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("shopease-cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", "Clothing", "Shoes", "Accessories"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to cart`);
    setCartOpen(true);
  }

  function changeQuantity(productId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
    setNotice("Product removed from cart");
  }

  function handleCheckout() {
    if (cart.length === 0) return;

    alert(
      `Demo checkout\nItems: ${totalItems}\nTotal: ${formatPrice(totalPrice)}\n\nNo payment has been processed.`
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home" aria-label="ShopEase home">
         Meno Collection<span>.</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#about">About</a>
          <a href="#footer">Contact</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart with ${totalItems} items`}
        >
          <span aria-hidden="true">🛒</span> Cart
          <span className="cart-count">{totalItems}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">YOUR STYLE, YOUR WAY</span>
            <h1>Find Your Style.<br />Love Every Purchase.</h1>
            <p>
              Discover everyday essentials, fresh styles, and accessories
              picked just for you.
            </p>
            <a className="primary-button hero-button" href="#products">
              Explore Collection <span aria-hidden="true">→</span>
            </a>
            <div className="hero-note">
              <span>✓</span> Simple shopping, great style
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
              alt="Modern clothing store interior"
            />
            <div className="hero-tag">
              <span>Everyday finds</span>
              <strong>Made for you.</strong>
            </div>
          </div>
        </section>

        <section className="benefits" aria-label="Shopping benefits">
          <div><span>✦</span><strong>Curated Products</strong><small>Picked with care</small></div>
          <div><span>♡</span><strong>Everyday Style</strong><small>For every occasion</small></div>
          <div><span>✓</span><strong>Easy Shopping</strong><small>A simple experience</small></div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE SHOP</span>
              <h2>Find Your Favorites</h2>
              <p>Browse our collection of everyday essentials.</p>
            </div>

            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
              />
              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
          </div>

          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="results-line">
            <span>{filteredProducts.length} products</span>
            <span>Thoughtfully selected for you</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    <span className="product-category">{product.category}</span>
                  </div>

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-bottom">
                      <strong className="product-price">
                        {formatPrice(product.price)}
                      </strong>
                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <span aria-hidden="true">+</span> Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span aria-hidden="true">⌕</span>
              <h3>No products found</h3>
              <p>Try another search term or choose a different category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div className="about-icon">S.</div>
          <div>
            <span className="eyebrow">WELCOME TO SHOPEASE</span>
            <h2>Good finds. Easy choices.</h2>
            <p>
              Shop everyday clothing, shoes, and accessories in one simple
              place. Explore the collection and find something that fits you.
            </p>
          </div>
          <a href="#products" className="text-link">Explore products →</a>
        </section>
      </main>

      <footer className="footer" id="footer">
        <a className="logo footer-logo" href="#home">
           Meno Collection<span>.</span>
        </a>
        <p>Everyday shopping, made simple.</p>
        <small>© {new Date().getFullYear()} Dev by. Ahtisham Abbasi Frontend Developer.</small>
      </footer>

      {notice && (
        <div className="notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss message">
            ×
          </button>
        </div>
      )}

      {cartOpen && (
        <div
          className="cart-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2 id="cart-title">Shopping Cart ({totalItems})</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping cart"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span aria-hidden="true">🛍️</span>
                <h3>Your cart is empty</h3>
                <p>Find something you love and add it here.</p>
                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{formatPrice(item.price)}</p>

                        <div className="quantity-row">
                          <div className="quantity-controls">
                            <button
                              onClick={() => changeQuantity(item.id, -1)}
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => changeQuantity(item.id, 1)}
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="remove-button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <strong className="item-subtotal">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="summary-row total-row">
                    <strong>Total</strong>
                    <strong>{formatPrice(totalPrice)}</strong>
                  </div>
                  <p className="checkout-note">
                    This is a demo store. Checkout will not take payment.
                  </p>
                  <button className="checkout-button" onClick={handleCheckout}>
                    Proceed to Checkout <span aria-hidden="true">→</span>
                  </button>
                  <button
                    className="continue-button"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
