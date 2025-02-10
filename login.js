document.getElementById('authForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('User registered successfully!');
            window.location.href = 'cart.html';
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    const authForm = document.getElementById("authForm");
    const thankYouNote = document.getElementById("thankYouNote");
    const formContainer = document.querySelector(".form-container");

    authForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting the normal way

        // Simulate form submission (you can add AJAX call here if needed)
        const formData = new FormData(authForm);


        // Hide the form and show the thank you message
        formContainer.classList.add("hidden");
        thankYouNote.classList.remove("hidden");

        // Display custom thank you message
        const thankYouText = `Thank you, ${username}! You have successfully signed up. 😊`;
        thankYouNote.querySelector("p").textContent = thankYouText;

        // Redirect to index.html after 3 seconds
        setTimeout(function () {
            window.location.href = "index.html"; // Change this to the correct redirect page
        }, 3000); // Redirect after 3 seconds
    });
});