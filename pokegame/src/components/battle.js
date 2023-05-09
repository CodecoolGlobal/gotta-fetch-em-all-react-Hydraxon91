import React from "react";
import styles from './styles/battlestyle.module.css'

function BattleMenu(props){

    function GoBack(){
        props.setBattleState(false)
    }
    return (
        <div className={styles.background}>
    
            <button onClick={() => GoBack()}>Go Back</button>
            <h1>This is the battle menu</h1>
            {
                props.enemyPokemonData ? (
            <div>
                <h2 className={styles.enemyName}>{props.enemyPokemonData.name}</h2>
                <img src={props.enemyPokemonData.sprites.front_default} text={props.enemyPokemonData.name} className={styles.enemy}></img>
                <h2 className={styles.playerName}>{props.userPokemonData.name}</h2>
                <img src={props.userPokemonData.sprites.back_default} text={props.userPokemonData.name} className={styles.player}></img>
            </div>) : (
                <h2>Loading players</h2>
            )
            }
        </div>
    
    )
}

export default BattleMenu;