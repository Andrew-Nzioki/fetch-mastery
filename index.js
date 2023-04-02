const postsList = document.querySelector(".post-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit = document.querySelector(".btn");
let output = "";

const renderPosts = (posts) => {
  posts.forEach((post) => {
    output += `
      <div class="card mt-4 col-md-6 bg-light ms-2">
        <div class="card-body" data-id=${post.id}>
          <h5 class="card-title" >${post.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
          <p class="card-text">${post.body}
          <a href="#" class="card-link " id="edit-post">Edit</a>
          <a href="#" class="card-link " id="delete-post">Delete</a>
        </div>
      </div>
    `;
  });
  postsList.innerHTML = output;
};
const url = `http://localhost:3000/posts`;
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPosts(data));

//delete post
postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonIsPressed = (e.target.id = "delete-post");
  let editButtonIsPressed = (e.target.id = "edit-post");

  let ID = e.target.parentElement.dataset.id;

  if (delButtonIsPressed) {
    fetch(`${url}/${ID}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }
});

//PATCH /EDIT POST
postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let editButtonIsPressed = (e.target.id = "edit-post");

  let ID = e.target.parentElement.dataset.id;

  if (editButtonIsPressed) {
    const parent = e.target.parentElement;

    const titleElement = parent.querySelector(".card-title");
    const bodyElement = parent.querySelector(".card-text");
    let titleContent = titleElement ? titleElement.textContent : "";
    let bodyContent = bodyElement ? bodyElement.textContent : "";
    titleValue.value = titleContent;
    bodyValue.value = bodyContent;
  }
  //update -update the existing post
  //Method fetch
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleValue.value,
        body: bodyValue.value,
      }),
    }).then((res) => res.json());
  });
});

//POST request
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!titleValue.value || !bodyValue.value) {
    alert("Please fill in both fields!");
    return;
  }
  fetch(`http://localhost:3000/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => renderPosts(data))
    .catch((error) => console.error(error));
});

// //When using data always ensure that you have ID in your JSON data  or you would encounte the error below
// //TypeError: Cannot read properties of undefined (reading 'id')
// at Function.createId (/usr/local/lib/node_modules/json-server/lib/server/mixins.js:58:39)
// at Function.insert (/usr/local/lib/node_modules/json-server/node_modules/lodash-
