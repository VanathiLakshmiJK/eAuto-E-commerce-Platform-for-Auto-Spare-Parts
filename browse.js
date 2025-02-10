document.getElementById('searchButton').addEventListener('click', searchInventory);

async function searchInventory() {
    const searchQuery = document.getElementById('search').value;
    const category = document.getElementById('categoryFilter').value;
    const manufacturer = document.getElementById('manufacturerFilter').value;

    try {
        const response = await fetch(`http://localhost:3000/api/inventory/search?query=${searchQuery}&category=${category}&manufacturer=${manufacturer}`);
        const parts = await response.json();
        displayProducts(parts);
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

function displayProducts(parts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    parts.forEach(part => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h3>${part.partName}</h3>
            <p>Category: ${part.category}</p>
            <p>Manufacturer: ${part.manufacturer}</p>
            <p>Price: ₹${part.price}</p>
            <button onclick="addToCart('${part._id}')">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
} function addToCart(itemId, itemName, category, manufacturer, price) {
    // Get the current cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cart.push({ itemId, itemName, category, manufacturer, price });

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${itemName} has been added to your cart.`);
}
