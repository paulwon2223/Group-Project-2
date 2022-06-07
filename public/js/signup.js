const loginFormHandler = async(event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    const phoneNumer = document.querySelector("#phoneNumber").value.trim();

    if (email && password && username) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ email, password, username, phoneNumer }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to log in");
        }
    }
};

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);