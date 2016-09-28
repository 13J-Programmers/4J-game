
window.game = window.game || {}
window.game.Time =

class Time extends game.MonoBehavior {
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
