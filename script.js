// const divContainer = document.getElementById("apiNews");

// const requestUrl =
//   "https://newsdata.io/api/1/news?apikey=pub_7851a852526cac7c6cae4c1a0b0af3705169&category=technology";

// const requestUrl =
//   "https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=e277e6868f8299dd93f5f4cdf4022982";

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data.weather[0].description);
//     divContainer.innerHTML = "";
//     for (let i = 0; i < 10; i++) {
//       const divElement = document.createElement("div");
//       divElement.setAttribute("class", "api-news");
//       const aTag = document.createElement("a");
//       aTag.setAttribute("class", "news");
//       // aTag.textContent = data.results[i].title;
//       // aTag.setAttribute("href", data.results[i].link);
//       aTag.textContent = "Today's weather has: " + data.weather[0].description;
//       aTag.setAttribute("href", data.weather[0].description);
//       aTag.setAttribute("target", "_blank");
//       divElement.appendChild(aTag);
//       divContainer.appendChild(divElement);
//     }
//   });



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
