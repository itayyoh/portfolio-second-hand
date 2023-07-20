let cartItems = [];
let totalPrice = 0.00;

function addItem(name, price) {
  cartItems.push({ name, price });
  totalPrice += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";

  for (let item of cartItems) {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  }

  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function checkout() {
  if (cartItems.length > 0) {
    alert("Checkout completed! Thank you for your purchase.");

    cartItems = [];
    totalPrice = 0.00;
    updateCart();
  } else {
    alert("Your cart is empty. Please add items before checking out.");
  }
}
function applyDiscount() {
  const discountPercentage = 0.15;
  const discountedPrice = totalPrice - (totalPrice * discountPercentage);
  totalPrice = discountedPrice;
  updateCart();
}
  
  