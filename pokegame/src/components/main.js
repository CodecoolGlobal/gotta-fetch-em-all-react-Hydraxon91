import React from "react";

function MainPage(props){
    let locationAreaData = props.locationAreaData;
    function EnterBattle(){
        console.log(`Entered battle in ${props.location} against ${props.pokemon}`);
        props.setBattleState(true)
    }
    //console.log(locationAreaData)
    return (
        
                locationAreaData.map((e, index)=>{
                  let pokemon;
                  e.area !==undefined ?(
                   pokemon = e.area.pokemon_encounters[Math.floor(Math.random()*e.area.pokemon_encounters.length)].pokemon.name
                   ) : pokemon = "NO POKEMON HERE"
                  return(
                      <div key = {index}>
                          <h1>Area</h1>
                          <h2>{e.location}</h2>
                          <h1>Pokemon in Area</h1>
                          <h2>{pokemon}</h2>
                          <button onClick={()=>EnterBattle()}>Enter Area</button>
                      </div>
                 )
                })  
        
        
        // <h2>test</h2>
    )
}

export default MainPage;