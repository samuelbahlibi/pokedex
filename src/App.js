import React, {useState} from 'react';
import pokeball from './assets/pokeball-tilt.png';

const api = {
  base: "https://pokeapi.co/api/v2/pokemon/"
}

function App() {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch (`${api.base}${query}`)
      .then(res => res.json())
      .then(result => {
        setPokemon(result);
        setQuery('');
        console.log(result);
      })
      .catch(error => {
        setPokemon({error: error.message})
      })
    }
  }

  const weightConverter = weight => {
    return Math.floor(weight / 10) + ".0 kg.";
  }

  const heightConverter = height => {
    return (height / 10) + " m."
  }

  const formatNumber = idNumber => {
    if(idNumber >= 1 && idNumber <= 9)
      return "00" + idNumber
    else if (idNumber >= 10 && idNumber <= 99)
      return "0" + idNumber
    else 
      return idNumber
  }

  const types = type => {
      if(type.length === 2) {
        return (
          <div className="pokedex-pokemon-type">
            <div className="pokedex-main-container">
              <div id={pokemon.types[1].type.name}>{pokemon.types[1].type.name}</div>
            </div>
            <div className="pokedex-fixer-container">
              <div id={pokemon.types[0].type.name}>{pokemon.types[0].type.name}</div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="pokedex-pokemon-type">
            <div className="pokedex-single-container">
              <div id={pokemon.types[0].type.name}>{pokemon.types[0].type.name}</div>
            </div>
          </div>
          )
      }
  }

  return (
    <div className="wrapper">
      <main>
        <div className="pokedex-search-box">
          <input 
          type="text" 
          className="pokedex-search-bar" 
          placeholder="Search for a Pokémon..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          ></input>
        </div>
          <div>
            {pokemon.sprites ? (
            <div className="pokedex">
              <img src={pokeball} alt="pokeball"></img>
              <div className="pokedex-left">
                {pokemon.name}
                <br></br>
                {formatNumber(pokemon.id)}
              </div>
              <div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
              <br></br>
              {types(pokemon.types)}
              <br></br>
              {weightConverter(pokemon.weight)}
              <br></br>
              {heightConverter(pokemon.height)}
              </div>
            </div>
            ) : ('')}
          </div>
        </main>
    </div>
  );
}

export default App;
