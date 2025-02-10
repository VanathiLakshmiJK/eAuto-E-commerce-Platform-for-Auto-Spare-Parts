// public/cart.js
document.addEventListener('DOMContentLoaded', async () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalItemsElem = document.getElementById('total-items');
    const totalPriceElem = document.getElementById('total-price');

    try {
        // Fetch cart items from backend
        const response = await fetch('/api/cart');
        const cartData = await response.json();

        let totalItems = 0;
        let totalPrice = 0;

        cartData.items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.partName}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="cart-item-price">$${item.price}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        totalItemsElem.textContent = totalItems;
        totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
    } catch (error) {
        console.error('Error loading cart:', error);
    }
});
