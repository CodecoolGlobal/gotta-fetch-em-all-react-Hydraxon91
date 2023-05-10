import React from "react";
import Button from "react-bootstrap/Button";

function MainPage(props) {
  let locationAreaData = props.locationAreaData;

  function EnterBattle(location, pokemon) {
    console.log(`Entered battle in ${location} against ${pokemon}`);

    props.setEnemyPokemon(pokemon);
    props.setBattleState(true);
  }

  //console.log(locationAreaData)
  return locationAreaData.map((e, index) => {
    let pokemon;
    e.area !== undefined
      ? (pokemon =
          e.area.pokemon_encounters[
            Math.floor(Math.random() * e.area.pokemon_encounters.length)
          ].pokemon.name)
      : (pokemon = "NO POKEMON HERE");
    return (
        
                locationAreaData.map((e, index)=>{
                    let pokemon;
                    let pokemonArray =[];
                    if (e.area !== undefined) {
                        pokemon = e.area.pokemon_encounters[Math.floor(Math.random()*e.area.pokemon_encounters.length)].pokemon.name
                        e.area.pokemon_encounters.map((e)=>pokemonArray.push(e.pokemon.name))
                        console.log(pokemonArray);
                    }
                    // e.area !==undefined ?(
                    //     pokemon = e.area.pokemon_encounters[Math.floor(Math.random()*e.area.pokemon_encounters.length)].pokemon.name
                    //     // e.area.pokemon_encounters.map((e)=>pokemonArray.push(e.pokemon.name))
                  
                    // ) : pokemon = "NO POKEMON HERE"
                  return(
                      <div key = {index}>
                          <h1>Area</h1>
                          <h2>{e.location}</h2>
                          <h1>Pokemons in Area</h1>
                          {pokemonArray.map((e)=>(
                            <h2>{e}</h2>
                          ))}
                          {/* <h2>{pokemon}</h2> */}
                          <button onClick={()=>EnterBattle(e.location, pokemon)}>Enter Area</button>
                      </div>
                 )
                })  
        
        
        // <h2>test</h2>
    )
}

export default MainPage;
