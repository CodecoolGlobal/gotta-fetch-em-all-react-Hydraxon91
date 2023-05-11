import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import styles from "./styles/battlestyle.module.css";
import fight from "../fight";
import Pokemon from "./PokemonCard";
import HPBar from "./HPBar";
import SpinnerAnim from "./Spinner";

function BattleMenu(props) {
  //console.log(fight);
  //console.log("props.userpokemondata ", props.userPokemonData);
  function GoBack() {
    props.setBattleState(false);
    props.setEnemyPokemon();
    // props.setEnemyPokemonData();
  }
  function changePokemon(pokemon) {
    props.setUserPokemon(pokemon);
    setBattleStart(true);
    //console.log("teszt");
  }
  function fighting() {
    const updatedAttacker = {
      ...props.userPokemonData,
      currHP: attackerHP
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
    if (result.winner === props.userPokemonData.data.name) {
      let loserPokemon = props.enemyPokemonData;
      let newPokemon = {
        id: props.usersPokemonArrData[props.usersPokemonArrData.length-1].id+1,
        data: loserPokemon,
        currHP: loserPokemon.stats[0].base_stat
      }
      let existingPokemon = props.usersPokemonArrData.find(
        (pokemon) => pokemon.data.name === loserPokemon.name
      );
      if (existingPokemon) {
        props.setUsersPokemonArrData((oldData) => [
          ...oldData.filter((pokemon) => pokemon.data.name !== loserPokemon.name),
          newPokemon,
        ]);
      } else {
        console.log(props.usersPokemonArrData);
        
        props.setUsersPokemonArrData((oldData) => [...oldData, newPokemon]);
        props.setUsersPokemonArr((oldData) => [...oldData, loserPokemon.name]);
        console.log(props.usersPokemonArr);
      }
      /*props.setUsersPokemonArr((oldData) => [
        ...oldData,
        props.enemyPokemonData.name,
      ]);*/
      console.log("You win");
      //console.log(props.usersPokemonArr);
      GoBack();
    } else if (result.winner === props.enemyPokemonData.name) {
      console.log("You lost");
      GoBack();
    }
  }
  //Attacker = player, defender = enemy
  const [attackerHP, setAttackerHP] = useState(
    props.userPokemonData?.currHP || 0
  );
  const [defenderHP, setDefenderHP] = useState(
    props.enemyPokemonData?.stats?.[0]?.base_stat || 0
  );
  const [battleStart, setBattleStart] = useState(true);

  useEffect(() => {
    if (props.userPokemonData) {
      setAttackerHP(props.userPokemonData.currHP);
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
      style={{ backgroundImage: `url(${props.randomBG})`, margin: "auto" }}
    >
      <HPBar
        className="mt-5"
        variant="success"
        HP={Math.round(
          (attackerHP * 100) / props.userPokemonData?.currHP
        )}
        label={props.userPokemonData.data?.name}
      ></HPBar>
      <HPBar
        className="mt-5"
        variant="danger"
        HP={Math.round(
          (defenderHP * 100) / props.enemyPokemonData?.stats[0].base_stat
        )}
        label={props.enemyPokemonData?.name}
      ></HPBar>

      {/* <Button
        className="mt-5"
        variant="warning"
        onClick={() => GoBack()}
        style={{ zIndex: "-1" }}
      >
        Go Back
      </Button> */}
      {/* <h1>This is the battle menu</h1> */}
      {props.enemyPokemonData ? (
        <div id="battleParent" style={{ height: "100%" }}>
          <div>
            <h2 className={styles.enemyName}>{props.enemyPokemonData.name}</h2>
            <img
              src={props.enemyPokemonData.sprites.front_default}
              alt={props.enemyPokemonData.name}
              className={styles.enemy}
            ></img>
            <div className={styles.playerDiv}>
              <h2 className={styles.playerName}>
                {props.userPokemonData.data.name}
              </h2>
              <img
                src={props.userPokemonData.data.sprites.back_default}
                alt={props.userPokemonData.data.name}
                className={styles.player}
              ></img>
            </div>
            <div className={styles.hpDiv}>
              <h2 className="mt-5">
                {props.userPokemonData.data.name}'s HP: {attackerHP}
              </h2>
              <h2>
                {props.enemyPokemonData.name}'s HP: {defenderHP}
              </h2>
            </div>
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
                      name={pokemon.data.name}
                      hp={pokemon.data.stats[0].base_stat}
                      currHP={pokemon.currHP}
                      attack={pokemon.data.stats[1].base_stat}
                      defense={pokemon.data.stats[2].base_stat}
                      sprite={pokemon.data.sprites.front_default}
                      // onClick={() => {
                      //   props.setUserPokemon(pokemon);
                      //   console.log("teszt");
                      // }}
                      handleClick={changePokemon}
                    ></Pokemon>
                  </div>
                ))
              ) : (
                <div style={{ marginTop: "10%" }}>
                  <Button
                    className="mt-5"
                    style={{ width: "25%", margin: "auto" }}
                    variant="danger"
                    // style={{zIndex: '-2'}}
                    onClick={fighting}
                  >
                    Fight!
                  </Button>
                  <Button
                    className="mt-5"
                    style={{ width: "25%", margin: "auto" }}
                    variant="warning"
                    onClick={() => {
                      setBattleStart(false);
                    }}
                  >
                    Change Pokemon
                  </Button>
                  <Button
                    className="mt-5"
                    variant="success"
                    onClick={() => GoBack()}
                    style={{ zIndex: "-1", width: "10%" }}
                  >
                    Flee!
                  </Button>
                </div>
              )}
            </div>
          </>
        </div>
      ) : (
        <div style={{display:"block"}}>
          <h2>Loading players, if there in no enemy, go back</h2>
          {/* <SpinnerAnim style={{margin:"auto"}}/> */}
          <Button
                    className="mt-5"
                    variant="success"
                    onClick={() => GoBack()}
                    style={{ zIndex: "-1", width: "10%" }}
                  >
                    Go back!
          </Button>
        </div>
        
      )}
    </div>
  );
}

export default BattleMenu;
