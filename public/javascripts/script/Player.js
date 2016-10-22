
var getParameterByName = function(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

window.game = window.game || {}
window.game.Player =

class Player extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};
  }

  start() {
    this.position = this.gameScene.camera.position;

    // steps count
    this.moveSteps = 0;
    // accelaration
    this.defaultAccelaration = 4;
    this.accelaration = getParameterByName('a') || game.settings['player-accelaration'];
    this.maxSpeed = 8;
    this.runningTime = 0;

    // flags
    this.isMoving = false;
  }

  update() {
    if (!this.isMoving) {
      this.runningTime = 0;
      document.dispatchEvent(new Event('break-combo'));
      //se.pauseAudioFootsteps();
      return;
    }
    if (this._isReachedInNextDoor()) {
      this.isMoving = false;
      return;
    }

    // move forward
    this.runningTime++;
    let accelaration = (this._calcAccelaration(this.runningTime) <= this.maxSpeed) ? this._calcAccelaration(this.runningTime) : this.maxSpeed;
    // console.log(accelaration);
    this.gameScene.camera.position.z -= accelaration;
  }

  moveForward() {
    this.isMoving = true;
    this.moveSteps++;
    document.dispatchEvent(new Event('continue-combo'));
    //se.playAudioFootsteps();
  }

  // --- private ---

  _isReachedInNextDoor() {
    const distBetweenDoors  = game.settings['dist-between-doors'];
    const stopPosBeforeDoor = game.settings['stop-pos-before-door'];
    return (this.gameScene.camera.position.z <= -(this.moveSteps * distBetweenDoors) + stopPosBeforeDoor);
  }

  _calcAccelaration(t) {
    const slant = this.accelaration;
    return t * slant + this.defaultAccelaration;
  }
}
