/* 
	Tell us about your project below!👇

  - I used the Rick and morty API I found from the project resources:
  https://rickandmortyapi.com/
  from
  https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/

  - I clicked around a lot on the API website and I tried to take notice of how the URL path would change

  - Also, I used the console to see the hierarchical structure of the JSON data so I could figure out how to properly parse the data

  - My project can take on 3 different searches and sorts through the data to find matches to all three inputs

  - The user must use at least one of the search fields but does not have to use all of them

  - The API offers a lot of data so in my next update to this website I would make the cards more detailed and visually pleasing

  - I would also like to offer more search categories and possibly use radio buttons for the categories that only have 2 options
*/

let characterList = document.getElementById("characters");

// Setting up the MutationObserver to remove "no results found" when a result is found
// Listen for the addition or removal of child elements
const observerOptions = {
  childList: true, 
};

// Define function to handle mutations
const observerCallback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      document.getElementById('no-word-found').innerText = '';
    }
  }
};

// Create and start observer
const observer = new MutationObserver(observerCallback);
observer.observe(characterList, observerOptions);


// Calling search() when enter is pressed
// Get the input fields
let inputs = [document.getElementById("name-search-input"), document.getElementById("status-search-input"), document.getElementById("gender-search-input")]

// Execute a function when the user presses a key on the keyboard
for(let input of inputs){
  input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key, search() is called
    if (event.key === "Enter") {
      search();
    }
  });
}


function search(){ 
  // Erase previous results
  characterList.innerHTML = "";

  // Correct hero and results size
  let hero = document.getElementsByTagName("section")[0];
  let results = document.getElementById("results-container");
  if(hero.classList.contains("full")){
    hero.classList.remove("full");
  }
  if(results.classList.contains("init")){
    results.classList.remove("init");
  }
  
  // Get user input
  let character = document.getElementById("name-search-input").value;
  let status = document.getElementById("status-search-input").value;
  let gender = document.getElementById("gender-search-input").value;
  console.log(`character: ${character}\nstatus: ${status}\ngender: ${gender}`)

  // Ensure proper input
  if(character+status+gender == ""){
    document.getElementById("no-word-found").innerText = "Please enter your search into the input boxes above.";
    return;
  }

  // Delete prompt statement
  document.getElementById("no-word-found").innerText = "No results were found with this criteria.";

  // Call individual search functions
  // empty = true;
  if(character != ""){ getCharacters(character); }
  else if(gender != "" || status != ""){ getAll(); }
  
  // determine if empty
  
  // if(empty){
  //   document.getElementById("no-word-found").innerText = "No results were found with this criteria.";
  // }
  // else{
  //   document.getElementById("no-word-found").innerText = "";
  // }
}



function getCharacters(character){
  // let found = false;
  for(let i=1; i<=826; i++){
    axios.get("https://rickandmortyapi.com/api/character/"+i).then(response => {
      if(response.data.name.toUpperCase().includes(character.toUpperCase())){
        displayCharacter(response.data);
      }
    });
  }
  // return !found;
}

function getAll(){
  let found = false;
  for(let i=1; i<=826; i++){
    axios.get("https://rickandmortyapi.com/api/character/"+i).then(response => {
      displayCharacter(response.data);
    });
  }
  // return !found;
}

function refineStatus(item){
  let status = document.getElementById("status-search-input").value;
  if(status != "" && item.status.toUpperCase() != status.toUpperCase()){ return false; }
  return true;
}

function refineGender(item){
  let gender = document.getElementById("gender-search-input").value;
  if(gender != "" && item.gender.toUpperCase() != gender.toUpperCase()){ return false; }
  return true;
}



function displayCharacter(data){
  if(!refineStatus(data)){ return; }
  if(!refineGender(data)){ return; }
  
  let listItem = document.createElement("div");
  listItem.className = "g-4 col-sm-6 col-md-4 col-lg-3 col-xxl-2";
  listItem.innerHTML =
    `<div class="card">
      <img src=${data.image} class="card-img-top" alt="Character Image">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">${data.gender}</p>
      </div>
      <div class="card-footer">
        ${data.status}
      </div>
    </div>`;
  
  characterList.appendChild(listItem);
}