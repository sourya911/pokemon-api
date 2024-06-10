import React from 'react';

function PokemCard({ pokemon }) {
  return (
    <div className="p-4 bg-yellow-500 text-black rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center capitalize mb-2">{pokemon.name}</h2>
      <img className="mx-auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
      <span className="absolute top-2 left-2 text-md px-2 py-1 transform skew-x-6 rounded-md font-bold text-black bg-blue-600">{pokemon.id}</span>
    </div>
  );
}

export default PokemCard;
