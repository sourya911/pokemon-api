import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemCard from './PokemCard';

function PokemList() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=15');
      const pokemonData = await Promise.all(
        response.data.results.map(async (p) => {
          const pokeDetails = await axios.get(p.url);
          return pokeDetails.data;
        })
      );
      setPokemon(pokemonData);
    };

    fetchPokemon();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map((poke) => (
          <PokemCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
}

export default PokemList;
