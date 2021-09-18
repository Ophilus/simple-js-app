let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon == 'object' &&
      "name" in pokemon
    ) {
        pokemonList.push(pokemon);
    }
  }

  function findPokemon(){
    let findByName = document.querySelector('.search').value;

    let filteredData = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(findByName.toLowerCase()));
    console.log(filteredData);
    return filteredData;
  }
  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

 function addListItem(pokemon) {
    let ul = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('listButton');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }
  function loadList() {
    showLoadingMessage("data");
    return fetch(apiUrl).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    showLoadingMessage("details")
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}
function showLoadingMessage(data){
  console.log("Loading a "+ data)
}
function hideLoadingMessage(){
  console.log("Completed")
}
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    findPokemon: findPokemon,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
document.querySelector('.search').addEventListener('change', (event) => {
  let ul = document.querySelector('ul');
  ul.innerHTML = '';
pokemonRepository.findPokemon().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
});
