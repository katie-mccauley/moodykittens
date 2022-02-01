/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let mood = ""
let affection = 5
let name = ""
 /**
  * Called when submitting the new Kitten Form
  * This method will pull data from the form
  * use the provided function to give the data an id
  * you can use robohash for images
  * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
  * then add that data to the kittens list.
  * Then reset the form
  */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  
  let kitten = {
    id: generateId(),
    name: form.name.value, 
    mood: "tolerant",
    affection: 5,
  }
  
  if(kitten.name == ""){
    alert("Enter name!")
    form.reset()
  }else if(findKittenByName(kitten.name)){
    alert("Can't have the same kitten!")
    form.reset()
  }else{
    kittens.push(kitten)
    form.reset()
    saveKittens()
    drawKittens()
  }
}
 /**
  * Converts the kittens array to a JSON string then
  * Saves the string to localstorage at the key kittens
  */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}
 
 /**
  * Attempts to retrieve the kittens string from localstorage
  * then parses the JSON string into an array. Finally sets
  * the kittens array to the retrieved array
  */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData){
    kittens = kittensData
  }
}
  

 /**
  * Draw all of the kittens to the kittens element
  */
function drawKittens() {
  let kittensListElement = document.getElementById("moody-cats")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    if(kitten.mood == "gone"){
      kittensTemplate += `
      <div class="flex-wrap p-2 mt-1 mb-3 darkcard text-danger ">
        <div class="kitten ${kitten.mood}"><img src="https://robohash.org/<${kitten.name}>?set=set4" alt="KittenPhoto"></div>
        <div>
          <span><b> Name: </b></span>
          <span> ${kitten.name}</span>
        </div>
        <div> 
          <span><b> Gone Ran Away </b></span>
        </div>
        

      </div>
      `
    }else{
      kittensTemplate += `
    <div class="flex-wrap p-2 mt-1 mb-3 darkcard lightfont">
      <div class="kitten ${kitten.mood}"><img src="https://robohash.org/<${kitten.name}>?set=set4" alt="KittenPhoto"></div>
      <div class="mt-1 mb-1">
        <span><b>Name: </b></span>
        <span id="name">${kitten.name}</span>
      </div>
      <div class="mt-1 mb-1">
        <span><b>Mood: </b></span>
        <span>${kitten.mood}</span>
      </div>
      <div class="mt-1 mb-1">
        <span><b>Affection: </b></span>
        <span>${kitten.affection}</span>
      </div> 
      <div class = "d-flex space-between mt-1">
        <button class="btn-cancel" onclick = "pet('${kitten.id}')">PET</button>
        <button id="catNip" onclick = "catnip('${kitten.id}')">CATNIP</button>
      </div>
    </div>
    `
    }
   })


   kittensListElement.innerHTML = kittensTemplate
   
}
 /**
  * Find the kitten in the array by its id
  * @param {string} id
  * @return {Kitten}
  */
 function findKittenById(id) {
  return (kittens.find(k => k.id == id));

 }

function findKittenByName(name){
  return (kittens.some(k => k.name == name));
}

 /**
  * Find the kitten in the array of kittens
  * Generate a random Number
  * if the number is greater than .7
  * increase the kittens affection
  * otherwise decrease the affection
  * save the kittens
  * @param {string} id
  */
function pet(id) {
  let kitten = findKittenById(id)
  let randomNumber = Math.random()
  if(randomNumber > .7){
    kitten.affection++
    setKittenMood(kitten)
    saveKittens()
  }else{
    kitten.affection--
    setKittenMood(kitten)
    saveKittens()
  }
  
}
 
 /**
  * Find the kitten in the array of kittens
  * Set the kitten's mood to tolerant
  * Set the kitten's affection to 5
  * save the kittens
  * @param {string} id
  */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.mood = "tolerant"
  kitten.affection = 5
  saveKittens()
  drawKittens()
}
 
 /**
  * Sets the kittens mood based on its affection
  * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
  * @param {Kitten} kitten
  */

function setKittenMood(kitten) {
  document.getElementById("moody-cats").classList.remove(kitten.mood)
  if(kitten.affection >= 6){
    kitten.mood = "happy"
  }
  if(kitten.affection <= 5){
    kitten.mood = "tolerant"
  }
  if(kitten.affection <= 3){
    kitten.mood = "angry"
  }
  if(kitten.affection <= 0){
    kitten.mood = "gone"

  }
  document.getElementById("moody-cats").classList.add(kitten.mood)
  saveKittens()

}
 
function removeKitten(id){
  let index = kittens.findIndex(k => k.id == id)
  if (index == -1){
    throw new Error("invalid Kitten")
  }
  kittens.splice(index, 1)
  saveKittens()
}

function removeCats(){
  kittens = []
  saveKittens()
  getStarted()
}

 function getStarted() {
   document.getElementById("welcome").remove();
   document.getElementById('kats').classList.toggle("hidden")
   document.getElementById("catInsert").classList.toggle("hidden")
   document.getElementById("startOver").classList.toggle("hidden")
   drawKittens();
 }
 
 /**
  * Defines the Properties of a Kitten
  * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
  */
 
 /**
  * Used to generate a random string id for mocked
  * database generated Id
  * @returns {string}
  */
 function generateId() {
   return (
     Math.floor(Math.random() * 10000000) +
     "-" +
     Math.floor(Math.random() * 10000000)
   );
 }


function startGameOver(){
  location.reload()
}

loadKittens()
document.getElementById("removecat").innerText = `Clear ${kittens.length} Kittens`
drawKittens()