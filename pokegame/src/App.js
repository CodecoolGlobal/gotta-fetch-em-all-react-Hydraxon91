import './App.css';
import { useState, useEffect } from 'react';
import BattleMenu from './components/battle';
import MainPage from './components/main';
import bgs from './components/backgrounds';

const locationApi = "https://pokeapi.co/api/v2/location/";
const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

const starterPokemonArr = [
  `bulbasaur`,
  `charizard`,
  `poliwhirl`
]

function App() {
  //const [locationData, setLocationData] = useState([]);
  const [locationAreaData, setLocationAreaData] = useState([]);
  const [inBattle, setInBattle] = useState(false);
  const [usersPokemonArr, setUsersPokemonArr] = useState(starterPokemonArr)
  const [userPokemon, setUserPokemon] = useState(usersPokemonArr[0]);
  const [userPokemonData, setUserPokemonData] = useState();
  const [enemyPokemon, setEnemyPokemon] = useState();
  const [enemyPokemonData, setEnemyPokemonData] = useState();

  // const randomBG = bgs[Math.floor(Math.random() * 11)];
  //Changes the background whenever you leave/enter an area
  const [randomBG, setRandomBG] = useState(bgs[Math.floor(Math.random() * 11)]);
  useEffect(()=>{
    setRandomBG(bgs[Math.floor(Math.random() * 11)])
  },[inBattle])
  
  //Changes userPokemonData whenever userPokemon changes
  useEffect(()=>{
    console.log("Useeffect1 ran");
    userPokemon !== undefined || userPokemon !== userPokemonData.name?
      fetch(`${pokeApi}${userPokemon}`).then(res => res.json().then((data)=>{
        console.log("Useeffect ran");
        setUserPokemonData(data)
      })) : console.log("User pokemon is undefined");
  },[userPokemon])


  //console.log("User pokemon ",userPokemon);
  //console.log("User pokemon data: ", userPokemonData);
  //Fetches the first 20 locations
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

  
    //console.log("ENEMY ", enemyPokemon);

    //Fetches the enemypokemondata whenever the enemypokemon changes
    useEffect(()=> {
        if(enemyPokemon != undefined){
        fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPokemon}`)
        .then(res => res.json()
        .then(data => {
            setEnemyPokemonData(data)
        }))
    }
    }, [enemyPokemon])

    //console.log(" enemy pokemon ", enemyPokemonData);

  return (
    <div className="App">
      {
        locationAreaData ? 
          !inBattle ?
            <MainPage 
            locationAreaData={locationAreaData} setBattleState = {setInBattle} setEnemyPokemon={setEnemyPokemon}></MainPage>
          :
            <BattleMenu setBattleState = {setInBattle} enemyPokemonData={enemyPokemonData} 
            userPokemonData={userPokemonData} setUserPokemonData={setUserPokemonData} 
            usersPokemonArr={usersPokemonArr} setEnemyPokemon={setEnemyPokemon} setUsersPokemonArr={setUsersPokemonArr} 
            randomBG={randomBG} setUserPokemon={setUserPokemon} userPokemon={userPokemon}></BattleMenu>
        : <h2>Loading data</h2>
      }
    </div>
  );
}

export default App;
