import './App.css';
import { useState, useEffect } from 'react';
import BattleMenu from './components/battle';
import MainPage from './components/main';

const locationApi = "https://pokeapi.co/api/v2/location/";
const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

const usersPokemonArr = [
  `${pokeApi}bulbasaur`,
  `${pokeApi}charizard`,
  `${pokeApi}poliwhirl`
]

function App() {
  //const [locationData, setLocationData] = useState([]);
  const [locationAreaData, setLocationAreaData] = useState([]);
  const [pokemonData, setPokemonData] = useState();
  const [inBattle, setInBattle] = useState(false);
  const [userPokemon, setUserPokemon] = useState([]);

  useEffect(()=>{
    Promise.all(usersPokemonArr.map((e)=>{
      fetch(e).then(res => res.json().then((data)=>{
        //console.log(data);
        setUserPokemon(oldData => [...oldData , data])
      }))
    }))
  },[])
  console.log(userPokemon);
  useEffect(() => {
    Promise.all(Array.from({length: 20}, (_, i) =>{
      //console.log(i);
      fetch(`${locationApi}${i+1}`)
      .then(res => res.json()
      .then((data)=>{
        //console.log(data.areas[0].url)
        //setLocationData(oldData => [...oldData , data])
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
  //console.log(locationAreaData);


  return (
    <div className="App">
      {
        locationAreaData ? 
          !inBattle ?
            <MainPage 
            locationAreaData={locationAreaData} setBattleState = {setInBattle} setPokemonData = {setPokemonData}></MainPage>
          :
            <BattleMenu setBattleState = {setInBattle}></BattleMenu>
        : <h2>Loading data</h2>
      }
    </div>
  );
}

export default App;
