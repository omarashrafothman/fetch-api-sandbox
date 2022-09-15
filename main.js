var getBtn = document.getElementById("getText"),
  getUserBtn = document.getElementById("getUser"),
  getPosts = document.getElementById("getPosts"),
  addPostsForm = document.getElementById("addPost"),
  outputbox = document.getElementById("output");

getBtn.addEventListener("click", getText);
getUserBtn.addEventListener("click", getUser);
getPosts.addEventListener("click", getPost);
addPostsForm.addEventListener("submit", addPost);

function getText() {
  fetch("text.txt")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      outputbox.innerHTML = data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getUser() {
  fetch("./users.json")
    .then((res) => res.json())
    .then(function (data) {
      let output = "<h2 class='mb-4'>users</h2>";
      console.log(data);
      data.forEach((user) => {
        output += `
        <ul class="list-group mb-3">
            <li class="list-group-item"> ID: ${user.id}</li>
            <li class="list-group-item"> NAME: ${user.name}</li>
            <li class="list-group-item">EMAIL: ${user.email}</li>
        </ul>
            `;
      });
      document.getElementById("output").innerHTML = output;
    });
}

function getPost() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then(function (data) {
      let output = "<h2 class='mb-4'> posts </h2>";
      console.log(data);
      data.forEach((post) => {
        output += `
 <div class="card card-body mb-3">
 <h3> ${post.title}</h3>
 <p> ${post.body}</p>
 
 </div>
        `;
      });
      document.getElementById("output").innerHTML = output;
    });
}

function addPost(e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "post",
    headers: {
      accept: "application/json,text/plain,*/*",
      "content-type": "application/json",
    },
    body: JSON.stringify({ title: title, body: body }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  alert("new post added now  check console log");
}
