(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  const postIdSelect = document.getElementById("postId");

  for(var i = 1; i <= 10; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.innerText = i.toString();
    postIdSelect.add(opt, null);
  }

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {
    answer.innerHTML = "";
    var ld = createLoadingText(answer, "Loading");
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
        answer.replaceChild(list, ld.element);
        clearInterval(ld.id);
      })
  })

  cw2.addEventListener("click", function () {
    answer.innerHTML = "";
    var ld = createLoadingText(answer, "Loading");
    fetch(`https://jsonplaceholder.typicode.com/posts/${postIdSelect.value}`)
      .then(response => response.json())
      .then(post => {
        const list = document.createElement("dl");
        list.id = "posts";
        const listItemTitle = document.createElement("dt");
        const listItemDescription = document.createElement("dd");
        listItemTitle.innerHTML = `<span class="postID">${post.id}</span><br/><h3>${post.userId}: ${post.title}</h3>`;
        listItemDescription.innerHTML = post.body;
        list.appendChild(listItemTitle);
        list.appendChild(listItemDescription);
        answer.replaceChild(list, ld.element);
        clearInterval(ld.id);
      })
  })

  cw3.addEventListener("submit", (event) => {
    event.preventDefault();
    answer.innerHTML = "";
    var ld = createLoadingText(answer, "Processing");
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: cw3.element["title"],
        body: cw3.elements["content"],
        userId: cw3.elements["userid"],
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(post => {
        const list = document.createElement("dl");
        list.id = "posts";
        const listItemTitle = document.createElement("dt");
        const listItemDescription = document.createElement("dd");
        listItemTitle.innerHTML = `<span class="postID">${post.id}</span><br/><h3>${post.userId}: ${post.title}</h3>`;
        listItemDescription.innerHTML = post.body;
        list.appendChild(listItemTitle);
        list.appendChild(listItemDescription);
        answer.replaceChild(list, ld.element);
        clearInterval(ld.id);
      })
    })
})();

function ellipsisMove(id, elem) {
  var dots = 0;
  clearInterval(id);
  nid = setInterval(frame, 10);
  function frame() {
    elem.innerHTML = ".".repeat((dots++ % 3)+1);
  }
  return nid;
}

function createLoadingText(parent, text) {
  const loading = document.createElement("span");
  loading.id = "posts";
  loading.append(text);
  const ellipsis = document.createElement("span");
  loading.appendChild(ellipsis);
  parent.appendChild(loading);
  return {element: loading, id: ellipsisMove(null, ellipsis)};
}