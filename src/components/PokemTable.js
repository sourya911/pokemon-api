import React from 'react';

function PokemTable({ pokemon, onPokemonClick, isDarkMode }) {
  return (
    <table className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Image</th>
          <th className="border px-4 py-2">Name</th>
        </tr>
      </thead>
      <tbody>
        {pokemon.map((poke) => (
          <tr key={poke.id} className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-600': 'hover:bg-gray-300'}`} onClick={() => onPokemonClick(poke)}> 
          {/* call onPokemonClick when user clicked the pokemon data */}
            <td className="border px-4 py-2">{poke.id}</td>
            <td className="border px-4 py-2"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`} alt={poke.name} /></td>
            <td className="border px-4 py-2">{poke.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PokemTable;
