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

// ********** CANVAS REFERENCE ***************
let ctx = document.getElementById('my-chart').getContext('2d');

//***********Constructor***********
function Busmall(name, fileExtention = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `./img/${name}.${fileExtention}`;

  busmallItems.push(this);
}

//*************local storage part 2 */

//step 3: geit it out of the local storage

let retrivedItems = localStorage.getItem('busmallItems');

// Parse data for reuse

let parsedItems = JSON.parse(retrivedItems);
console.log('Parsed >>>>', parsedItems);

if (retrivedItems) {
  busmallItems = parsedItems;
}
else {
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
}
//***********Helper functions/Executable code***********

function renderImgs() {

  let showItemIndex = [];
  for (let i = 0; i < 6; i++) {
    let a = true, index;
    while (a) {
      index = Math.floor(Math.random() * busmallItems.length);
      a = showItemIndex.includes(index);
    }
    showItemIndex.push(index);
  }

  let indexOne = showItemIndex.shift();
  let indexTwo = showItemIndex.shift();
  let indexThree = showItemIndex.shift();
  imgOne.src = busmallItems[indexOne].photo;
  imgOne.alt = busmallItems[indexOne].name;
  busmallItems[indexOne].views++;

  imgTwo.src = busmallItems[indexTwo].photo;
  imgTwo.alt = busmallItems[indexTwo].name;
  busmallItems[indexTwo].views++;

  imgThree.src = busmallItems[indexThree].photo;
  imgThree.alt = busmallItems[indexThree].name;
  busmallItems[indexThree].views++;

}
renderImgs();

//********Chart render function*********** 
function renderChart() {
  let busmallNames = [];
  let busmallVotes = [];
  let busmallViews = [];

  for (let i = 0; i < busmallItems.length; i++) {
    busmallNames.push(busmallItems[i].name);
    busmallVotes.push(busmallItems[i].votes);
    busmallViews.push(busmallItems[i].views);
  }
  let myChartObj = {
    type: 'bar',
    data: {
      labels: busmallNames,
      datasets: [{
        label: '# of Votes',
        data: busmallVotes,
        backgroundColor: [
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderColor: [
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: busmallViews,
        backgroundColor: [
          '#ff0000',
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderColor: [
          '#ff0000',
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, myChartObj);
}
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
    // renderChart();
  }

  // ******** LOCAL STORAGE PART 1 ************

  // STEP 1: STRINGIFY DATA
  let stringifieItems = JSON.stringify(busmallItems);

  console.log(stringifieItems);

  // STEP 2: ADD TO LOCAL STORAGE
  localStorage.setItem('busmallItems', stringifieItems);

}

function handleShowResult() {
  let chart = document.getElementById('chart-container');
  chart.hidden = false;
  if (busmallCount === 0) {
    renderChart();
    //     for (let i = 0; i < busmallItems.length; i++) {
    //       let liElement = document.createElement('li');
    //       liElement.textContent = `${busmallItems[i].name} showed ${busmallItems[i].views} times and voted for ${busmallItems[i].votes}
    // times.`;
    //       resultsList.appendChild(liElement);
    //     }
  }
}
//***********Event listeners***********
imgContainer.addEventListener('click', handleClick);
shwoResultsBtn.addEventListener('click', handleShowResult);