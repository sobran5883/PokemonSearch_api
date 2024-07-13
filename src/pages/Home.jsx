import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import bg1 from '../assets/home/bg1.png';
import bg2 from '../assets/home/bg2.png';

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const promises = response.data.results.map(async pokemon => {
          const pokemonRecord = await axios.get(pokemon.url);
          return pokemonRecord.data;
        });
        const results = await Promise.all(promises);
        setPokemonData(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the Pokémon data:', error);
        setError('Error fetching the Pokémon data');
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemon = pokemonData.filter(pokemon => {
    const query = searchQuery.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.types.some(typeInfo => typeInfo.type.name.toLowerCase().includes(query)) ||
      pokemon.height.toString().includes(query) ||
      pokemon.weight.toString().includes(query)
    );
  });

  if (loading) {
    return <div className="text-center text-xl mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl mt-20 text-red-600">{error}</div>;
  }

  return (
    <div className='w-full bg-black/80 min-h-[100vh] h-fit flex flex-col items-center'>
      <header className="md:w-10/12 w-11/12 justify-between mt-4 md:mt-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-lg md:text-4xl">Pok<span className="text-red-400">emon</span></h1>
          </div>
          <div className="flex md:justify-end">
            <input
              className='px-1 md:px-2 py-1 md:py-2 text-sm md:rounded-md outline-none bg-transparent text-white border md:border-2 border-red-400'
              type="text"
              placeholder='Search here...'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>
      <div className="w-10/12 mt-4 md:mt-8 flex items-center flex-col text-center relative z-10">
        <div className="w-full">
          <div className="flex flex-wrap justify-center">
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))
            ) : (
              <div className="text-white text-2xl mt-20">No results found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
