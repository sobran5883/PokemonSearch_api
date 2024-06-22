import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import bg1 from '../assets/home/bg1.png';
import bg2 from '../assets/home/bg2.png';

const Home = ({ searchQuery }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const promises = response.data.results.map(async pokemon => {
          const pokemonRecord = await axios.get(pokemon.url);
          return pokemonRecord.data;
        });
        const results = await Promise.all(promises);
        setPokemonData(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

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

  return (
    <div className='w-full bg-[#211E32] min-h-[100vh] h-fit flex flex-col items-center'>
      <div className='w-full relative opacity-30'>
        <img className='absolute right-0 top-0' src={bg1} alt="" />
      </div>
      <div className="w-10/12 md:mt-16 flex items-center flex-col text-center relative z-10">
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
      <div className='w-full relative opacity-30'>
        <img className='absolute left-0 bottom-0' src={bg2} alt="" />
      </div>
    </div>
  );
};

export default Home;
