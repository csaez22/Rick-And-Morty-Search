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
let empty = false;

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
  document.getElementById("no-word-found").innerText = "";

  // Call individual search functions
  empty = true;
  if(character != ""){ empty = getCharacters(character); }
  else if(gender != "" || status != ""){ empty = getAll(); }
  
  // determine if empty
  if(empty){
    document.getElementById("no-word-found").innerText = "No results were found with this criteria.";
  }
  else{
    document.getElementById("no-word-found").innerText = "";
  }
}



function getCharacters(character){
  let found = false;
  for(let i=1; i<=826; i++){
    axios.get("https://rickandmortyapi.com/api/character/"+i).then(response => {
      if(response.data.name.toUpperCase().includes(character.toUpperCase())){
        if(displayCharacter(response.data)){
          found = true;
        }
      }
    });
  }
  return !found;
}

function getAll(){
  let found = false;
  for(let i=1; i<=826; i++){
    axios.get("https://rickandmortyapi.com/api/character/"+i).then(response => {
      if(displayCharacter(response.data)){
        found = true;
      }
    });
  }
  return !found;
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
  if(!refineStatus(data)){ return false; }
  if(!refineGender(data)){ return false; }
  
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
  return true;
}