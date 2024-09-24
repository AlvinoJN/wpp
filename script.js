document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("errorMsg");
    const showPasswordCheckbox = document.getElementById("show-password");

    // Retrieve users from localStorage or initialize with predefined users
    let users = JSON.parse(localStorage.getItem('users')) || [
        { username: "pino", password: "genteng" }, 
        { username: "rakuy", password: "uuy" }, 
        { username: "iyyo", password: "rio" }, 
        { username: "tes", password: "tes" }
    ];

    // Save users back to localStorage whenever a new user is registered
    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Show/Hide Password Logic
    showPasswordCheckbox.addEventListener("change", function() {
        passwordInput.type = this.checked ? "text" : "password";
    });

    // Form Submission Logic (Login)
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (username === "" || password === "") {
            errorMsg.textContent = "Username and Password cannot be empty.";
            errorMsg.classList.add("show");
            return;
        }

        // Check if the user exists
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert("Login successful!");
            window.location.href = "coba.html"; // Redirect to the next page
        } else {
            errorMsg.textContent = "Invalid Username or Password.";
            errorMsg.classList.add("show");
        }
    });

    // Function to register a new user
    function registerUser(username, password) {
        // Check if the user already exists
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            errorMsg.textContent = "Username already taken. Please choose another.";
            errorMsg.classList.add("show");
        } else {
            // Add the new user to the users list and save it
            users.push({ username, password });
            saveUsers(); // Save to localStorage
            alert("Registration successful!");
            errorMsg.textContent = "";
            errorMsg.classList.remove("show");
        }
    }

    // Example usage: Registering a new user
    // Uncomment the following line to test user registration
    // registerUser("newUser", "newPassword123");
});
