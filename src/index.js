

function init () {
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(toys => renderToys(toys))
}

function renderToys(toys) {

  let toyCollection = document.querySelector('#toy-collection')

  toys.forEach(toy => {

  toyCollection.innerHTML += `
  <div class="card">
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id="[toy_id]"> Like <3 </button>
  </div>`

  })

  let likeBtn = document.querySelector(".like-btn")
  likeBtn.addEventListener('click', (e) => {
    console.log(e)
  })

}

// let submitEvent = document.querySelector('.add-toy-form').addEventListener


function submitAndHandle() {
  let addToyForm = document.querySelector('.add-toy-form')
  addToyForm.addEventListener('submit', (e) => {

    e.preventDefault()

    let newArray = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    let numberOfLikes = 0

    let newDiv = document.createElement('div')
    newDiv.className = 'card'
    newDiv.innerHTML = `
    <h2>${newArray.name}</h2>
    <img src="${newArray.image}" class="toy-avatar" />
    <p>${numberOfLikes}</p>
    <button class="like-btn" id="[toy_id]"> Like <3 </button>
    `


    let appendNewToy = document.querySelector('#toy-collection')

    appendNewToy.appendChild(newDiv)

    fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(newArray)

  }) 
  .then(res => res.json())
  .then(data => console.log(data))


  console.log(e.target.name.value)
  console.log(e.target.image.value)

  })



}


// function init2 () {
//   fetch("http://localhost:3000/toys")
//   .then(response => response.json())
//   .then(toys => addLikesButton(toys))
//   }

// function addLikesButton(toys) {
//   let likesButton = document.querySelector('.like-btn')
//   likesButton.addEventListener('click', (e) => {
//     console.log(e)
//   })
// }





let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  init();
  // submitEvent;
  submitAndHandle() 
  // toyForm()
  // init2();

  // initAddToy();

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
