import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemCard from './PokemCard';
import Filter from './Filter';

function PokemList() {
  const [pokemon, setPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [pokemonLimit, setPokemonLimit] = useState(10);
  const [inputLimit, setInputLimit] = useState(10);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}`);
      const pokemonData = await Promise.all(
        response.data.results.map(async (p) => {
          const pokeDetails = await axios.get(p.url);
          return pokeDetails.data;
        })
      );
      setPokemon(pokemonData);
    };

    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    };

    fetchPokemon();
    fetchTypes();
  }, [pokemonLimit]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputLimit(event.target.value);
  };

  const handleSearchClick = () => {
    setPokemonLimit(inputLimit);
  };

  const filteredPokemon = selectedType
    ? pokemon.filter(p => p.types && p.types.some(t => t.type.name === selectedType))
    : pokemon;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-4">
          <label className="block text-lg">Number of Pokémon:</label>
          <input
            type="number"
            value={inputLimit}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            onClick={handleSearchClick}
            className="ml-2 p-2 bg-blue-600 text-white rounded"
          >
            Search
          </button>
        </div>
        <Filter types={types} onTypeChange={handleTypeChange} isDarkMode={false} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((poke) => (
          <PokemCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
}

export default PokemList;
