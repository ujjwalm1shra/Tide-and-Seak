const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("l-email").value;
        const password = document.getElementById("l-password").value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Login successful!");

        window.location.href = "predict.html";
    });
}

const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('s-email').value;
        const password = document.getElementById('s-password').value;

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert('Account created! Please check your email to verify your account.');

        window.location.href = 'login.html';
    });
}