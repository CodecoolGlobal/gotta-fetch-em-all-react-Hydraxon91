import './App.css';
import { useState, useEffect } from 'react';

const locationApi = "https://pokeapi.co/api/v2/location-area/";
const pokeApi = "https://pokeapi.co/api/v2/pokemon/";


function App() {
  const [locationData, setLocationData] = useState([]);
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    Promise.all(Array.from({length: 20}, (_, i) =>{
      fetch(`https://pokeapi.co/api/v2/location-area/${i+1}`)
      .then(res => res.json()
      .then((data)=>{
        console.log(data)
        setLocationData(data)
      }))
    }))
  }, [])
  

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
      {/* {
        locationData ? (
          locationData.results.map((e)=>{
            let area = fetch(e.url)
            console.log(area);
            return(
              <div>
                <h1>City</h1>
                <h2>{e.name}</h2>
                <h1>url</h1>
                <h2>{area[0]}</h2>
              </div>
            )
          })
        ) : <h2>Loading data</h2>
      } */}
    </div>
  );
}

export default App;
