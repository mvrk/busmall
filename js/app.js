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
  this.photo = `./img/${name}.${fileExtention}`;

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

// function getRandomIndex() {
//   return Math.floor(Math.random() * busmallItems.length);
// }
function renderImgs() {

  let showItemIndex = [];
  for (let i = 0; i < 3; i++) {
    let a = true, index;
    while (a) {
      index = Math.floor(Math.random() * busmallItems.length);
      a = showItemIndex.includes(index);
    }
    showItemIndex.push(index);
  }
  imgOne.src = busmallItems[showItemIndex[0]].photo;
  imgOne.alt = busmallItems[showItemIndex[0]].name;
  busmallItems[showItemIndex[0]].views++;

  imgTwo.src = busmallItems[showItemIndex[1]].photo;
  imgTwo.alt = busmallItems[showItemIndex[1]].name;
  busmallItems[showItemIndex[1]].views++;

  imgThree.src = busmallItems[showItemIndex[2]].photo;
  imgThree.alt = busmallItems[showItemIndex[2]].name;
  busmallItems[showItemIndex[2]].views++;
}
renderImgs();

//***********Event Handlers***********
function handleClick(event) {
  busmallCount--;
  let imgClicked = event.target.alt;

  for (let i = 0; i < busmallItems.length; i++) {
    if (imgClicked === busmallItems[i].name) {
      busmallItems[i].votes++;
    }
  }

  renderImgs();

  if (busmallCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResult() {
  if (busmallCount === 0) {
    for (let i = 0; i < busmallItems.length; i++) {
      let liElement = document.createElement('li');
      liElement.textContent = `${busmallItems[i].name} showed ${busmallItems[i].views} times and voted for ${busmallItems[i].votes}
times.`;
      resultsList.appendChild(liElement);
    }
  }
}
//***********Event listeners***********
imgContainer.addEventListener('click', handleClick);
shwoResultsBtn.addEventListener('click', handleShowResult);