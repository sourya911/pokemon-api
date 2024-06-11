import React from 'react';

function PokemCard({ pokemon, onPokemonClick, isDarkMode }) {
  return (
    <div 
      className={`relative p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-yellow-500 text-black'} rounded-lg shadow-lg transform transition-all hover:scale-105 cursor-pointer`} 
      onClick={() => onPokemonClick(pokemon)}
    >
         {/* call onPokemonClick when user clicked the pokemon data */}
      <h2 className="text-xl font-bold text-center capitalize mb-2">{pokemon.name}</h2>
      <img className="mx-auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
      <span className={`absolute top-2 left-2 text-md px-2 py-1 transform skew-x-6 rounded-md font-bold ${isDarkMode ? 'text-gray-100 bg-yellow-500' : 'text-black bg-blue-600'}`}>{pokemon.id}</span>
    </div>
  );
}

export default PokemCard;
