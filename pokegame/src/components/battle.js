import React, { useState, useEffect } from "react";
import styles from "./styles/battlestyle.module.css";
import fight from "../fight";


function BattleMenu(props) {
  //console.log(fight);

  function GoBack() {
    props.setBattleState(false);
    props.setEnemyPokemon();
  }
//Attacker = player, defender = enemy
  const [attackerHP, setAttackerHP] = useState(
    props.userPokemonData?.stats?.[0]?.base_stat || 0
  );
  const [defenderHP, setDefenderHP] = useState(
    props.enemyPokemonData?.stats?.[0]?.base_stat || 0
  );

  useEffect(() => {
    if (props.userPokemonData) {
      setAttackerHP(props.userPokemonData.stats[0].base_stat);
    }
    if (props.enemyPokemonData) {
      setDefenderHP(props.enemyPokemonData.stats[0].base_stat);
    }
  }, [props.userPokemonData, props.enemyPokemonData]);

  return (
    <div className={styles.background}>
      <button onClick={() => GoBack()}>Go Back</button>
      {/* <h1>This is the battle menu</h1> */}
      {props.userPokemonData && props.enemyPokemonData ? (
        <div>
          <h2 className={styles.enemyName}>{props.enemyPokemonData.name}</h2>
          <img
            src={props.enemyPokemonData.sprites.front_default}
            text={props.enemyPokemonData.name}
            className={styles.enemy}
          ></img>
          <h2 className={styles.playerName}>{props.userPokemonData.name}</h2>
          <img
            src={props.userPokemonData.sprites.back_default}
            text={props.userPokemonData.name}
            className={styles.player}
          ></img>

          <>
            <h2>
              {props.userPokemonData.name}'s HP: {attackerHP}
            </h2>
            <h2>
              {props.enemyPokemonData.name}'s HP: {defenderHP}
            </h2>
            <button
              onClick={() => {
                const updatedAttacker = {
                  ...props.userPokemonData,
                  stats: [
                    {
                      ...props.userPokemonData.stats[0],
                      base_stat: attackerHP,
                    },
                    ...props.userPokemonData.stats.slice(1),
                  ],
                };
                const updatedDefender = {
                  ...props.enemyPokemonData,
                  stats: [
                    {
                      ...props.enemyPokemonData.stats[0],
                      base_stat: defenderHP,
                    },
                    ...props.enemyPokemonData.stats.slice(1),
                  ],
                };
                const result = fight(updatedAttacker, updatedDefender);
                setAttackerHP(result.hpAttacker);
                setDefenderHP(result.hpDefender);
              }}
            >
              Fight!
            </button>
          </>
        </div>
      ) : (
        <h2>Loading players, if there in no enemy, go back</h2>
      )}
    </div>
  );
}

export default BattleMenu;
