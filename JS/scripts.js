let pokemonRepository = (function(){
  let pokemonList = [{
      name:'balbasour',
      height:7,
      type:['grass','poison']
      },
    {
      name:'charmendor',
      height:6,
      type:['blaze','solar-power']
      },
    {
      name:'squirtle',
      height:5,
      type:['Rain-dish','torrent']
    }];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
}())

pokemonRepository.getAll().forEach(function(item){
  document.write(item.name + '\'s height is ' + item.height + ' and its type is ' + item.type + '<br>');
});
