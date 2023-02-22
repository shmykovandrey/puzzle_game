import GameField from './GameField';

export default class Game {
  constructor(size = 3) {
    this.time = 0;
    this.turn = 0;
    this.size = size;
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
}
