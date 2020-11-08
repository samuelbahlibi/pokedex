import React, {useState} from 'react';
import pokeball from './assets/pokeball-tilt.png';

const api = {
  base: "https://pokeapi.co/api/v2/pokemon/",
  description: "https://pokeapi.co/api/v2/pokemon-species/"
}

function App() {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState({});
  const [secondQuery, setSecondQuery] = useState('');
  const [pokedesc, setPokedesc] = useState({});

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

      fetch (`${api.description}${query}`)
      .then(res => res.json())
      .then(result => {
        setPokedesc(result);
        setSecondQuery('');
        console.log(result);
      })
    }
  }

  const weightConverter = weight => {
    return "WT " + Math.floor(weight / 10) + ".0 kg.";
  }

  const heightConverter = height => {
    return "HT  " + (height / 10) + " m."
  }

  const formatNumber = idNumber => {
    if(idNumber >= 1 && idNumber <= 9)
      return " 00" + idNumber + " "
    else if (idNumber >= 10 && idNumber <= 99)
      return " 0" + idNumber + " "
    else 
      return " " + idNumber + " "
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
          onChange={e => {setQuery(e.target.value); setSecondQuery(e.target.value);}}
          value={query}
          value={secondQuery}
          onKeyPress={search}
          ></input>
        </div>
          <div>
            {pokemon.sprites ? (
            <div className="pokedex">
              <div className="pokedex-left">
                <div className="pokedex-name-plate">
                  <img src={pokeball} alt="pokeball"></img>
                  {formatNumber(pokemon.id)}
                  {pokemon.name}      
                </div>
              </div>
              <div>
                <div className="pokedex-pokemon-image">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
                </div>
                {types(pokemon.types)}
                <div className="pokedex-pokemon-ht-wt">
                  <div className="pokedex-pokemon-ht-wt-right-container">
                  {heightConverter(pokemon.height)}
                  </div>
                  {weightConverter(pokemon.weight)}
                </div>
              </div>
            </div>
            ) : ('')}
          </div>
        </main>
    </div>
  );
}

export default App;
