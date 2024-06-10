import React from 'react';

function PokemModal({ pokemon, onClose, isDarkMode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-lg w-full max-w-2xl mx-auto transform transition-all scale-95`}>
        <button className="text-yellow-500 text-1xl font-bold float-right" onClick={onClose}>Close <span className='p-1 text-red-600'>X</span></button>
        <h1 className={`text-3xl font-bold text-center capitalize mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-600'}`}>{pokemon.name}</h1>
        <div className="flex flex-col md:flex-row items-center">
          <img className="mb-4 md:mb-0 md:mr-4 w-48 h-48" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} />
          <div className="text-center md:text-left">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Abilities</h2>
              <div className="flex flex-wrap justify-center md:justify-start space-x-2 space-y-2">
                {pokemon.abilities.map((pokem) => (
                  <div key={pokem.ability.name} className="bg-yellow-500 text-black px-2 py-1 rounded-lg">
                    {pokem.ability.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold ">Base Stats</h2>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="my-1">
                  {stat.stat.name}: {stat.base_stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemModal;
