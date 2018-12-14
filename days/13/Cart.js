module.exports = class Cart {
  static get turns() {
    return ['left', 'straight', 'right'];
  }

  static get directions() {
    return ['left', 'up', 'right', 'down'];
  }

  /**
   * @param {Point} location
   */
  constructor(location, direction) {
    this.turnIndex = 0;
    this.directionIndex = Cart.directions.indexOf(direction);
    this.location = location;
    this.deleted = false;
  }

  get nextTurn() {
    return Cart.turns[(this.turnIndex + 1) % 3];
  }

  turn(direction) {
    // eslint-disable-next-line
    const turn = direction || Cart.turns[this.turnIndex++ % 3];
    switch (turn) {
      case 'left':
        this.directionIndex += 3;
        break;
      case 'right':
        this.directionIndex += 1;
        break;
      default: break;
    }
    return turn;
  }

  get direction() {
    return Cart.directions[this.directionIndex % 4];
  }

  move() {
    switch (this.direction) {
      case 'left':
        this.location.x -= 1;
        break;
      case 'right':
        this.location.x += 1;
        break;
      case 'up':
        this.location.y -= 1;
        break;
      case 'down':
        this.location.y += 1;
        break;
      default: break;
    }
    return this.location;
  }

  toString() {
    return `${this.location} ${this.directionIndex}: ${this.direction}`;
  }
};
