const imgCont = document.getElementById("img-container");
const image = document.createElement("img");
const folCount = document.querySelector(".count");
const name = document.getElementById("name-cont");
const addName = document.createElement("h1");
const appCont = document.querySelector(".app-container");
const errorHeading = document.querySelector(".error-heading");
const repoCount = document.querySelector(".repo-count");
const profileCont = document.querySelector(".profile-container");



// making an XML http Request(API request for data)
function handleClick() {
  let userInput = document.getElementById("username-input");
  let inputValue = userInput.value;
  if (inputValue.length == 0) {
    errorHeading.innerText = "Please enter a Username";
    profileCont.style.display = 'none';
  } else {
    errorHeading.innerText = "";
    apiURL = "https://api.github.com/users/" + inputValue;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 404) {
          errorHeading.innerText = "USER NOT FOUND";
          profileCont.style.display = "none";
        } else {
          profileCont.style.display = "flex";
          const data = JSON.parse(this.responseText);
          console.log(data);
          image.setAttribute("src", data.avatar_url);
          imgCont.appendChild(image);
          addName.innerText = "Name: " + data.name;
          name.appendChild(addName);
          folCount.innerText = "Followers: " + data.followers;
          repoCount.innerText = "Public Repos: " + data.public_repos;
          errorHeading.innerText = "";
        }
      }
    };
    xhr.send();
  }
}

//run handleClick everytime user hits Enter
document.getElementById("username-input").addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleClick();
  }
})
