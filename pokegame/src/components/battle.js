import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import styles from "./styles/battlestyle.module.css";
import fight from "../fight";
import Pokemon from "./PokemonCard";
import HPBar from "./HPBar";
import EndFight from "./EndFight";
import SpinnerAnim from "./Spinner";

function BattleMenu(props) {
  //console.log(fight);
  //console.log("props.userpokemondata ", props.userPokemonData);
  const [showEndFight, setShowEndFight] = useState(false);
  const [result, setResult] = useState(null);
  const [wonBattle, setWonBattle] = useState(false);

  function GoBack() {
    setWonBattle(false);
    props.setBattleState(false);
    setShowEndFight(false);
    props.setEnemyPokemon();
    // props.setEnemyPokemonData();
  }

  function updatePokemonHealth(hp) {
    let data = props.userPokemonData;
    data.currHP = hp;
    console.log("data is ", data);
    props.setUserPokemonData(data);
  }
  function changePokemon(pokemon) {
    updatePokemonHealth(attackerHP);
    props.setUserPokemon(pokemon);
    setBattleStart(true);
    //console.log("teszt");
  }
  function fighting() {
    const updatedAttacker = {
      ...props.userPokemonData,
      currHP: attackerHP,
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

    const result = fight(
      updatedAttacker,
      updatedDefender,
      props.setUserPokemonData,
      props.userPokemonData
    );
    setResult(result);

    setAttackerHP(result.hpAttacker);
    setDefenderHP(result.hpDefender);
    updatePokemonHealth(attackerHP);
    if (result.winner === props.userPokemonData.data.name) {
      setWonBattle(true);

      let loserPokemon = props.enemyPokemonData;
      let newPokemon = {
        id:
          props.usersPokemonArrData[props.usersPokemonArrData.length - 1].id +
          1,
        data: loserPokemon,
        currHP: loserPokemon.stats[0].base_stat,
      };
      let existingPokemon = props.usersPokemonArrData.find(
        (pokemon) => pokemon.data.name === loserPokemon.name
      );
      if (existingPokemon) {
        props.setUsersPokemonArrData((oldData) => [
          ...oldData.filter(
            (pokemon) => pokemon.data.name !== loserPokemon.name
          ),
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
      setShowEndFight(true);
      //console.log(props.usersPokemonArr);
      updatePokemonHealth(attackerHP);
      //GoBack();
    } else if (result.winner === props.enemyPokemonData.name) {
      console.log("You lost");
      setShowEndFight(true);
      updatePokemonHealth(attackerHP);
      //GoBack();
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
  console.log(props.enemyPokemonData);
  return (
    <div
      id="test"
      style={{ height: "100%", width: "100%", justifyContent: "center" }}
    >
      {showEndFight ? (
        <EndFight
          wonBattle={wonBattle}
          winner={result.winner}
          loser={
            result.winner !== props.enemyPokemonData.name
              ? props.enemyPokemonData
              : props.userPokemonData.data
          }
          goBack={GoBack}
          // winnerPokemonData={result.winner === props.userPokemonData.name ? props.enemyPokemonData : props.userPokemonData}
        />
      ) : (
        <div className="d-flex justify-content-center">
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${props.randomBG})` }}
          >
            <HPBar
              className="mt-5"
              variant="success"
              HP={Math.round(
                (attackerHP * 100) /
                  props.userPokemonData?.data.stats[0].base_stat
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

            {props.enemyPokemonData ? (
              <div id="battleParent" style={{ height: "100%" }}>
                <div>
                  <h2 className={styles.enemyName}>
                    {props.enemyPokemonData.name}
                  </h2>
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
                            text="Choose pokemon!"
                            handleClick={changePokemon}
                          ></Pokemon>
                        </div>
                      ))
                    ) : (
                      <div style={{ marginTop: "10%" }}>
                        <Button
                          className="mt-5 mx-1"
                          size="lg"
                          variant="danger"
                          onClick={fighting}
                        >
                          Fight!
                        </Button>
                        <Button
                          className="mt-5 mx-1"
                          size="lg"
                          variant="warning"
                          onClick={() => {
                            updatePokemonHealth(attackerHP);
                            setBattleStart(false);
                          }}
                        >
                          Change Pokemon
                        </Button>
                        <Button
                          className="mt-5 mx-1"
                          size="lg"
                          variant="success"
                          onClick={() => {
                            GoBack();
                            updatePokemonHealth(attackerHP);
                          }}
                        >
                          Flee!
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              </div>
            ) : (
              <div style={{ display: "block" }}>
                {/* <h2>Loading players, if there in no enemy, go back</h2> */}
                <SpinnerAnim style={{ margin: "auto" }} />
                <Button
                  className="mt-5"
                  variant="success"
                  onClick={() => GoBack()}
                  size="lg"
                >
                  Go back!
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BattleMenu;
