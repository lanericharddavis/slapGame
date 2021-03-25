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

function chooseFighter(num) {
  document.getElementById("fighters").classList.add("hidden")
  document.getElementById("weapons").classList.remove("hidden")
  player = fighters[num]
  random = Math.floor(Math.random() * fighters.length)
  computer = fighters[random]
  // let compArray = fighters.filter
  console.log(player, computer)
}

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

function chooseWeapon(num) {
  playerWeapon = weapons[num]
  random = Math.floor(Math.random() * weapons.length)
  computerWeapon = weapons[random]
  // let compArray = fighters.filter
  console.log(playerWeapon, computerWeapon)
  getStarted()
}

function getStarted() {
  drawStats()
  fightInterval()
  drawArena()
}

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

function drawStats() {
  playerAtk = player.atk + playerWeapon.plus
  computerAtk = computer.atk + computerWeapon.plus
  playerHealth = player.hp
  computerHealth = computer.hp
  playerHealthPercent = playerHealth / player.hp * 100
  computerHealthPercent = computerHealth / computer.hp * 100
}

function atkMod() {
  random = Math.random()
}

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

function ifZero() {
  if (playerHealthPercent <= 0) {
    playerHealthPercent = 0
  }
  if (computerHealthPercent <= 0) {
    computerHealthPercent = 0
  }
}

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

function fightInterval() {
  fightTimer = setInterval(() => { fight() }, 1000)
}