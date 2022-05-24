'use strict';

console.log('hello busmall!');

//***********Global variables***********
let busmallCount = 25;
let busmallItems = [];

//***********DOM references***********
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let shwoResultsBtn = document.getElementById('show-result-btn');
let resultsList = document.getElementById('results-list');

//***********Constructor***********
function Busmall(name, fileExtention = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtention}`;

  busmallItems.push(this);
}
new Busmall('sweep', 'png');
new Busmall('bag');
new Busmall('banana');
new Busmall('bathroom');
new Busmall('boots');
new Busmall('breakfast');
new Busmall('bubblegum');
new Busmall('chair');
new Busmall('cthulhu');
new Busmall('dog-duck');
new Busmall('dragon');
new Busmall('pen');
new Busmall('pet-sweep');
new Busmall('scissors');
new Busmall('shark');
new Busmall('tauntaun');
new Busmall('unicorn');
new Busmall('water-can');
new Busmall('wine-glass');

//***********Helper functions/Executable code***********

function getRandomIndex() {
  return Math.floor(Math.random() * busmallItems.length);
}
function renderImgs() {

  let itemOneIndex = getRandomIndex();
  let itemTwoIndex = getRandomIndex();
  while (itemOneIndex === itemTwoIndex) {
    itemTwoIndex = getRandomIndex();
  }
  imgOne.src = busmallItems[itemOneIndex].photo;
  imgOne.alt = busmallItems[itemOneIndex].name;
  busmallItems[itemOneIndex].views++;

  imgTwo.src = busmallItems[itemTwoIndex].photo;
  imgTwo.alt = busmallItems[itemTwoIndex].name;
  busmallItems[itemTwoIndex].views++;

  imgThree.src = busmallItems[itemThreeIndex].photo;
  imgThree.alt = busmallItems[itemThreeIndex].name;
  busmallItems[itemThreeIndex].views++;
}

renderImgs();

//***********Event Handlers***********


//***********Event listeners***********
imgContainer.addEventListener('click', handleClick);
shwoResultsBtn.addEventListener('click', handleShowResult);