// js/signup.js

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Supabase Client
    const supabaseUrl = 'https://qrufisohvrceqappvhye.supabase.co';
    const supabaseKey = 'sb_publishable_ROZgpJvsMd2Qg-Bm5PVCwg_MiV1aBQG';
    const _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const signupForm = document.getElementById('signupForm');

    if (!signupForm) {
        return;
    }

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const fullName = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            // Check if user already exists in Supabase table 'users'
            const { data: existingUsers, error: checkError } = await _supabase
                .from('users')
                .select('*')
                .eq('email', email);

            if (checkError) {
                console.error('Error checking user existence:', checkError.message);
                alert('Database error: ' + checkError.message);
                return;
            }

            if (existingUsers && existingUsers.length > 0) {
                alert('An account with this email already exists. Please login.');
                return;
            }

            // Insert new user into Supabase database table 'users' with all fields
            const { error: insertError } = await _supabase
                .from('users')
                .insert([
                    { 
                        fullName: fullName,
                        email: email, 
                        phone: phone,
                        password: password 
                    }
                ]);

            if (insertError) {
                console.error('Supabase insert error:', insertError.message);
                alert('Failed to save account to database: ' + insertError.message);
                return;
            }

            // LocalStorage backup
            const userData = {
                fullName: fullName,
                email: email,
                phone: phone,
                password: password
            };
            localStorage.setItem(email, JSON.stringify(userData));
            localStorage.setItem('registeredEmail', email);

            alert('Account created successfully! Please login.');

            // Redirect to login page
            window.location.href = 'login.html';

        } catch (err) {
            console.error('Unexpected error during signup:', err);
            alert('An unexpected error occurred. Please try again.');
        }
    });
});