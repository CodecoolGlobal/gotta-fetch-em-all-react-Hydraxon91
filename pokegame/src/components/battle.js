import React from "react";

function BattleMenu(props){

    function GoBack(){
        props.setBattleState(false)
    }
    return (
        <div>
    
            <button onClick={() => GoBack()}>Go Back</button>
            <h1>This is the battle menu</h1>
            {
                props.enemyPokemonData ? (
            <div>
                <h2>{props.enemyPokemonData.name}</h2>
                <img src={props.enemyPokemonData.sprites.front_default} text={props.enemyPokemonData.name}></img>
                <h2>{props.userPokemonData.name}</h2>
                <img src={props.userPokemonData.sprites.back_default} text={props.userPokemonData.name}></img>
            </div>) : (
                <h2>Loading players</h2>
            )
            }
        </div>
    
    )
}

export default BattleMenu;