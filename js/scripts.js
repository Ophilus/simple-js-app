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

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();
pokemonRepository.add({
  name: 'Pikachu',
  height: 0.4,
  types: ['electric']
});
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + ' (height: ' + pokemon.height + ' m.)');
  if (pokemon.height >= 0.7) {
    document.write(` - Wow, that’s big!`)
  }
  document.write(`<br/>`);
});
