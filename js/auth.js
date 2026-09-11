const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("l-email").value;
        const password = document.getElementById("l-password").value;

        const { data, error } = await window.tideSupabaseClient.auth.signInWithPassword({
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

const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("s-email").value;
        const password = document.getElementById("s-password").value;

        const { data, error } = await window.tideSupabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: 'https://ujjwalm1shra.github.io/Tide-and-Seak/login.html'
            }
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created! You can Login now...");
        window.location.href = "login.html";
    });
}
const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");

const loginFormElement = document.getElementById("login-form");
const signupFormElement = document.getElementById("signup-form");

const authEyebrow = document.getElementById("auth-eyebrow");
const authTitle = document.getElementById("auth-title");

if (showSignup) {
    showSignup.addEventListener("click", (event) => {
        event.preventDefault();

        loginFormElement.style.display = "none";
        signupFormElement.style.display = "flex";

        authEyebrow.textContent = "Create Account";
        authTitle.textContent = "Create your Tide&Seak account.";
    });
}

if (showLogin) {
    showLogin.addEventListener("click", (event) => {
        event.preventDefault();

        signupFormElement.style.display = "none";
        loginFormElement.style.display = "flex";

        authEyebrow.textContent = "Login";
        authTitle.textContent = "Sign in to Tide&Seak.";
    });
}