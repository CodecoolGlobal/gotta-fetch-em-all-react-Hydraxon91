import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Location(props) {
  const location = props.location;
    const pokemonArray = props.pokemonArray;
    const pokemon = props.pokemon
    const handleClick = props.handleClick
const pokemons = pokemonArray.join(", ").toUpperCase()
    

  return (
    <Card style={{ width: "18rem" }} bg="light">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Area: {location}</Card.Title>
              <Card.Text>
                <h5>In this area you may encounter: </h5>  {pokemons}
        </Card.Text>
        <Button variant="danger" onClick={() => handleClick(location, pokemon)}>Enter area!</Button>
      </Card.Body>
    </Card>
  );
}

export default Location;