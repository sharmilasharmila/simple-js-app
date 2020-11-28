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
  }
];
for(let i=0; i<pokemonList.length; i++)
  {
       document.write(pokemonList[i].name + ' (height :' + pokemonList[i].height + ')');

       //checks if pokemon height is greater than 6.5
       if(pokemonList[i].height > 6.5)
         document.write('-' +" Wow, that\'s big! " + '<br>');
       else
         document.write('<br>');
  }
