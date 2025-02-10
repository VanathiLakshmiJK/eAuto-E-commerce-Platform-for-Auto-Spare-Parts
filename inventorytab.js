document.getElementById('inventoryForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const partData = {
        part_name: document.getElementById('part_name').value,
        category: document.getElementById('category').value,
        subcategory: document.getElementById('subcategory').value,
        manufacturer: document.getElementById('manufacturer').value,
        price: document.getElementById('price').value,
        stock_level: document.getElementById('stock_level').value,
        image_url: document.getElementById('image_url').value
    };

    fetch('http://localhost:3000/api/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(partData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Part successfully posted!');
                // You can also redirect or clear the form here
            } else {
                alert('Error posting part');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
