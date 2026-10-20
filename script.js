(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  const postList = document.getElementById("posts");

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        const list = document.createElement("dl");
        list.id = "posts";
        for (const post of array) {
          const listItemTitle = document.createElement("dt");
          const listItemDescription = document.createElement("dd");
          listItemTitle.innerHTML = `<span class="postID">${post.id}</span><br/><h3>${post.userId}: ${post.title}</h3>`;
          listItemDescription.innerHTML = post.body;
          list.appendChild(listItemTitle);
          list.appendChild(listItemDescription);
        }
        answer.replaceChild(list, postList);
      })
  })

  cw2.addEventListener("click", function () {
    //TODO
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();
