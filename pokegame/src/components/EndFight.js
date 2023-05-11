import React from "react";
import { Button } from "react-bootstrap";
import Pokemon from "./PokemonCard";

function EndFight(props) {
    const { winner, loser, winnerPokemonData } = props

    return (
        <div>
            <h2>Winner: {winner}</h2>
            <h2>Loser: {loser}</h2>
            <h3>You have one new Pokemon!</h3>
            <div className="row">
                <div className="col-md-4 mt-5">
                    <Pokemon
                    name={winnerPokemonData.name}
                    hp={winnerPokemonData.stats[0].base_stat}
                    attack={winnerPokemonData.stats[1].base_stat}
                    defense={winnerPokemonData.stats[2].base_stat}
                    sprite={winnerPokemonData.sprites.front_default}
                    />
                </div>
            </div>
            <Button
                className="mt-5"
                variant="warning"
                onClick={() => props.goBack()}
                //style={{ zIndex: "-1" }}
            >
                Go Back
            </Button>
        </div>
    )
}

export default EndFight;