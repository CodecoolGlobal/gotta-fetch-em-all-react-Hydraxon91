import './App.css';
import { useState, useEffect } from 'react';

const locationApi = "https://pokeapi.co/api/v2/location-area/";
const pokeApi = "https://pokeapi.co/api/v2/pokemon/";


function App() {
  const [locationData, setLocationData] = useState([]);
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    Promise.all(Array.from({length: 20}, (_, i) =>{
      console.log(i);
      fetch(`https://pokeapi.co/api/v2/location-area/${i+1}`)
      .then(res => res.json()
      .then((data)=>{
        //console.log(data)
        
        setLocationData(oldData => [...oldData , data])
      }))
    }))
  }, [])
  console.log(locationData);
  // useEffect(() => {
  //   fetch(locationApi).then(response => response.json()).then(data=>{
  //     //console.log(data)
  //     setLocationData(data);
  //   })
  // }, [])

  // useEffect(() => {
  //   fetch(pokeApi).then(response => response.json()).then(data=>{
  //     //console.log(data)
  //     setPokemonData(data);
  //   })
  // }, [])
  
  return (
    <div className="App">
      {
        locationData ? (
          locationData.map((e, index)=>{
            return(
              <div key = {index}>
                <h1>Area</h1>
                <h2>{e.name}</h2>
                <h1>Pokemon in Area</h1>
                <h2>{e.pokemon_encounters[Math.floor(Math.random()*e.pokemon_encounters.length)].pokemon.name}</h2>
              </div>
           )
          })
        ) : <h2>Loading data</h2>
      }
    </div>
  );
}

export default App;
