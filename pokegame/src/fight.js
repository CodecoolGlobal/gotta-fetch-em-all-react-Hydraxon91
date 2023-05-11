export default function fight(attacker, defender, setUserPokemonData, userPokemonData) {
  const min = 217;
  const max = 255;
  let winner = null;
  console.log(attacker);
  let hpAttacker = attacker.currHP;
  let hpDefender = defender.stats[0].base_stat;
  const BAttacker = attacker.data.stats[1].base_stat;
  const BDefender = defender.stats[1].base_stat;
  const DAttacker = attacker.data.stats[2].base_stat;
  const DDefender = defender.stats[2].base_stat;

  const Z = Math.floor(Math.random() * (max - min + 1) + min);
  function updatePokemonHealth(){
    let data = userPokemonData;
    userPokemonData.currHP = attacker.currHP;
    setUserPokemonData(data)
  }
  //** Attacker => Defender
  const AD = Math.floor(
    ((((2 / 5 + 2) * BAttacker * 60) / DDefender / 50 + 2) * Z) / 255
  );

  //** Defender => Attacker
  const DA = Math.floor(
    ((((2 / 5 + 2) * BDefender * 60) / DAttacker / 50 + 2) * Z) / 255
  );

  hpDefender -= AD;
  hpAttacker -= DA;

  // Update attacker's and defender's base_stat values in stats array
  hpAttacker <= 0? attacker.currHP = 1 : attacker.currHP = hpAttacker;
  console.log("attacker.currHP ",attacker.currHP);
  defender.stats[0].base_stat = hpDefender;
  console.log(winner);
  updatePokemonHealth();
  if (attacker.currHP > 0 && hpDefender <= 0) winner = attacker.data.name;
  else if (hpDefender > 0 && attacker.currHP <= 1) winner = defender.name;
  //else if (hpAttacker < 0 && hpDefender < 0) winner = "draw";

  //console.log(` ${hpAttacker} vs. ${hpDefender}`);
  //console.log(winner ? "The winner is: " + winner : "");
  return { hpAttacker: hpAttacker, hpDefender: hpDefender, winner: winner };
}
