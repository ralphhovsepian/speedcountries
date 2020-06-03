import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css';
import regeneratorRuntime, { keys } from 'regenerator-runtime';

const input = document.getElementById('answer');
const startBtn = document.getElementById('startgame');
const gameDiv = document.getElementById('game');
const flagImg = document.getElementById('flag');
const scoreNumber = document.getElementById('scorenumber');
const timeSpan = document.getElementById('timeseconds');
const mainpage = document.getElementById('mainpage');

let number = 0;
let usedNumbers = [];
let score = 0;
let timeLeft = 20;

//generates unique number
const generateNumber = () => {
  number = Math.floor(Math.random() * Math.floor(250));
  while (usedNumbers.includes(number)) {
    number++;
  }
  usedNumbers.push(number);
};

//generate next unique number
const next = () => {
  generateNumber();
};

//gets countries information
async function getCountry() {
  const response = await fetch(`https://restcountries.eu/rest/v2/all`);
  const data = await response.json();
  return data;
}

//check input answer and real answer
const checkAnswer = (data) => {
  if (event.keyCode == '13') {
    if (data[number].name === input.value) {
      console.log('correct');
      score += 10;
      scoreNumber.innerHTML = score;
      nextGame();
    } else {
      console.log('wrong');
    }
    input.value = '';
  }
};

//next question
const nextGame = () => {
  //timer
  let timer = setInterval(function () {
    if (timeLeft <= 0) {
      timeSpan.innerHTML = 'Time is up';
      endGame();
    } else {
      timeSpan.innerHTML = timeLeft;
      timeLeft -= 1;
    }
  }, 2000);

  //generate new question and checks answer
  generateNumber();
  getCountry().then((data) => {
    flagImg.src = data[number].flag;
    input.addEventListener('keydown', () => {
      checkAnswer(data);
    });
  });
};

//start game
const startGame = () => {
  timeLeft = 20;
  let timer = setInterval(function () {
    if (timeLeft <= 0) {
      timeSpan.innerHTML = 'Time is up';
      endGame();
    } else {
      timeSpan.innerHTML = timeLeft;
      timeLeft -= 1;
    }
  }, 2000);

  generateNumber();
  getCountry().then((data) => {
    flagImg.src = data[number].flag;
    input.addEventListener('keydown', () => {
      checkAnswer(data);
    });
  });
};

//end game
const endGame = () => {
  location.reload();
};

//starting the game when start button clicked
startBtn.addEventListener('click', () => {
  gameDiv.className = 'd-flex flex-column';
  mainpage.style.display = 'none';
  startGame();
});
