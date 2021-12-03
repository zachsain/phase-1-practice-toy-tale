

function renderToys() {
    fetch("http://localhost:3000/toys")
        .then(response => response.json())
        .then(data => {
            data.map(t => renderToy(t))
        })
}



function renderToy(toy) {

    let toyCard = document.createElement('div')
    toyCard.className = "card"

    let name = document.createElement('h2')
    name.innerText = toy.name

    let image = document.createElement('img')
    image.className = "toy-avatar"
    image.src = toy.image

    let likes = document.createElement('p')
    likes.innerText = toy.likes

    let button = document.createElement('button')
    button.className = "like-btn"
    button.id = toy.id
    button.innerText = 'Like <3'

    toyCard.appendChild(name)
    toyCard.appendChild(image)
    toyCard.appendChild(likes)
    toyCard.appendChild(button)

    let toyCollection = document.querySelector('#toy-collection')
    toyCollection.appendChild(toyCard)

    const toyBox = document.querySelector('#toy-collection')
    let likeBtns = document.getElementsByClassName("like-btn")
    for (let btn of likeBtns) {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            let id = e.target.id
            let newLikeAmount = e.target.previousElementSibling.innerText
            patchLikes(newLikeAmount, id, e)
        })

    }

}

// function likeButtonFeature() {

//   const toyBox = document.querySelector('#toy-collection')

//   // console.log(toyBox)

//   // toyBox.innerHTML += toyCard

//   let likeBtns = document.getElementsByClassName("like-btn")

//   console.log(likeBtns)



//   for (let btn of likeBtns) {

//     console.log(btn)

//     btn.addEventListener('click', (e) => {

//       console.log(e)

//       // e.preventDefault()

//       let id = e.target.id



//       let newLikeAmount = e.target.previousElementSibling.innerText



//       patchLikes(newLikeAmount, id, e)







//     })

//   }
// }





let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    renderToys()

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

    toyFormContainer.addEventListener('submit', e => {
        e.preventDefault()
        postToy(e.target.name.value, e.target.image.value)
    })
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
        .then(data => { console.log(data); renderToys() })

}


function patchLikes(likes, id, e) {

    e.preventDefault()


    let increment = parseInt(e.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },

        body: JSON.stringify({
            "likes": increment
        })

    })
        .then(response => response.json())
        .then(data => {

            e.preventDefault()
            e.target.previousElementSibling.innerText = `${increment}`
        })

}

