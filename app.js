// Two Arrays of Objects, one that hold our Fighters, and one that holds our Weapons
// Both have Health Totals, Atk Modifiers, and Img links
let fighters = [
  {
    name: 'small',
    hp: 100,
    atk: 5,
    mod: 2,
    img: "./assets/fighters/small.jpg"
  },
  {
    name: 'medium',
    hp: 150,
    atk: 10,
    mod: 1,
    img: "./assets/fighters/medium.jpg"
  },
  {
    name: 'large',
    hp: 200,
    atk: 15,
    mod: 0,
    img: "./assets/fighters/large.jpg"
  },
]

let weapons = [
  {
    item: 'silk',
    plus: 5,
    mod: 2,
    img: "./assets/weapons/smallweapon.jpg"
  },
  {
    item: 'standard',
    plus: 10,
    mod: 1,
    img: "./assets/weapons/mediumweapon.jpg"
  },
  {
    item: 'metal',
    plus: 15,
    mod: 0,
    img: "./assets/weapons/largeweapon.jpg"
  },
]

// Global Variables
let player = {}
let computer = {}
let playerWeapon = {}
let computerWeapon = {}
let random = null

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
  random = Math.floor(Math.random() * fighters.length)
  computer = fighters[random]
  console.log(player, computer)
}

// FAILED ATTEMPT AT REMOVING DUPLICATES (Tis my eternal shame...)
// function randomFighter() {
//   random = Math.floor(Math.random() * fighters.length)
//   computer = fighters[random]
//   console.log(computer, player)
//   duplicateCheck(computer, player)
// }

// function duplicateCheck(computer, player) {
// if (computer == player) {
// randomFighter()
// }
// console.log(player, computer)
// }

// onclick Weapon Select in "weapon" div
// Passes a number, equal to the index of the Weapon Array that is selected
// Includes a random function that generates the Computer Weapon
function chooseWeapon(num) {
  playerWeapon = weapons[num]
  random = Math.floor(Math.random() * weapons.length)
  computerWeapon = weapons[random]
  console.log(playerWeapon, computerWeapon)
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
  let = arenaElement = document.getElementById("arena")
  let template = `
       <div class="col-5 card">
    <div class="row justify-content-start">
      <div class="col">
        <div class="card bg-success" style="width: ${playerHealthPercent}%">
          <h3>${playerHealth}</h3>
        </div>
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

  <div class="col-5 card">
    <div class="row justify-content-start">
      <div class="col">
        <div class="card bg-success" style="width: ${computerHealthPercent}%">
          <h3>${computerHealth}</h3>
        </div>
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
  playerAtk = player.atk + playerWeapon.plus
  computerAtk = computer.atk + computerWeapon.plus
  playerHealth = player.hp
  computerHealth = computer.hp
  playerHealthPercent = playerHealth / player.hp * 100
  computerHealthPercent = computerHealth / computer.hp * 100
}

// RNG for 50% Atk mod effect
function atkMod() {
  random = Math.random()
}

// Calls atkMod every Fight to determine if the "mod" condition takes effect
function critOrMiss() {
  atkMod()
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
  if (playerHealthPercent <= 0) {
    playerHealthPercent = 0
  }
  if (computerHealthPercent <= 0) {
    computerHealthPercent = 0
  }
}

// Pits the Fighters against each other, modifying their "hp" values depending on opponent's "atk" and "mod" values
function fight() {
  ifZero()
  if (playerHealth <= 0 || computerHealth <= 0) {
    clearInterval(fightTimer)
    console.log("WE HAVE A WINNER")
  } else {
    critOrMiss()
    playerHealth -= computerAtk
    computerHealth -= playerAtk
    playerHealthPercent = playerHealth / player.hp * 100
    computerHealthPercent = computerHealth / computer.hp * 100
    console.log(playerAtk)
    console.log(computerAtk)
    playerAtk = player.atk + playerWeapon.plus
    computerAtk = computer.atk + computerWeapon.plus
  }
  drawArena()
}

// Determines the frequency with which our Fight() function is called
function fightInterval() {
  fightTimer = setInterval(() => { fight() }, 1000)
}