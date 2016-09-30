
window.game = window.game || {}
window.game.Timer =

// Usage
//
// let timer = new game.Timer()
// timer.limit(30).start(function () {
//     // invoked when passed 30 sec
// });
//
class Timer extends game.MonoBehavior {
  constructor(time_sec) {
    super();
    this.startTime;
    this.remainingTime;
    // this.limit(time_sec);
  }

  start() {
    //
  }

  update() {
    var elapsedTime = (new Date() - (this.startTime || new Date()));
    this.remainingTime = (this.limit * 1000 - elapsedTime) / 1000;
    if (this.remainingTime < 0) {
      this.remainingTime = 0;
    }
    this.showRemainingTime(this.remainingTime.toFixed(1));
  }

  limit(time_sec) {
    this.limit = time_sec;
    return this;
  }

  countdown(callback) {
    this.startTime = new Date();
    callback = callback || $.noop;
    setTimeout(callback, this.limit * 1000);
  }

  showTimer() {
    $('#timer').show();
  }

  showRemainingTime(time) {
    $('#remainingTime').text(time);
  }
}
