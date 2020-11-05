import React, {useState} from 'react';

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
    }
  }

  const weightConverter = weight => {
    return Math.floor(weight / 10) + ".0 kg.";
  }

  const heightConverter = height => {
    return (height / 10) + " m."
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
            <div className="pokedex">
              <div className="pokedex-left">
                {pokemon.name}
                <br></br>
                {pokemon.id}
              </div>
              <div>
              {/*<img src={!pokemon.sprites ? pokemon.sprites.front_default : ''}></img>
              <br></br>*/}
              {pokemon.types[0].type.name}
              <br></br>
              {pokemon.types[1].type.name}
              <br></br>
              {weightConverter(pokemon.weight)}
              <br></br>
              {heightConverter(pokemon.height)}
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}

export default App;
