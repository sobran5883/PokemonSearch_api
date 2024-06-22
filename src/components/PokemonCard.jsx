import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="transform hover:scale-105 hover:bg-pink-100 transition-transform duration-300 ease-in-out border rounded-lg p-2 text-center shadow-lg m-2 w-48 bg-white">
      <img className="w-24 h-24 mx-auto" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3 className="text-xl font-bold my-2">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    </div>
  );
};

export default PokemonCard;
