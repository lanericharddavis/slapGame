let fighters = [
  {
    name: 'small',
    hp: 100,
    atk: 5,
    mod: '50% dodge',
    img: "./assets/fighters/small.jpg"
  },
  {
    name: 'medium',
    hp: 150,
    atk: 10,
    mod: '',
    img: "./assets/fighters/medium.jpg"
  },
  {
    name: 'large',
    hp: 200,
    atk: 15,
    mod: '50% miss',
    img: "./assets/fighters/large.jpg"
  },
]

let weapons = [
  {
    item: 'silk',
    plus: 5,
    mod: '50% crit',
    img: "./assets/weapons/smallweapon.jpg"
  },
  {
    item: 'standard',
    plus: 10,
    mod: '',
    img: "./assets/weapons/mediumweapon.jpg"
  },
  {
    item: 'metal',
    plus: 15,
    mod: '50% miss',
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
        <i>${player.hp}</i>
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
        <i>${computer.hp}</i>
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
  drawStats()
  fightInterval()
}

function drawStats() {
  playerAtk = player.atk + playerWeapon.plus
  computerAtk = computer.atk + computerWeapon.plus
  playerHealth = player.hp
  computerHealth = computer.hp
}

function fight() {
  if (playerHealth <= 0 || computerHealth <= 0) {
    clearInterval(fightTimer)
  } else {
    playerHealth -= computerAtk
    computerHealth -= playerAtk
  }
  console.log(playerHealth, playerAtk)
  console.log(computerHealth, computerAtk)
}

function fightInterval() {
  fightTimer = setInterval(() => { fight() }, 1000)
}