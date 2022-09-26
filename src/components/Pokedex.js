import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import ReactPaginate from "react-paginate";
import logo from "../img/Pokemon-Logo.png";
import { changeUser } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";

const PER_PAGE = 16;

const Pokedex = () => {
  const user = useSelector((state) => state.user);

  const [pokemons, setPokemons] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const [pokeTypes, setPokeTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  /* Pagination */
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const pokemonPaginated = pokemons?.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(pokemons?.length / PER_PAGE);

  /* Pagination */

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154/")
      .then((res) => setPokemons(res.data.results));

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setPokeTypes(res.data.results));
  }, []);

  console.log(pokeTypes);
  const navigate = useNavigate();

  const search = () => {
    navigate(`/pokedex/${pokeSearch}`);
  };

  const filterPokemons = (e) => {
    axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
  };

  /* console.log(pokemons); */

  return (
    <div className="main-container">
      <div className="exit">
        <button onClick={() => dispatch(changeUser(""))}>
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
      <img src={logo} alt="pokemon logo" />
      <h2>
        Welcome {user}, here you can find the info of your favorite pokemons
      </h2>{" "}
      <br />
      <div className="search-box">
        <select onChange={filterPokemons}>
          <option value="all">All Pokemons</option>
          {pokeTypes.map((poketype) => (
            <option value={poketype.url} key={poketype.name}>
              {poketype.name}
            </option>
          ))}
        </select>
        <div className="input-search">
          <input
            type="text"
            value={pokeSearch}
            onChange={(e) => setPokeSearch(e.target.value)}
          />
          <button onClick={search}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div className="pokemon-container">
        {pokemonPaginated?.map((pokemon) => (
          <PokemonCard
            key={pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url}
            pokemonUrl={
              pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url
            }
          />
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<i className="fa-solid fa-arrow-left-long"></i>}
          nextLabel={<i className="fa-solid fa-arrow-right-long"></i>}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          pageClassName={"page__count"}
        />
      </div>
    </div>
  );
};

export default Pokedex;
