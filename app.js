// Two Arrays of Objects, one that hold our Fighters, and one that holds our Weapons
// Both have Health Totals, Atk Modifiers, and Img links
let fighters = [
  {
    name: 'Ice',
    hp: 100,
    atk: 5,
    mod: 2,
    img: "./assets/fighters/small.png"
  },
  {
    name: 'Wood',
    hp: 150,
    atk: 10,
    mod: 1,
    img: "./assets/fighters/medium.png"
  },
  {
    name: 'Stone',
    hp: 200,
    atk: 20,
    mod: 0,
    img: "./assets/fighters/large.png"
  },
]

let weapons = [
  {
    name: 'Shortsword',
    atk: 5,
    mod: 2,
    img: "./assets/weapons/smallweapon.png"
  },
  {
    name: 'Broadsword',
    atk: 10,
    mod: 1,
    img: "./assets/weapons/mediumweapon.png"
  },
  {
    name: 'Greatsword',
    atk: 20,
    mod: 0,
    img: "./assets/weapons/largeweapon.png"
  },
]

// Global Variables
let player = {}
let computer = {}
let playerWeapon = {}
let computerWeapon = {}
let random = null

let fightStatus = ""
let fightTimer = null
let playerAtk = null
let computerAtk = null
let playerHealth = null
let computerHealth = null
let playerHealthPercent = null
let computerHealthPercent = null

// onclick Fighter Select in "fighter" div
// Passes a number, equal to the index of the Fighter Array that is selected
// Includes a random function that generates the Computer Fighter
function chooseFighter(num) {
  document.getElementById("fighters").classList.add("hidden")
  document.getElementById("weapons").classList.remove("hidden")
  player = fighters[num]
  randomFighter()
}


// Created Duplicate Fighter / Weapon functions that are nested inside the Random Fighter / Weapon functions
// They compare the names of the Fighers and their weapons to ensure they are not the same.
function randomFighter() {
  random = Math.floor(Math.random() * fighters.length)
  computer = fighters[random]
  duplicateFighter()
}

function duplicateFighter() {
  if (computer.name == player.name) {
    randomFighter()
  }
}

function randomWeapon() {
  random = Math.floor(Math.random() * weapons.length)
  computerWeapon = weapons[random]
  duplicateWeapon()
}

function duplicateWeapon() {
  if (computerWeapon.name == playerWeapon.name) {
    randomWeapon()
  }
}

// onclick Weapon Select in "weapon" div
// Passes a number, equal to the index of the Weapon Array that is selected
// Includes a random function that generates the Computer Weapon
function chooseWeapon(num) {
  playerWeapon = weapons[num]
  randomWeapon()
  getStarted()
}


// handles our Draw functions for our Modified Stats, dynamic Arena Layout in "arena" div, and our Fight Interval
function getStarted() {
  drawStats()
  fightInterval()
  drawArena()
}

// Dynamically draws to the "arena" div, ${} represent object stats from our Player Fighter / Computer Fighter
function drawArena() {
  document.getElementById("arena").classList.remove("hidden")
  document.getElementById("weapons").classList.add("hidden")
  let arenaElement = document.getElementById("arena")
  let template = `
  <div class="col-4 card p-3">
    <div class="row justify-content-start">
      <div class="col-10">
        <div class="card bg-success py-3" style="width: ${playerHealthPercent}%"></div>
      </div>
      <div class="col-2>
        <h3 class="card"><strong>${playerHealth}</strong></h3>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-8">
        <h1>${player.name}</h1>
      </div>
      <div class="col-3">
        <img class="w-100" src=${playerWeapon.img} alt="">
      </div>
    </div>
    <img src=${player.img} alt="">
  </div>

  <div class="col-3 card align-self-center">
    <h2>
      ${fightStatus}
    </h2>
    <h3>
      ${player.name} DEALS <br> ${playerAtk} DAMAGE!
    </h3>
    <h3>
      ${computer.name} DEALS <br> ${computerAtk} DAMAGE!
    </h3>
  </div>

  <div class="col-4 card p-3">
    <div class="row justify-content-start">
      <div class="col-10">
        <div class="card bg-success py-3" style="width: ${computerHealthPercent}%"></div>
      </div>
      <div class="col-2>
        <h3 class="card"><strong>${computerHealth}</strong></h3>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-8">
        <h1>${computer.name}</h1>
      </div>
      <div class="col-3">
        <img class="w-100" src=${computerWeapon.img} alt="">
      </div>
    </div>
    <img src=${computer.img} alt="">
  </div>
  `
  arenaElement.innerHTML = template
}

// Modify the Player / Computer Atk based on their object "mod" values
function drawStats() {
  playerAtk = player.atk + playerWeapon.atk
  computerAtk = computer.atk + computerWeapon.atk
  playerHealth = player.hp
  computerHealth = computer.hp
  playerHealthPercent = Math.floor((playerHealth / player.hp) * 100)
  computerHealthPercent = Math.floor((computerHealth / computer.hp) * 100)
}

// RNG for 50% Atk mod effect
function atkMod() {
  random = Math.random()
}

// Calls atkMod every Fight to determine if the "mod" condition takes effect
function critOrMiss() {
  atkMod()
  playerAtk = player.atk + playerWeapon.atk
  computerAtk = computer.atk + computerWeapon.atk
  if (random <= .5) {
    playerAtk *= player.mod
  }
  atkMod()
  if (random <= .5) {
    computerAtk *= computer.mod
  }
  atkMod()
  if (random <= .5) {
    playerAtk *= playerWeapon.mod
  }
  atkMod()
  if (random <= .5) {
    computerAtk *= computerWeapon.mod
  }
}

// Ideally, prevents the Health Bar from falling below 0...
function ifZero() {
  if (playerHealth <= 0 || playerHealthPercent <= 0) {
    playerHealth = 0
    playerHealthPercent = 0
  }
  if (computerHealth <= 0 || computerHealthPercent <= 0) {
    computerHealth = 0
    computerHealthPercent = 0
  }
}

// Pits the Fighters against each other, modifying their "hp" values depending on opponent's "atk" and "mod" values
function fight() {
  if (playerHealth <= 0 || computerHealth <= 0) {
    clearInterval(fightTimer)
    if (playerHealth <= 0 && computerHealth <= 0) {
      fightStatus = "IT'S A DRAW!"
    } else if (playerHealth <= 0) {
      fightStatus = `${computer.name} WINS!`
    } else if (computerHealth <= 0) {
      fightStatus = `${player.name} WINS!`
    }
  } else {
    critOrMiss()
    playerHealth -= computerAtk
    computerHealth -= playerAtk
    playerHealthPercent = Math.floor((playerHealth / player.hp) * 100)
    computerHealthPercent = Math.floor((computerHealth / computer.hp) * 100)
  }
  ifZero()
  drawArena()
}

// Determines the frequency with which our Fight() function is called
function fightInterval() {
  fightTimer = setInterval(() => { fight() }, 1000)
}