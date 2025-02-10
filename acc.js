document.getElementById('save-account-btn').addEventListener('click', async () => {
    const name = document.getElementById('account-name').value;
    const email = document.getElementById('account-email').value;
    const password = document.getElementById('account-password').value;
    const address = document.getElementById('account-address').value;

    const accountData = {
        name: name,
        email: email,
        password: password,
        address: address
    };

    try {
        const response = await fetch('http://localhost:3000/api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        });

        // Move this line inside the try block
        const result = await response.json();
        alert(result.message); // Displays a message if the account is saved successfully
    } catch (error) {
        console.error('Error saving account data:', error);
        alert('Failed to save account information. Please try again.');
    }
});
