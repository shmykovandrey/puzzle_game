import GameField from './GameField';

export default class Game {
  constructor() {
    this.time = 0;
    this.turn = 0;
    this.size = 4;
    this.setGameSelectClick();
  }

  startGame() {
    this.setGameTypeTitle();
    this.startTimer();
    this.startDrowClickNumber();
    this.generateGameField();
  }

  generateGameField() {
    this.gameField = new GameField(this.size);
  }

  startTimer() {
    this.updateTimer();
    this.timerIntervalId = setInterval(() => {
      this.updateTimer();
      this.time += 1;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerIntervalId);
  }

  updateTimer() {
    const timer = document.querySelector('.timer');
    timer.textContent = `Time: ${this.time} sec`;
  }

  drowClickNumber() {
    const clickNumberField = document.querySelector('.clickNumber');
    clickNumberField.textContent = `Move: ${this.turn}`;
  }

  startDrowClickNumber() {
    setInterval(() => {
      this.drowClickNumber();
    }, 100);
  }

  setGameTypeTitle() {
    const setTimeTag = document.querySelector('.game-title');
    setTimeTag.textContent = `Game Type ${this.size}x${this.size}`;
  }

  setGameSelectClick() {
    const gameTypeTag = document.querySelector('.game__type');
    gameTypeTag.addEventListener('click', this.selectGameType.bind(this));
  }

  gameReload(size) {
    this.size = size;
    this.stopTimer();
    this.time = 0;
    this.turn = 0;
    this.startGame();
  }

  selectGameType(event) {
    if (event.target.textContent[0] === '3') {
      this.gameReload(3);
    }
    if (event.target.textContent[0] === '4') {
      this.gameReload(4);
    }
    if (event.target.textContent[0] === '5') {
      this.gameReload(5);
    }
  }
}
