import React, { useState, useEffect } from "react";

const ShoppingCart = () => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // State for new item form
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    price: "",
    quantity: 1,
  });

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle input changes for new item form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
      id: newItem.id || Date.now().toString(), // Generate ID if not present
    });
  };

  // Add new item to cart
  const addToCart = (e) => {
    e.preventDefault();

    // Check if item is already in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === newItem.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems([...cartItems, newItem]);
    }

    // Reset form
    setNewItem({
      id: "",
      name: "",
      price: "",
      quantity: 1,
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>

      {/* Add item form */}
      <form onSubmit={addToCart}>
        <div>
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              min="1"
              required
            />
          </label>
        </div>
        <button type="submit">Add to Cart</button>
      </form>

      {/* Cart items */}
      <div className="cart-items">
        <h3>Cart Items</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>x {item.quantity}</span>
                <span>= ${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-total">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
