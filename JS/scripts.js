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
	  showLoadingMessage();
  }



  function loadDetails(item) {
	  showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
		hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
		hideLoadingMessage();
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
	hideLoadingMessage();
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
//pokemonRepository.getAll().forEach(function(item){
//	pokemonRepository.addListItem(item);
//});
var sh_message=document.querySelector('#sh_message');
function showLoadingMessage(){
if (sh_message.style.display = "none") {
    sh_message.style.display = "block";
  }
}
function hideLoadingMessage(){
	if (sh_message.style.display = "block"){
    sh_message.style.display = "none";
  }
}

let modalContainer = document.querySelector('#modal-container');

function showModal(pokemon) {
  //console.log(pokemon);
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;

  let contentElement = document.createElement('p');
  contentElement.innerText = 'Height: ' + pokemon.height;

  let imageElement = document.createElement('img');
  imageElement.src = pokemon.imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

function hideModal() {
     modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
    });
