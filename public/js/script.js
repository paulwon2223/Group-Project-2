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


// load login page from homepage
