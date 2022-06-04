const requestUrl =
  "https://newsdata.io/api/1/news?apikey=pub_7851a852526cac7c6cae4c1a0b0af3705169&category=technology";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.results);
  });


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
            document.location.replace('/dashboard');
        } else {
            alert("Failed to log in");
        }
    }

    // document.location.replace('/login');
};

// document.getElementById('launchbttn')?.addEventListener('click', loginFormHandler);
document.getElementById('signinbttn')?.addEventListener('click', loginFormHandler);

const signup = async(event) => {
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

  const post = document.getElementById('postinput').value.trim();

  if (post) {
    const response = await fetch(`/api/dashboard`, {
      method: 'POST',
      body: JSON.stringify({ post}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(post);

    // document.getElementById('userpost').textContent = post

    if (response.ok) {
      window.location.reload();
    } else {
      alert('Failed to create project');
    }
  }
};

document.getElementById('postbttn')?.addEventListener("click", newFormHandler)

const loginPage = async (event) => {
  event.preventDefault();

  document.location.replace("/login");
};

document.getElementById('launchbttn')?.addEventListener('click', loginPage);