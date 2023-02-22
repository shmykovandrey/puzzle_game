export default class Puzzle {
  constructor(value, index, size) {
    this.fieldSize = size;
    this.index = index;
    this.value = value;
    this.isMoveble = false;
    this.setPosition();
  }

  setPosition() {
    this.position = [Math.floor(this.index / this.fieldSize), this.index % this.fieldSize];
  }

  loger() {
    /* eslint-disable no-console */
    console.log(this.position, this.value);
  }
}
