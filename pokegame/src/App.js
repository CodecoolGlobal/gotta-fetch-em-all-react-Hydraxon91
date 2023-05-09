import './App.css';
import { useState, useEffect } from 'react';

const locationApi = "https://pokeapi.co/api/v2/location/";
const locationAreaApi = "https://pokeapi.co/api/v2/location-area/";
const pokeApi = "https://pokeapi.co/api/v2/pokemon/";


function App() {
  const [locationData, setLocationData] = useState([]);
  const [locationAreaData, setLocationAreaData] = useState([]);
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    Promise.all(Array.from({length: 20}, (_, i) =>{
      console.log(i);
      fetch(`${locationApi}${i+1}`)
      .then(res => res.json()
      .then((data)=>{
        //console.log(data.areas[0].url)
        setLocationData(oldData => [...oldData , data])
        let areaObject = {
          location: data.name,
          id: data.id,
          area: undefined
        }
        data.areas.length !==0 ?
          fetch(data.areas[0].url).then(res => res.json()
          .then((areaData)=>{
            areaObject.area = areaData;
            setLocationAreaData(oldData => [...oldData , areaObject])
          })) : (
            setLocationAreaData(oldData => [...oldData , areaObject])
            )
      }))
    }))
  }, [])
  locationAreaData.sort((a,b) => a.id-b.id)
  //console.log(locationData);
  console.log(locationAreaData);
  
  return (
    <div className="App">
      {
        locationAreaData ? (
          locationAreaData.map((e, index)=>{
            let pokemon;
            e.area !=undefined ?(
             pokemon = e.area.pokemon_encounters[Math.floor(Math.random()*e.area.pokemon_encounters.length)].pokemon.name
             ) : pokemon = "NO POKEMON HERE"
            return(
              <div key = {index}>
                <h1>Area</h1>
                <h2>{e.location}</h2>
                <h1>Pokemon in Area</h1>
                <h2>{pokemon}</h2>
              </div>
           )
          })
        ) : <h2>Loading data</h2>
      }
    </div>
  );
}

export default App;
