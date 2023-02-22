import Puzzle from './Puzzle';

export default class GameField {
  constructor(size) {
    this.size = size;
    this.generateField();
    this.findNeighbour();
    this.logField();
    this.drowField();
  }

  mixedData() {
    let res = [];
    if (this.size === 3) res = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
    return res;
  }

  generateField() {
    const arr = [];
    const puzzle3Field = this.mixedData();
    for (let i = 0; i < this.size ** 2; i += 1) {
      const newPuzzle = new Puzzle(puzzle3Field.pop(), i, this.size);
      arr.push(newPuzzle);
    }
    this.gameField = arr;
  }

  drowField() {
    const gameFieldTag = document.querySelector('.game-field');
    gameFieldTag.innerHTML = '';
    for (let i = 0; i < this.size ** 2; i += 1) {
      const divPuzzle = document.createElement('div');
      divPuzzle.classList.add('puzzle');
      if (this.gameField[i].value === 0) divPuzzle.classList.add('empty');
      if (this.gameField[i].isMoveble) divPuzzle.classList.add('canMove');
      divPuzzle.innerHTML = this.gameField[i].value;
      gameFieldTag.appendChild(divPuzzle);
    }
  }

  findNeighbour() {
    const [k1, k2] = this.findNullIndex();

    if (k1 === 0) {
      this.changeMoveble(k1 + 1, k2);
    }
    if (k1 === 1) {
      this.changeMoveble(k1 - 1, k2);
      this.changeMoveble(k1 + 1, k2);
    }
    if (k1 === 2) {
      this.changeMoveble(k1 - 1, k2);
    }
    if (k2 === 0) {
      this.changeMoveble(k1, k2 + 1);
    }
    if (k2 === 1) {
      this.changeMoveble(k1, k2 - 1);
      this.changeMoveble(k1, k2 + 1);
    }
    if (k2 === 2) {
      this.changeMoveble(k1, k2 - 1);
    }
  }

  changeMoveble(k1, k2) {
    for (let i = 0; i < this.size ** 2; i += 1) {
      const [pos1, pos2] = this.gameField[i].position;
      if (pos1 === k1 && pos2 === k2) {
        this.gameField[i].isMoveble = true;
      }
    }
  }

  findNullIndex() {
    for (let i = 0; i < this.size ** 2; i += 1) {
      if (this.gameField[i].value === 0) {
        const [k1, k2] = this.gameField[i].position;
        return [k1, k2];
      }
    }
    return null;
  }

  logField() {
    /* eslint-disable no-console */
    console.log(this.gameField);
    /* eslint-enable no-console */
  }
}
