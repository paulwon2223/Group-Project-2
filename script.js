// const divContainer = document.getElementById("apiNews");

// const requestUrl =
//   "https://newsdata.io/api/1/news?apikey=pub_7851a852526cac7c6cae4c1a0b0af3705169&category=technology";

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     divContainer.innerHTML = "";
//     for (let i = 0; i < 10; i++) {
//       const divElement = document.createElement("div");
//       divElement.setAttribute("class", "api-news");
//       const aTag = document.createElement("a");
//       aTag.setAttribute("class", "news");
//       aTag.textContent = data.results[i].title;
//       aTag.setAttribute("href", data.results[i].link);
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



$("#profileImage").click(function (e) {
  $("#imageUpload").click();
});

function fasterPreview(uploader) {
  if (uploader.files && uploader.files[0]) {
    $("#profileImage").attr(
      "src",
      window.URL.createObjectURL(uploader.files[0])
    );
  }
}

$("#imageUpload").change(function () {
  fasterPreview(this);
});