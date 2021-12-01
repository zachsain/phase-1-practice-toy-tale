

function init () {
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(data => {
  data.map(t => renderToy(t))

  })
}

function renderToy(toy) {
  const toyCard = `<div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image } class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id="${toy.id}">Like <3</button>
</div>`
   
const toyBox = document.querySelector('#toy-collection ')

toyBox.innerHTML += toyCard

let likeBtns = document.getElementsByClassName("like-btn")


  for (let btn of likeBtns) {
  

    btn.addEventListener('click', (e) => {

    
      let id = e.target.id

      let newLikeAmount =  e.target.previousElementSibling.innerText ++
      
      patchLikes(newLikeAmount, id)

      return newLikeAmount

      



    })

  } 

}





let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  init();


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

  //bttn feature 



//new code

    toyFormContainer.addEventListener('submit', e => {
      e.preventDefault()
      postToy(e.target.name.value, e.target.image.value)
    })

//end     

});


// POST & PATCH

function postToy(name, url) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
    
  })
  .then(response => response.json())
  .then(data => console.log(data))

}


function patchLikes(likes, id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "likes": likes
    })
    
  })
  .then(response => response.json())
  .then(data => console.log(data))

}


// function init () {
//   fetch("http://localhost:3000/toys")
//   .then(response => response.json())
//   .then(data => renderToys(data))
//   }

// function renderToys(toys) {

//   console.log(toys)

// let toyCollection = document.querySelector('#toy-collection')

//   toys.forEach(toy => {

//   toyCollection.innerHTML += `
//   <div class="card">
//   <h2>${toy.name}</h2>
//   <img src="${toy.image}" class="toy-avatar" />
//   <p>${toy.likes}</p>
//   <button class="like-btn" id="${toy.id}"> Like <3 </button>
//   </div>`
  

//   })

// }


// function buttonLikes() {

//   let likeBtns = document.getElementsByClassName("like-btn")


//   for (let btn of likeBtns) {
  

//     btn.addEventListener('click', (e) => {
    

//      let newLike = e.target.previousElementSibling.innerText ++

      
//       let newArray = {
//         likes: `${newLike}`
//       }

//       let id = e.target.id

//       console.log(id)

//       // fetch(`http://localhost:3000/toys/${id}`, {
//       //   method: 'PATCH',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     "Accept": "application/json"


//       //   },
//       //   body: JSON.stringify(newArray)
//       // })
//       // .then(res => res.json())
//       // .then(data => console.log(data))
      
//     })
//   }
// }



// // let submitEvent = document.querySelector('.add-toy-form').addEventListener


// function submitAndHandle() {
//   let addToyForm = document.querySelector('.add-toy-form')
//   addToyForm.addEventListener('submit', (e) => {

//     e.preventDefault()

//     let newArray = {
//       name: e.target.name.value,
//       image: e.target.image.value,
//       likes: 0
//     }

//     let numberOfLikes = 0

//     let newDiv = document.createElement('div')
//     newDiv.className = 'card'
//     newDiv.innerHTML = `
//     <h2>${newArray.name}</h2>
//     <img src="${newArray.image}" class="toy-avatar" />
//     <p>${numberOfLikes}</p>
//     <button class="like-btn" id="[toy_id]"> Like <3 </button>
//     `


//     let appendNewToy = document.querySelector('#toy-collection')

//     appendNewToy.appendChild(newDiv)

//     fetch("http://localhost:3000/toys", {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },

//     body: JSON.stringify(newArray)

//   }) 
//   .then(res => res.json())
//   .then(data => console.log(data))


//   console.log(e.target.name.value)
//   console.log(e.target.image.value)

//   })



// }
