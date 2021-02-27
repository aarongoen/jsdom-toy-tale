// let {createElement} = document
let addToy = false;
const baseUrl = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {

  const toyCollection = document.querySelector('#toy-collection')
  const addBtn = document.querySelector("#new-toy-btn")
  const formContainer = document.querySelector(".container")


function getToys() {
  return fetch(baseUrl)
  .then(response => response.json())
}

function postToy(toy_data) {
  fetch(baseUrl, {
  method: 'POST',
  headers:{
      'Content-Type':'application/json',
      Accept: "application/json"
  },
  body: JSON.stringify({
    "name": toy_data.name.value,
    "image": toy_data.image.value,
    "likes": 0
  })
})
.then(response => response.json())
.then(renderCard)
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
  fetch(`${baseUrl}/${e.target.id}`), {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
      Accept:"application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  }
  .then(response => response.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`;
  }))
}

//create
const renderCard = (toy) => {
  
  let hTag = document.createElement('h2')
  hTag.innerText = toy.name 

  let imgTag = document.createElement('img')
  imgTag.src = `${toy.image}`
  imgTag.className = 'toy-avatar'
  
  let pTag = document.createElement('p')
  pTag.innerText = `${toy.likes} likes`
  
  let button = document.createElement('button')
  button.id = toy.id
  button.innerText = "like <3"
  button.className = 'like-btn'
  button.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let newDiv = document.createElement('div') 
  newDiv.className = "card"
  newDiv.append(hTag,imgTag,pTag,button)
  toyCollection.append(newDiv)

}

//   button.addEventListener('click', () => {
//     let likes = Number(pTag.innerText) + 1
//     fetch(`${baseUrl}/${toy.id}`,{
//       method:'PATCH',
//       headers: {
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify({
//         likes
//       })
//     })
//     pTag.innerText = likes
//   })
// }

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  console.log
  if (addToy) {
    formContainer.style.display = "block"
    formContainer.addEventListener('submit', e => {
      e.preventDefault()
      postToy(e.target)
    })
  } else {
    formContainer.style.display = "none"
  }
})


// formContainer.addEventListener('submit', (e) => {
//   e.preventDefault()
//   console.log('hi from the form')
//   const name = e.target["name"].value
//   const image = e.target["image"].value
//   let likes = e.target["likes"].value 
//   console.log(likes)


// .then(data => {
//   data.forEach(renderCard)
// })

getToys().then(toys => {
  toys.forEach(toy => {
})


})






