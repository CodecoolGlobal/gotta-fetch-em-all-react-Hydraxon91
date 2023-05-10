export default function fight(attacker, defender) {
  const min = 217;
  const max = 255;
  let winner = null;

  let hpAttacker = attacker.stats[0].base_stat;
  let hpDefender = defender.stats[0].base_stat;
  const BAttacker = attacker.stats[1].base_stat;
  const BDefender = defender.stats[1].base_stat;
  const DAttacker = attacker.stats[2].base_stat;
  const DDefender = defender.stats[2].base_stat;

  const Z = Math.floor(Math.random() * (max - min + 1) + min);

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
  attacker.stats[0].base_stat = hpAttacker;
  defender.stats[0].base_stat = hpDefender;

  if (hpAttacker > 0 && hpDefender <= 0) winner = attacker.name;
  else if (hpDefender > 0 && hpAttacker <= 0) winner = defender.name;
  //else if (hpAttacker < 0 && hpDefender < 0) winner = "draw";

  //console.log(` ${hpAttacker} vs. ${hpDefender}`);
  //console.log(winner ? "The winner is: " + winner : "");
  return { hpAttacker: hpAttacker, hpDefender: hpDefender, winner: winner };
}
