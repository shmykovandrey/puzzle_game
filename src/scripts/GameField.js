export default class GameField {
  constructor(size) {
    this.size = size;
    this.puzzle3Field = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].sort(
      () => Math.random() - 0.5,
    );
    this.generateField(size);
    this.logField();
    this.drowField();
  }

  generateField(size) {
    if (size === 3) {
      const arr = [];
      let subArr = [];
      for (let i = 0; i < size; i += 1) {
        subArr = [];
        for (let j = 0; j < size; j += 1) {
          subArr.push(this.puzzle3Field.pop());
        }
        arr.push(subArr);
      }
      this.gameField = arr;
    }
  }

  logField() {
    /* eslint-disable no-console */
    console.log(this.gameField);
  }

  drowField() {
    const gameFieldTag = document.querySelector('.game-field');
    gameFieldTag.innerHTML = '';
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        const divPuzzle = document.createElement('div');
        divPuzzle.classList.add('puzzle');
        if (this.gameField[i][j] !== '0') divPuzzle.innerText = this.gameField[i][j];
        else divPuzzle.classList.add('empty');
        gameFieldTag.appendChild(divPuzzle);
      }
    }
  }
}
