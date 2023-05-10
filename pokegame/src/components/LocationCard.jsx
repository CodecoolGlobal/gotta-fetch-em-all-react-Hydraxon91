import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Location(props) {
  const location = props.location;
    const pokemonArray = props.pokemonArray;
    const pokemon = props.pokemon
    const handleClick = props.handleClick

  return (
    <Card style={{ width: "18rem" }} bg="secondary">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Area: {location}</Card.Title>
        <Card.Text>
          Lórum ipse zatos grabárt horol: a törper készeg rösken, törgecskes enyzetség ez. A másik nevezgő pocki a konum surkoma, ez azonban általában a tetések hatós lertásától
        </Card.Text>
        <Button variant="danger" onClick={() => handleClick(location, pokemon)}>Enter area!</Button>
      </Card.Body>
    </Card>
  );
}

export default Location;