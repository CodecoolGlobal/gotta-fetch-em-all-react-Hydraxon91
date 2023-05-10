import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import styles from "./styles/battlestyle.module.css";
import fight from "../fight";
import Pokemon from "./PokemonCard";
import HPBar from "./HPBar";

function BattleMenu(props) {
  //console.log(fight);

  function GoBack() {
    props.setBattleState(false);
    props.setEnemyPokemon();
  }
  function changePokemon(pokemon) {
    props.setUserPokemon(pokemon);
    setBattleStart(true);
    console.log("teszt");
  }
  //Attacker = player, defender = enemy
  const [attackerHP, setAttackerHP] = useState(
    props.userPokemonData?.stats?.[0]?.base_stat || 0
  );
  const [defenderHP, setDefenderHP] = useState(
    props.enemyPokemonData?.stats?.[0]?.base_stat || 0
  );
  const [battleStart, setBattleStart] = useState(false);

  useEffect(() => {
    if (props.userPokemonData) {
      setAttackerHP(props.userPokemonData.stats[0].base_stat);
    }
  }, [props.userPokemonData]);
  useEffect(() => {
    if (props.enemyPokemonData) {
      setDefenderHP(props.enemyPokemonData.stats[0].base_stat);
    }
  }, [props.enemyPokemonData]);

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${props.randomBG})` }}
    >
      <HPBar
        className="mt-5"
        variant="danger"
        HP={Math.round(
          (attackerHP * 100) / props.userPokemonData.stats[0].base_stat
        )}
        label={props.userPokemonData?.name}
      ></HPBar>
      <HPBar
        className="mt-5"
        variant="success"
        HP={Math.round(
          (defenderHP * 100) / props.enemyPokemonData.stats[0].base_stat
        )}
        label={props.enemyPokemonData?.name}
      ></HPBar>

      <Button
        className="mt-5"
        variant="warning"
        onClick={() => GoBack()}
        style={{ zIndex: "-1" }}
      >
        Go Back
      </Button>
      {/* <h1>This is the battle menu</h1> */}
      {props.enemyPokemonData ? (
        <div id="battleParent" style={{ height: "100%" }}>
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
              <h2 className="mt-5">
                {props.userPokemonData.name}'s HP: {attackerHP}
              </h2>
              <h2>
                {props.enemyPokemonData.name}'s HP: {defenderHP}
              </h2>
            </>
          </div>
          <>
            <div
              className="row mt-5"
              style={{ position: "relative", top: "35%" }}
            >
              {!battleStart ? (
                props.usersPokemonArrData.map((pokemon, index) => (
                  <div className="col-md-4 mt-5" key={index}>
                    <Pokemon
                      name={pokemon.name}
                      hp={pokemon.stats[0].base_stat}
                      attack={pokemon.stats[1].base_stat}
                      defense={pokemon.stats[2].base_stat}
                      sprite={pokemon.sprites.front_default}
                      // onClick={() => {
                      //   props.setUserPokemon(pokemon);
                      //   console.log("teszt");
                      // }}
                      handleClick={changePokemon}
                    ></Pokemon>
                  </div>
                ))
              ) : (
                <div>
                  <Button
                    className="mt-5"
                    style={{ width: "25%", margin: "auto" }}
                    variant="danger"
                    // style={{zIndex: '-2'}}
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
                      if (result.winner === props.userPokemonData.name) {
                        props.setUsersPokemonArr((oldData) => [
                          ...oldData,
                          props.enemyPokemonData.name,
                        ]);
                        console.log("You win");
                        //console.log(props.usersPokemonArr);
                        GoBack();
                      } else if (
                        result.winner === props.enemyPokemonData.name
                      ) {
                        console.log("You lost");
                        GoBack();
                      }
                    }}
                  >
                    Fight!
                  </Button>
                  <Button
                    className="mt-5"
                    style={{ width: "25%", margin: "auto" }}
                    variant="danger"
                    onClick={() => {
                      setBattleStart(false);
                    }}
                  >
                    Change Pokemon
                  </Button>
                </div>
              )}
            </div>
          </>
        </div>
      ) : (
        <h2>Loading players, if there in no enemy, go back</h2>
      )}
    </div>
  );
}

export default BattleMenu;
