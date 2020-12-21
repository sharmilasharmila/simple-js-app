let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
  sh_button.classList.add('btn');
  sh_button.classList.add('btn-info');

  sh_listItem.classList.add('group-list-item');
  sh_button.setAttribute("data-toggle", "modal"); //this works with bootstrap to open the modal when the pokemon name button is clicked
  sh_button.setAttribute("data-target", "#pokemonModal");
  sh_listItem.appendChild(sh_button);
  sh_ul.appendChild(sh_listItem);
  //
  sh_button.addEventListener('click', function () {
  showDetails(pokemon);
});
  }

  function showDetails(pokemon){
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json){
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
	  //showLoadingMessage();
  }



  function loadDetails(item) {
	  //showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
	//	hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
//		hideLoadingMessage();
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem:addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };


}());


pokemonRepository.loadList().then(function() {
//	hideLoadingMessage();
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//showModal function added
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty(); //empties anything that was previously stored in these variables
    modalBody.empty();

    //add the new content into the new "modal" div (Name, height, and image content)
    //Name element
    let nameElement = $("<h1>" + pokemon.name + "</h1>");

    //Height content
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");

    //Image content
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imageUrl);

    //appends the children to their parent containers
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
  }
