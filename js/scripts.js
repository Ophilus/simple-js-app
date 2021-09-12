let pokemonRepository = (function() {
  let pokemonList = [{
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      types: ['fire']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      types: ['water']
    }
  ];
  let pokemonKeyList = Object.keys(pokemonList[0]).sort();

  function add(pokemon) {
    if (typeof pokemon == 'object') {
      if (JSON.stringify(Object.keys(pokemon).sort()) == JSON.stringify(pokemonKeyList)) {
        pokemonList.push(pokemon);
      }
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
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    findPokemon: findPokemon
  };
})();
pokemonRepository.add({
  name: 'Pikachu',
  height: 0.4,
  types: ['electric']
});
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
document.querySelector('.search').addEventListener('change', (event) => {
  let ul = document.querySelector('ul');
  ul.innerHTML = '';
pokemonRepository.findPokemon().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
});
/////////////////////////////////////////////////////////////////////////
