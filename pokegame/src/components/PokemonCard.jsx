import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Pokemon(props) {
    const name = props.name
    const handleClick = props.handleClick
    

   
    return (
    <Card border="danger" bg="warning">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Pokemon name: {name}</Card.Title>
              <Card.Text>
               A piszti zsugta kevénysége nagyon gulan, részben a csernyős jánázsok, részben a táradt jeségek miatt. Ha pedig halálják a bikát akkor teljesen parnázják, azaz öngőt gáltanak.
        </Card.Text>
        <Button variant="danger" onClick={() => handleClick}>Choose pokemon!</Button>
      </Card.Body>
    </Card>
  );
    
}