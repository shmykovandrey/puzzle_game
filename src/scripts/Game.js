import GameField from './GameField';

export default class Game {
  constructor(size = 3) {
    this.time = 0;
    this.turn = 0;
    this.size = size;
    this.setGameType();
    this.updateTimer();
    this.startDrowClickNumber();
  }

  generateGameField() {
    this.game = new GameField(this.size);
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      this.time += 1;
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    const timer = document.querySelector('.timer');
    timer.textContent = `Time: ${this.time} sec`;
  }

  drowClickNumber() {
    const clickNumberField = document.querySelector('.clickNumber');
    clickNumberField.textContent = `Move: ${this.game.clickNumber}`;
  }

  startDrowClickNumber() {
    setInterval(() => {
      this.drowClickNumber();
    }, 100);
  }

  setGameType() {
    const setTimeTag = document.querySelector('.game-title');
    setTimeTag.textContent = `Game Type ${this.size}x${this.size}`;
    const selectGameType = document.querySelector('.game__type');
    selectGameType.addEventListener('click', (e) => {
      Game.gameSelection(e);
    });
  }
  /* eslint-disable no-console */

  static gameSelection(event) {
    if (event.target.textContent[0] === '3') {
      console.log('3');
    }
    if (event.target.textContent[0] === '4') {
      console.log('4');
    }
    if (event.target.textContent[0] === '5') {
      console.log('5');
    }
  }
}
