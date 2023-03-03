import Puzzle from './Puzzle';

export default class GameField {
  constructor(size) {
    this.size = size;
    this.clickNumber = 0;

    this.generateField();
    this.findNeighbour();
    this.drowField();
  }

  mixedData() {
    let res = [];
    if (this.size === 3) res = [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
    /* eslint-disable max-len */
    if (this.size === 4) res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(() => Math.random() - 0.5);
    if (this.size === 5) {
      res = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      ].sort(() => Math.random() - 0.5);
    }
    res.push(0);
    return res.reverse();
  }

  generateField() {
    // const gameFieldTag = document.querySelector('.game-field');
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
    gameFieldTag.classList = 'game-field';
    gameFieldTag.classList.add(`game-size__${this.size}`);
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

  clickOnField(event) {
    if (event.target.classList.value.split(' ').indexOf('canMove') !== -1) {
      /* eslint-disable no-console */
      this.clickNumber += 1;
      const nullElem = this.findElem(0);
      const targetElem = this.findElem(event.target.textContent);
      console.log(this.gameField);
      this.swapPuzzle(nullElem, targetElem);
      this.findNeighbour();
      //   this.logField();
      this.drowField();
    }
  }

  /* eslint-disable class-methods-use-this */
  swapPuzzle(puzzle1, puzzle2) {
    console.log(puzzle1, puzzle2);

    const innerPuzzleIndex = puzzle1.index;
    /* eslint-disable no-param-reassign */
    puzzle1.index = puzzle2.index;
    /* eslint-disable no-param-reassign */
    puzzle2.index = innerPuzzleIndex;

    let puz1Index = 0;
    let puz2Index = 0;
    for (let i = 0; i < this.size ** 2; i += 1) {
      if (this.gameField[i] === puzzle1) puz1Index = i;
      if (this.gameField[i] === puzzle2) puz2Index = i;
    }
    this.gameField.splice(puz1Index, 1, puzzle2);
    this.gameField.splice(puz2Index, 1, puzzle1);
    this.reCalcIndexes();
  }

  findNeighbour() {
    const [k1, k2] = this.findElem(0).position;
    /* eslint-disable no-return-assign */
    this.gameField.forEach((elem) => (elem.isMoveble = false));
    /* eslint-disable no-console */
    if (k1 === 0) {
      this.changeMoveble(k1 + 1, k2);
    }
    if (k1 === this.size - 1) {
      this.changeMoveble(k1 - 1, k2);
    }
    if (k1 !== 0 && k1 !== this.size - 1) {
      this.changeMoveble(k1 - 1, k2);
      this.changeMoveble(k1 + 1, k2);
    }
    if (k2 === 0) {
      this.changeMoveble(k1, k2 + 1);
    }
    if (k2 === this.size - 1) {
      this.changeMoveble(k1, k2 - 1);
    }
    if (k2 !== 0 && k2 !== this.size - 1) {
      this.changeMoveble(k1, k2 - 1);
      this.changeMoveble(k1, k2 + 1);
    }
  }

  reCalcIndexes() {
    this.gameField.forEach((elem) => elem.setPosition());
  }

  changeMoveble(k1, k2) {
    for (let i = 0; i < this.size ** 2; i += 1) {
      const [pos1, pos2] = this.gameField[i].position;
      if (pos1 === k1 && pos2 === k2) {
        this.gameField[i].isMoveble = true;
      }
    }
  }

  findElem(value = 0) {
    for (let i = 0; i < this.size ** 2; i += 1) {
      if (this.gameField[i].value === +value) {
        return this.gameField[i];
      }
    }
    return null;
  }
}
