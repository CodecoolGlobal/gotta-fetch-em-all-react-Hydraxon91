import React, { useState } from "react";
import Location from "./LocationCard";
import { Row, Col } from "react-bootstrap";
import Intro from "./StartPage";

function MainPage(props) {
  let locationAreaData = props.locationAreaData;

  function EnterBattle(location, pokemon) {
    console.log(`Entered battle in ${location} against ${pokemon}`);

    props.setEnemyPokemon(pokemon);
    props.setBattleState(true);
  }

  const [IntroPlayed, SetIntroPlayed] = useState(false);

  const handleNext = () => {
    SetIntroPlayed(true);
  };

  return !IntroPlayed ? (
    <Intro handleClick={handleNext}></Intro>
  ) : (
    <Row className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {locationAreaData.map((e, index) => {
        let pokemon;
        let pokemonArray = [];
        if (e.area !== undefined) {
          pokemon =
            e.area.pokemon_encounters[
              Math.floor(Math.random() * e.area.pokemon_encounters.length)
            ].pokemon.name;
          e.area.pokemon_encounters.map((e) =>
            pokemonArray.push(e.pokemon.name)
          );
        } else {
        }
        return (
          <Col key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Location
              handleClick={EnterBattle}
              pokemon={pokemon}
              location={e.location}
              pokemonArray={pokemonArray}
            ></Location>
          </Col>
        );
      })}
    </Row>
  );
}
export default MainPage;
