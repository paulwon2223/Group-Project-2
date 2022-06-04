const divContainer = document.getElementById("apiNews");

// const requestUrl =
//   "https://newsdata.io/api/1/news?apikey=pub_7851a852526cac7c6cae4c1a0b0af3705169&category=technology";

const requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=e277e6868f8299dd93f5f4cdf4022982";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.weather[0].description);
    divContainer.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const divElement = document.createElement("div");
      divElement.setAttribute("class", "api-news");
      const aTag = document.createElement("a");
      aTag.setAttribute("class", "news");
      // aTag.textContent = data.results[i].title;
      // aTag.setAttribute("href", data.results[i].link);
      aTag.textContent = "Today's weather has: " + data.weather[0].description;
      aTag.setAttribute("href", data.weather[0].description);
      aTag.setAttribute("target", "_blank");
      divElement.appendChild(aTag);
      divContainer.appendChild(divElement);
    }
  });


