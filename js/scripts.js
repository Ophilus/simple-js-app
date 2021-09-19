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
    listItem.classList.add('group-list-item');
    button.innerText = pokemon.name;
    button.classList.add('listButton');
    button.classList.add('btn');
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    ul.appendChild(listItem);
    $(".btn").attr("data-toggle", "modal");
    $(".btn").attr("data-target", "#modal-container");
  }
  function loadList() {
    return fetch(apiUrl).then(function (response) {
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
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
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
    showModal(pokemon);


  });
}
function showModal(item) {
  let modalContainer = $('#modal-container');
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $("<h1>" + item.name + "</h1>");
  let imgElementFront = $('<img class="modal-img">');
  imgElementFront.attr("src",item.imageFrontUrl);
  let imgElementBack = $('<img class="modal-img">');
  imgElementBack.attr("src",item.imageBackUrl);
  let heightElement = $("<p>" + "Height : " + item.height + "</p>");

  let typesElement = $("<p>" + "Types : " + "</p>")
  item.types.forEach(function(slot){
    let span = $('<span>' + slot.type.name + '</span>');
    span.addClass('type');
    span.addClass(slot.type.name);
    typesElement.append(span);
});
modalTitle.append(nameElement);
modalBody.append(imgElementFront);
modalBody.append(imgElementBack);
modalBody.append(heightElement);
modalBody.append(typesElement);
modalContainer.addClass('is-visible');
modalContainer.on('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

}
function hideModal() {
  let modalContainer = $('#modal-container');
  modalContainer.modal('hide');
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
