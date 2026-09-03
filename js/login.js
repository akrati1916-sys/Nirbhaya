// js/login.js

document.addEventListener("DOMContentLoaded", () => {

    // Initialize Supabase Client
    const supabaseUrl = 'https://qrufisohvrceqappvhye.supabase.co';
    const supabaseKey = 'sb_publishable_ROZgpJvsMd2Qg-Bm5PVCwg_MiV1aBQG';
    const _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        return;
    }

    loginBtn.addEventListener("click", async function (e) {

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

        try {
            // Fetch matching user from Supabase database table 'users'
            const { data: users, error } = await _supabase
                .from("users")
                .select("*")
                .eq("email", emailInput);

            if (error) {
                console.error("Supabase error:", error.message);
                alert("Something went wrong with the database connection.");
                return;
            }

            if (!users || users.length === 0) {
                alert("No account found with this email. Please Sign Up first.");
                return;
            }

            const foundUser = users[0];

            // Check if password matches
            if (foundUser.password !== passwordInput) {
                alert("Incorrect password! Please try again.");
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
                foundUser.name || "User"
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

        } catch (err) {
            console.error("Unexpected error during login:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    });
});