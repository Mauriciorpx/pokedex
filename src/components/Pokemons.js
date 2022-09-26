import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const Pokemons = () => {
  const user = useSelector((state) => state.user);
  const [pokemon, setPokemon] = useState({});
  const [color, setColor] = useState({});

  useEffect(() => {
    if (pokemon.species !== undefined) {
      axios.get(pokemon.species?.url).then((res) => setColor(res.data));
    }
  }, [pokemon]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => setPokemon(res.data));
  }, [id]);

  console.log(pokemon);

  //On the bracers is necessary put the parameter of the specific route f.e id, name  ..... in this case is "id"

  return (
    <div
      className="pokemon__detail"
      style={{
        /* background: color.color?.name, */
        borderColor: color.color?.name,
        background: `linear-gradient(to left top, ${color.color?.name}, white )`,
      }}
    >
      <div className="container-detail">
        <div className="main-info">
          <div className="pokemon__detail--logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
              alt="pokemon logo"
            />
          </div>
          <h1>
            {pokemon.name} of {user}{" "}
          </h1>

          <div className="basic-info">
            <div className="left">
              <h3>
                {pokemon.weight} <br /> <span>Weight</span>
              </h3>
            </div>
            <div className="center">
              <img
                src={pokemon.sprites?.other.dream_world.front_default}
                alt="pokemon"
              />
              <h2>{pokemon.name}</h2>
              <h4># {pokemon.id}</h4>
            </div>
            <div className="right">
              <h3>
                {pokemon.height} <br /> <span>Height</span>{" "}
              </h3>
            </div>
          </div>
          <div className="other-info">
            <div className="type">
              <h3>Type</h3>
              <div className="type__detail">
                {pokemon.types?.map((type) => (
                  <div
                    className="type__detail__spec"
                    key={type.type.name}
                    style={{
                      background: color.color?.name,
                    }}
                  >
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="abilities">
              <h3>Abilities</h3>
              <div className="abilities__detail">
                {pokemon.abilities?.map((abilitie) => (
                  <div key={abilitie.ability.name}>{abilitie.ability.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="stats-base">
            <h3>Base Stats</h3>

            <div>
              {pokemon.stats?.map((stat) => (
                <div className="stats-bars">
                  <div className="stat-name">{stat.stat.name}:</div>
                  <div className="progress-container">
                    <ProgressBar
                      className="progress-bar-animated"
                      now={stat.base_stat}
                      label={`${stat.base_stat}/100`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="movements">
        <h3>Movements</h3>
        <div className="movements-container">
          {pokemon.moves?.map((move) => (
            <div className="movements__detail">
              <div key={move.move.name}>{move.move.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemons;
