//**  FORMULA:
//**   ((((2/5+2)*B*60/D)/50)+2)*Z/255,
//** where B is the attacker's Attack,
//**       D is defender's Defense,
//**   and Z is a random number between 217 and 255. * /

const attacker = {
  name: "Pikachu",
  stats: [
    {
      base_stat: 50,
      stat: {
        name: "hp",
      },
    },
    {
      base_stat: 50,
      stat: {
        name: "attack",
      },
    },
    {
      base_stat: 50,
      stat: {
        name: "defense",
      },
    },
  ],
};

//** "stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}},{"base_stat":49,"effort":0,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":49,"effort":0,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":65,"effort":1,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":65,"effort":0,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":45,"effort":0,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}}],"types":[{"slot":1,"type":{"name":"grass","url":"https://pokeapi.co/api/v2/type/12/"}},{"slot":2,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}}],"weight":69}

const defender = {
  name: "Bulbasaur",
  stats: [
    {
      base_stat: 48,
      stat: {
        name: "hp",
      },
    },
    {
      base_stat: 52,
      stat: {
        name: "attack",
      },
    },
    {
      base_stat: 65,
      stat: {
        name: "defense",
      },
    },
  ],
};

//** export default
function fight(attacker, defender) {
  let round = 1;
  const min = 217;
  const max = 255;

  let hpAttacker = attacker.stats[0]["base_stat"];
  let hpDefender = defender.stats[0].base_stat;
  const BAttacker = attacker.stats[1].base_stat;
  const BDefender = defender.stats[1].base_stat;
  const DAttacker = attacker.stats[2].base_stat;
  const DDefender = defender.stats[2].base_stat;

  while (hpAttacker > 0 && hpDefender > 0) {
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

    console.log(`${round},  ${hpAttacker} vs. ${hpDefender}`);
    round++;
  }

  if (hpAttacker > 0) console.log("Attacker won!");
  else if (hpDefender > 0) console.log("Defender won!");
  else console.log("Draw!");
}

fight(attacker, defender);
