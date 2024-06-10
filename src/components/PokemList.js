import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemCard from './PokemCard';
import PokemModal from './PokemModal';
import Filter from './Filter';
import { FaSun, FaMoon } from 'react-icons/fa';

function PokemList() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [pokemonLimit, setPokemonLimit] = useState(10);
  const [inputLimit, setInputLimit] = useState(10); 
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const max_poke = 1302; 

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true); 
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}`);
        const pokemonData = await Promise.all(
          response.data.results.map(async (p) => {
            const pokeDetails = await axios.get(p.url);
            return pokeDetails.data;
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error("Error fetching types data:", error);
      }
    };

    fetchPokemon();
    fetchTypes();
  }, [pokemonLimit]);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputLimit(event.target.value);
  };

  const handleSearchClick = () => {
    const limit = parseInt(inputLimit, 10);
    if (isNaN(limit) || limit <= 0) {
      setErrorMessage('Please enter a valid positive number.');
    } else if (limit > max_poke) {
      setErrorMessage(`Only ${max_poke} Pokémon are available.`);
      setInputLimit(max_poke);
      setPokemonLimit(max_poke);
    } else {
      setErrorMessage('');
      setPokemonLimit(limit);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredPokemon = selectedType
    ? pokemon.filter(p => p.types && p.types.some(t => t.type.name === selectedType))
    : pokemon;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-5xl font-bold text-center mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-600'} `}>Pokémon List</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white'} flex items-center space-x-2 hover:scale-105 transform transition-transform duration-300`}
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <label className="block text-lg">Number of Pokémon:</label>
            <input
              type="number"
              value={inputLimit}
              onChange={handleInputChange}
              className={`p-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
            />
            <button
              onClick={handleSearchClick}
              className={`ml-2 p-2 rounded ${isDarkMode ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white'}`}
            >
              Search
            </button>
          </div>
          <Filter types={types} onTypeChange={handleTypeChange} isDarkMode={isDarkMode} />
        </div>
        {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh] ">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-200"></div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-500' : 'text-blue-600'}`}>Loading Pokémon...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map((poke) => (
                <PokemCard key={poke.id} pokemon={poke} onPokemonClick={handlePokemonClick} isDarkMode={isDarkMode} />
              ))
            ) : (
              <div className="col-span-4 text-center">
                <h2 className="text-2xl font-bold">No Pokémon found with the given filter.</h2>
              </div>
            )}
          </div>
        )}
        {selectedPokemon && (
          <PokemModal pokemon={selectedPokemon} onClose={handleCloseModal} isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
}

export default PokemList;