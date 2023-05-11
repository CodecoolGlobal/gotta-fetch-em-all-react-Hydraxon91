import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// const imagePath = [
//   "../../public/assets/locations/Eterna_City.png",
//   "../../public/assets/locations/Fuego_Ironworks.png",
//   "../../public/assets/locations/Great_Marsh.png",
//   "../../public/assets/locations/Hearthome_City.png",
//   "../../public/assets/locations/Valley_Windworks.png",
//   "../../public/assets/locations/cave.png",
//   "../../public/assets/locations/eternaForest.png",
//   "../../public/assets/locations/fuego.png",
//   "../../public/assets/locations/mt-coronet.png",
//   "../../public/assets/locations/oreburgh.png",
//   "../../public/assets/locations/oreburghCity.jpg",
//   "../../public/assets/locations/pastoriaCity.png",
//   "../../public/assets/locations/sinnoh-league.jpg",
//   "../../public/assets/locations/sinnoh.png",
//   "../../public/assets/locations/snowpointTemple.jpg",
//   "../../public/assets/locations/solaceonRuins.png",
//   "../../public/assets/locations/springPath.jpg",
//   "../../public/assets/locations/sunyshoreCity.jpg",
//   "../../public/assets/locations/temple.png"
// ]


const imagePath = [
  "Eterna_City.png",
  "Fuego_Ironworks.png",
  "Great_Marsh.png",
  "Hearthome_City.png",
  "Valley_Windworks.png",
  "cave.png",
  "eternaForest.png",
  "fuego.png",
  "mt-coronet.png",
  "oreburgh.png",
  "oreburghCity.jpg",
  "pastoriaCity.png",
  "sinnoh-league.jpg",
  "sinnoh.png",
  "snowpointTemple.jpg",
  "solaceonRuins.png",
  "springPath.jpg",
  "sunyshoreCity.jpg",
  "temple.png",
]


function Location(props) {
    const location = props.location;
    const pokemonArray = props.pokemonArray;
    const pokemon = props.pokemon
    const handleClick = props.handleClick
    const pokemons = pokemonArray.join(", ").toUpperCase()
    let areaName = location.toUpperCase();
    

  const randomIndex = Math.floor(Math.random() * imagePath.length);
console.log(imagePath[randomIndex]);
  return (
    <Card border="danger" bg="warning" className="card">
      {/* <Card.Img variant="top" src={`../../public/locations/${imagePath[randomIndex]}`} /> */}
     <Card.Img variant="top" src="https://i.pinimg.com/originals/84/7b/fb/847bfb0ccd3683c6fc8c32b6b99aa153.png" />

      <Card.Body>
        <Card.Title>Area: {areaName}</Card.Title>
              <Card.Text>
                <h5>In this area you may encounter: </h5>  {pokemons}
        </Card.Text>
        <Button variant="danger" onClick={() => handleClick(location, pokemon)}>Enter area!</Button>
      </Card.Body>
    </Card>
  );
}

export default Location;