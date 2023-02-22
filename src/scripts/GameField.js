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
    gameFieldTag.addEventListener('click', (e) => {
      this.clickOnField(e);
    });
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
      //   this.findNeighbour();
      //   this.logField();
      this.drowField();
    }
  }

  /* eslint-disable class-methods-use-this */
  swapPuzzle(puzzle1, puzzle2) {
    console.log(puzzle1, puzzle2);
    let puz1Index = 0;
    let puz2Index = 0;
    for (let i = 0; i < this.size ** 2; i += 1) {
      if (this.gameField[i] === puzzle1) puz1Index = i;
      if (this.gameField[i] === puzzle2) puz2Index = i;
    }
    this.gameField.splice(puz1Index, 1, puzzle2);
    this.gameField.splice(puz2Index, 1, puzzle1);

    // this.gameField.forEach((elem, i) => {
    //   if (elem === puzzle1) {
    //     this.gameField.splice(i, 1, '0');
    //     console.log(this.gameField);
    //   } else if (elem === puzzle2) {
    //     this.gameField.splice(i, 1, `${puzzle2.value}`);
    //     console.log(this.gameField);
    //   }
    // });
    // this.gameField.sort((a, b) => a.index - b.index);
    // this.gameField.forEach((elem) => elem.setPosition());
    // const { index } = puzzle1;
    // const { value } = puzzle1;
    // /* eslint-disable no-param-reassign */
    // puzzle1.index = puzzle2.index;
    // puzzle1.value = puzzle2.value;
    // puzzle2.index = index;
    // puzzle2.value = value;
  }

  findNeighbour() {
    const [k1, k2] = this.findElem(0).position;
    // console.log(k1, k2);
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

  findElem(value = 0) {
    for (let i = 0; i < this.size ** 2; i += 1) {
      if (this.gameField[i].value === +value) {
        return this.gameField[i];
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
