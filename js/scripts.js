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
    return filteredData;
  }
  function getAll() {
    return pokemonList;
  }

 function addListItem(pokemon) {
    let ul = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('listButton');
    button.addEventListener('click', () => {
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
          name: item.name.toUpperCase(),
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
      item.imageFrontUrl = details.sprites.front_default;
      item.imageBackUrl = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    /*let type=[];
     pokemon.types.forEach(function(slot){
    type.push(slot.type.name);
  });*/
    showModal(pokemon.name, 'Height: '+pokemon.height,pokemon.imageFrontUrl,pokemon.imageBackUrl,pokemon.types);


  });
}
function showLoadingMessage(data){
  console.log("Loading a "+ data)
}
function hideLoadingMessage(){
  console.log("Completed")
}
function showModal(title, text , link1, link2, types) {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let heightElement = document.createElement('p');
  heightElement.innerText = text;

  let imgElement1 = document.createElement('img');
  imgElement1.src = link1;
  let imgElement2 = document.createElement('img');
  imgElement2.src = link2;

  let typesElement = document.createElement('p');
  typesElement.innerText = 'Types:' ;
  types.forEach(function(slot){
    let span = document.createElement('span');
    span.classList.add('type');
    span.innerText = slot.type.name;
    span.classList.add(slot.type.name);
    typesElement.appendChild(span);
});
/*  + types.forEach(function(slot){
    console.log(slot.type.name);
 return slot.type.name;

});*/

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(heightElement);
  modal.appendChild(imgElement1);
  modal.appendChild(imgElement2);
  modal.appendChild(typesElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}
function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    findPokemon: findPokemon,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
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
/////////
