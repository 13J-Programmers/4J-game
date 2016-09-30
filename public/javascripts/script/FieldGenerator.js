
// FieldGenerator's role is as follows:
// - Generate new door
// - Get current door
// - Open current door

window.game = window.game || {}
window.game.FieldGenerator =

class FieldGenerator extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};

    this.doors = [];
    this.maxDoorNum = 1000;
    this.doorCount = 0;
    this.stepCount = 0;
  }

  start() {
    //
  }

  update() {
    //
  }

  getDoor() {
    if (this.stepCount > this.doorCount) return false;
    return this.doors[this.stepCount];
  }

  generateDoor() {
    if (this.doorCount > this.maxDoorNum) return false;

    const distanceBetweenDoors = window.game.settings['dist-between-doors'];
    this.doors[this.doorCount] = new game.Door({
      // type: this._cycle([1,2,3,4,5,6,7,8,9,10,11,12,13]),
      type: this._getRandomInt(1, 13),
      position: new THREE.Vector3(0, 0, -(distanceBetweenDoors * this.doorCount))
    });
    this.doors[this.doorCount].setOn(this.gameScene);
    this.doorCount++;
  }

  openDoor(method) {
    if (this.stepCount > this.doorCount) return false;

    let currentDoor = this.getDoor();
    if (currentDoor.openSesame(method)) {
      this.stepCount++;
      return true;
    }
    return false;
  }

  // --- private ---

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _sample(array) {
    var index = this._getRandomInt(0, array.length - 1);
    return array[index];
  }

  _cycle(array) {
    // init
    if (this._cycle.index === undefined) this._cycle.index = 0;
    // cycle
    var retVal = array[this._cycle.index++];
    if (this._cycle.index >= array.length) this._cycle.index = 0;
    return retVal;
  }
}
