var playerMoney = 0 //money the player has
var animalCapacity = 0 //maximum number of animals player can own
var coopNumber = 0 //how many coops player owns
var animalNumber = 0 //how many animals player owns
var animalPrice = 60 //base price of animal
var coopPrice = animalPrice * 1.5 //base price of coop
var deadAnimals = 0 //how many dead animals player has lying around
var time, time2 //vars for detecting the right time for checkDead()


//SETUP
addMoney(-100)
deadAnimals = 1
time2 = new Date().getTime() + 10000
setInterval(loop, 100) //loop function


function loop() { //this function executes 10x every second
  document.getElementById("moneyCounter").textContent = "Peníze: $" + fancy(playerMoney)
  document.title = "JZOO ($" + fancy(playerMoney) + ")"
  addMoney(calculateIncome())
  time = new Date().getTime()
  checkDead()
} //function


function checkDead() { //kills 5% of owned animals
  if (time > time2) { //checks if the time is alright
    var x = Math.round(animalNumber * 0.05)
    animalNumber -= x
    deadAnimals += x
    time2 = time + 30000
    document.getElementById("animalNumber").textContent = animalNumber
    document.getElementById("deadAnimalCounter").textContent = deadAnimals
    document.getElementById("incomeCounter").textContent = "Příjem: $" + calculateIncome() * 10 + "/s"
  } //if in range
} //function


function buyCoopMax() { //buys maximum amount of coops player can afford
  var aff = Math.floor(playerMoney / coopPrice)
  for (var i = 0; i < aff; i++) {
    buyCoop()
  } //for
} //function


function buyCoopHalf() { //buys half of affordable animal
  var aff = Math.floor(playerMoney / coopPrice)
  aff = Math.ceil(aff / 2)
  for (var i = 0; i < aff; i++) {
    buyCoop()
  } //for
} //function


function buyCoop() { //buys new coop, makes animal capacity bigger
  if (playerMoney >= coopPrice) {
    coopNumber++
    addMoney(-coopPrice)
    animalCapacity += 12
    document.getElementById("coopNumber").textContent = fancy(coopNumber)
    coopPrice = animalPrice * 1.6
    document.getElementById("priceCoop").textContent = "Cena: $" + fancy(coopPrice)
    document.getElementById("incomeCounter").textContent = "Příjem: $" + fancy(calculateIncome() * 10) + "/s"
    document.getElementById("maxAnimals").textContent = "Max zvířat: " + fancy(animalCapacity)
  } //if playermoney
} //function


function buyAnimalMax() { //buys maximum amount of coops player can afford
  var aff = Math.floor(playerMoney / animalPrice)
  for (var i = 0; i < aff; i++) {
    buyAnimal()
  } //for
} //function


function buyAnimalHalf() { //buys half of affordable animal
  var aff = Math.floor(playerMoney / animalPrice)
  aff = Math.ceil(aff / 2)
  for (var i = 0; i < aff; i++) {
    buyAnimal()
  } //for
} //function


function buyAnimal() { //buys a new animal if there is space
  if (animalNumber + 1 <= animalCapacity) {
    if (playerMoney >= animalPrice) {
      addMoney(-animalPrice)
      animalNumber += 1
      document.getElementById("animalNumber").textContent = fancy(animalNumber)
      animalPrice *= 1.001
      document.getElementById("priceAnimal").textContent = "Cena: $" + fancy(animalPrice)
      document.getElementById("priceCoop").textContent = "Cena: $" + fancy(coopPrice)
      document.getElementById("incomeCounter").textContent = "Příjem: $" + fancy(calculateIncome() * 10) + "/s"
      coopPrice = animalPrice * 1.5
    } //if playermoney
  } //if is in capacity
} //function


function sellDeadMax() {
  for (var i = Math.floor(deadAnimals); i > 0; i--) {
    sellDead()
  } //for there is
} //function


function sellDeadHalf() {
  for (var i = Math.floor(deadAnimals / 2); i > 0; i--) {
    sellDead()
  } //for there is
} //function


function sellDead() { //sells dead animals for organs
  if (deadAnimals > 0) {
    deadAnimals--
    addMoney(1000) //rewards you for doing a fucking crime
    document.getElementById("deadAnimalCounter").textContent = fancy(deadAnimals)
  } //if deadAnimals
} //function


function addMoney(amount) { //adds spending money to player's account
  playerMoney += amount
} //function


function calculateIncome() { //calculates income for every second
  //every coop costs $5 a second to operate
  //every animal makes $1.7 a second
  var income = 0
  income += (animalNumber * 1.7)
  income -= (coopNumber * 5)
  return income / 10
} //function


function fancy(value) { //translates money to K, M, B, ...
  if (value > 10000000000000) {
    return Math.round((value / 1000000000000)) + "T"
  } else if (value > 1000000000000) {
    return Math.round((value / 1000000000000) * 10) / 10 + "T"
  } else if (value > 10000000000) {
    return Math.round((value / 1000000000)) + "B"
  } else if (value > 1000000000) {
    return Math.round((value / 1000000000) * 10) / 10 + "B"
  } else if (value > 10000000) {
    return Math.round(value / 1000000) + "M"
  } else if (value > 1000000) {
    return Math.round((value / 1000000) * 10) / 10 + "M"
  } else if (value > 10000) {
    return Math.round(value / 1000) + "K"
  } else if (value > 1000) {
    return Math.round((value / 1000) * 10) / 10 + "K"
  } //if
  return Math.round((value) * 10) / 10
} //function