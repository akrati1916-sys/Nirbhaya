// js/login.js

document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        return;
    }

    loginBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const emailInput = document.getElementById("email").value.trim().toLowerCase();
        const passwordInput = document.getElementById("password").value.trim();

        // Check if fields are empty
        if (!emailInput || !passwordInput) {
            alert("Please enter both email and password.");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput)) {
            alert("❌ Invalid Email Format! Please enter a valid email address.");
            return;
        }

        // Get registered users from localStorage
        const usersJSON = localStorage.getItem("nirbhaya_signup_users");

        if (!usersJSON) {
            alert("No account found. Please Sign Up first.");
            return;
        }

        let users;

        try {
            users = JSON.parse(usersJSON);
        } catch (error) {
            alert("Something went wrong with the account data.");
            return;
        }

        // Find matching user
        const foundUser = users.find(
            user =>
                user.email.toLowerCase() === emailInput &&
                user.password === passwordInput
        );

        // Login failed
        if (!foundUser) {

            const emailExists = users.some(
                user => user.email.toLowerCase() === emailInput
            );

            if (!emailExists) {
                alert("No account found with this email. Please Sign Up first.");
            } else {
                alert("Incorrect password! Please try again.");
            }

            return;
        }

        // Login successful
        alert("✅ Login Successful!");

        // Save logged-in user information
        localStorage.setItem(
            "nirbhaya_current_user_email",
            foundUser.email
        );

        localStorage.setItem(
            "nirbhaya_username",
            foundUser.name
        );

        localStorage.setItem(
            "nirbhaya_user_email",
            foundUser.email
        );

        // Save profile picture if available
        if (foundUser.dp && foundUser.dp.trim() !== "") {
            localStorage.setItem(
                "nirbhaya_userdp",
                foundUser.dp
            );
        } else {
            localStorage.removeItem("nirbhaya_userdp");
        }

        // ⭐ OPEN DASHBOARD AFTER LOGIN
        window.location.href = "dashboard.html";
    });
});