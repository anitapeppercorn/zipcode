var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSeachTerm = document.querySelector("#repo-search-term");

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found";
    return;
  }

  repoContainerEl.textContent = "";
  repoSeachTerm.textContent = searchTerm;
  console.log(searchTerm);
  console.log(repos);

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].zip_code + "/" + repos[i].lat + "/" + repos[i].lng;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repo nname
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].state > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].state +
        " issues.";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    //append to container
    repoEl.appendChild(statusEl);

    var repoDescription = document.createElement("div");

    if (repos[i].city === null) {
      repoDescription.innerHTML =
        "<class='uppercase'>" + "There is no city for this repo";
    } else {
      repoDescription.innerHTML = "<class='uppercase'>" + repos[i].city;
    }

    //append description
    repoContainerEl.appendChild(repoDescription);

    //append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

var getUserRepos = function (user) {
  //https://www.zipcodeapi.com/rest/Kw3XyO3XjHqeVTrhowyUEZnz9nUaRX5lyiHa59PozklLlOy8NPjDqAlF2MVdmyEd/info.json/95030/degrees
  var apiUrl = "https://www.zipcodeapi.com/rest/Kw3XyO3XjHqeVTrhowyUEZnz9nUaRX5lyiHa59PozklLlOy8NPjDqAlF2MVdmyEd/info.json/" + user + "/degrees";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error " + response.statusText);
      }
    })
    .catch(function (error) {
      //notice this `.catch()` getting chained onto the end of the `.then` method
      alert("Unable to connect to GitHub");
    });
  //console.log("outside");
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter GitHub Username");
  }
};

userFormEl = addEventListener("submit", formSubmitHandler);
