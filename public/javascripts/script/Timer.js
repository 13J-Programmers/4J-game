
window.game = window.game || {}
window.game.Timer =

class Timer extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};

    this.startTime;
    this.elapseTime;
  }

  start() {
    this.startTime = new Date();
  }

  update() {
    this.elapseTime = (new Date() - this.startTime) >> 10;
    //console.log(this.elapseTime);
  }
}
