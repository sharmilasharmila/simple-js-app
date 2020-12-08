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
  
  function addListItem(pokemon){
	  var sh_ul=document.querySelector('.pokemon-list');
  let sh_listItem = document.createElement('li');
  let sh_button = document.createElement('button');
  sh_button.innerText=pokemon.name;
  sh_button.classList.add('sharmila-pokemon-button');
  sh_listItem.appendChild(sh_button);
  sh_ul.appendChild(sh_listItem);
  //
  sh_button.addEventListener('click', function () {
  showDetails(pokemon);
});
  }
  function showDetails(pokemon){
	  console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
	addListItem:addListItem
  };
  
  
}())

pokemonRepository.getAll().forEach(function(item){
	pokemonRepository.addListItem(item);
});
