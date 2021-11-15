let newUser;
let container = document.querySelector(".container");
displaycount = 1;
function start() {
  for (let index = 1; index <= 3; index++) {
    // const element = array[index];
    newUser = getUser(displaycount);
    displaycount++;
    newUser
      .then((response) => response.json())
      .then((data) => {
        showUser(data);
      });
  }
}
start(displaycount);
function showUser(data) {
  let title = document.createElement("h1");
  let about = document.createElement("p");
  let titletext = data.title;
  title.textContent = titletext.substring(0, 8);
  about.textContent = data.body;
  let post = document.createElement("section");
  post.className = "post";
  post.append(title);
  post.append(about);
  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let profile = document.createElement("section");
      profile.className = "profile";
      let profile_icon = document.createElement("img");
      profile_icon.setAttribute("src", data.results[0].picture.thumbnail);
      profile.append(profile_icon);
      let username = document.createElement("span");
      username.textContent = data.results[0].name.first;
      profile.append(username);
      post.append(profile);
    });
  container.append(post);
}
function getUser(value) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${value}`);
}
let loader;
loader = document.createElement("section");
let scrollValue1 = 1;
let scrollValue2 = 1;
window.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight &&
    scrollValue2 == 1
  ) {
    scrollValue1++;
    window.scrollTo(0, document.body.scrollHeight / 2);
    loader.classList.add("loader");
    container.append(loader);
    setTimeout(() => {
      loader.classList.remove("loader");
      loader.remove();
      start(displaycount);
      console.log("hello");
      scrollValue2 = 1;
    }, 3000);
  }
});
window.addEventListener("scroll", onscroll);
function onscroll() {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight &&
    scrollValue1 == 1
  ) {
    scrollValue1++;
    window.scrollTo(0, document.body.scrollHeight / 2);
    loader.classList.add("loader");
    container.append(loader);
    setTimeout(() => {
      loader.classList.remove("loader");
      loader.remove();
      start(displaycount);
      console.log("hello");
      scrollValue1 = 1;
    }, 3000);
  }
}
