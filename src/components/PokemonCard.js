import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState({});
  const [color, setColor] = useState({});

  useEffect(() => {
    if (pokemon.species !== undefined) {
      axios.get(pokemon.species?.url).then((res) => setColor(res.data));
    }
  }, [pokemon]);

  console.log(pokemon);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(pokemonUrl).then((res) => setPokemon(res.data));
  }, [pokemonUrl]);

  return (
    <div>
      <div
        className="pokemon-card"
        onClick={() => navigate(`/pokedex/${pokemon.id}`)}
        style={{
          /* background: color.color?.name, */
          borderColor: color.color?.name,
          background: `linear-gradient(to left top, ${color.color?.name}, gray )`,
        }}
      >
        <div className="pokemon-img">
          <img
            src={pokemon.sprites?.other.dream_world.front_default}
            alt="PokemonPicture"
          />
        </div>

        <div className="pokemon-stats">
          <h3>{pokemon.name}</h3>
          {pokemon.types?.map((type) => (
            <div hey={type.type.name}>{type.type.name},</div>
          ))}
          <div className="stats-container">
            {pokemon.stats?.map((stat) => (
              <div key={stat.stat.name} className="specific-stats">
                <span>{stat.stat.name}</span>: <br /> {stat.base_stat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
