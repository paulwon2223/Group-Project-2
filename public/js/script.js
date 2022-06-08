// variables
const news = document.getElementById("news");
const startLog = document.getElementById("load-login");

// API
const apiUrl =
  "https://newsdata.io/api/1/news?apikey=pub_7851a852526cac7c6cae4c1a0b0af3705169&category=technology&country=us";

// news api fetch and render
fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.results);
    news.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const article = document.createElement("a");
      article.textContent = data.results[i].title;
      article.setAttribute = ("href", data.results[i].link);
      article.setAttribute = ("target", "_blank");
      news.appendChild(article);
    }
  });

// google sign in
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Full Name: " + profile.getName());
  console.log("Given Name: " + profile.getGivenName());
  console.log("Family Name: " + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginemail").value.trim();
  const password = document.getElementById("loginpwd").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in");
    }
  }

  // document.location.replace('/login');
};

// document.getElementById('launchbttn')?.addEventListener('click', loginFormHandler);
document
  .getElementById("signinbttn")
  ?.addEventListener("click", loginFormHandler);

const signup = async (event) => {
  event.preventDefault();

  const fname = document.getElementById("fnamesignup").value.trim();
  const lname = document.getElementById("lnamesignup").value.trim();
  // const username = document.getElementById("#username").value.trim();
  const email = document.getElementById("emailsignup").value.trim();
  const password = document.getElementById("passwordsignup").value.trim();
  // const phoneNumer = document.querySelector("#phoneNumber").value.trim();

  if (email && password && fname && lname) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password, lname, fname }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in");
    }
  }
};

document.getElementById("signupbttn")?.addEventListener("click", signup);

const newFormHandler = async (event) => {
  event.preventDefault();

  const post = document.getElementById("postinput").value.trim();

  if (post) {
    const response = await fetch(`/api/dashboard`, {
      method: "POST",
      body: JSON.stringify({ post }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(post);

    // document.getElementById('userpost').textContent = post

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to create project");
    }
  }
};

document.getElementById("postbttn")?.addEventListener("click", newFormHandler);

const loginPage = async (event) => {
  event.preventDefault();

  document.location.replace("/login");
};

document.getElementById("launchbttn")?.addEventListener("click", loginPage);


// bio edit and save 
const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");

editBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const bioElement = document.getElementById("user-bio");
  const bio = bioElement.innerText;

  const input = document.createElement("input");
  input.setAttribute("value", bio);
  input.setAttribute("id", "test-input");

  bioElement.replaceWith(input);

  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
});

saveBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const inputEle = document.getElementById("test-input");
  const newBio = inputEle.value;

  fetch("/api/user/bio", {
    method: "PUT",
    body: JSON.stringify({ newBio }),
  });

  const bioElement = document.createElement("div");
  bioElement.innerText = newBio;
  bioElement.setAttribute("id", "user-bio");

  inputEle.replaceWith(bioElement);

  editBtn.classList.remove("hidden");
  saveBtn.classList.add("hidden");
});





