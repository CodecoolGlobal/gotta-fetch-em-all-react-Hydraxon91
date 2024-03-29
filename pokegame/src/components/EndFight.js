import React from "react";
import { Button } from "react-bootstrap";
import Pokemon from "./PokemonCard";

function EndFight(props) {
  const { winner, loser, wonBattle, goBack } = props;

  return (
    <div>
      <h2>Winner: {winner}</h2>
      <h2>Loser: {loser.name}</h2>
      <br></br>
      <br></br>
      {/* <h2>You have one new Pokemon!</h2> */}
      {wonBattle ? (
        <div className="row" style={{ justifyContent: "center" }}>
          <h2>You have one new Pokemon!</h2>
          <div className="col-md-4 mt-5">
            <Pokemon
              name={loser.name}
              currHP={0}
              hp={loser.stats[0].base_stat}
              attack={loser.stats[1].base_stat}
              defense={loser.stats[2].base_stat}
              sprite={loser.sprites.front_default}
              handleClick={props.goBack}
              text={props.text}
            />
          </div>
        </div>
      ) : (
        <div>
          <h2>You lost! :( 😭</h2>
          <Button
            className="mt-5 mx-1"
            size="lg"
            variant="warning"
            onClick={() => {
              goBack();
            }}
          >
            Return to map!
          </Button>
        </div>
      )}
    </div>
  );
}

export default EndFight;
