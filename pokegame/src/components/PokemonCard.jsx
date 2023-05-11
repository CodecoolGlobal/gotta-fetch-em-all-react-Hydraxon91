import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Pokemon(props) {
    const name = props.name
    const maxHp = props.hp
    const currHP = props.currHP;
    const attack = props.attack
    const defense = props.defense
    const sprite = props.sprite
    const handleClick = props.handleClick
    const text = props.text
    

   
    return (
    <Card border="danger" bg="warning" className="card mb-1">
      <Card.Img variant="top" src={sprite} style={{width:"50%", margin: "auto"}}/>
      <Card.Body>
        <Card.Title>Pokemon name: {name}</Card.Title>  
        <Card.Text>Health: {currHP}/{maxHp}</Card.Text>
        <Card.Text>Attack: {attack} </Card.Text>
        <Card.Text>Defense: {defense}</Card.Text>
          <Button variant="danger" onClick={() => handleClick(name)}>{text }</Button>
      </Card.Body>
    </Card>
  );
    
}