import React, {useState} from 'react';

const api = {
  base: "https://pokeapi.co/api/v2/pokemon/"
}

function App() {
  const [query, setQuery] = useState('');

  const search = evt => {
    if(evt.key === "Enter") {
      fetch (`${api.base}${query}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        console.log(result);
      })
    }
  }

  return (
    <div className="wrapper">
      <div className="pokedex-search-box">
        <input type="text" 
        className="pokedex-search-bar" 
        placeholder="Search for a Pokémon..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        ></input>
      </div>
      <div className="pokedex">
      </div>
    </div>
  );
}

export default App;
