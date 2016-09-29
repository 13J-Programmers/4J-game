
window.game = window.game || {}
window.game.Timer =

// Usage
//
// let timer = new game.Timer()
// timer.limit(30).start(function () {
//     // invoked when passed 30 sec
// });
//
class Timer {
  constructor(time_sec) {
    this.startTime;
  }

  limit(time_sec) {
    this.limit = time_sec;
    return this;
  }

  start(callback) {
    this.startTime = new Date();
    callback = callback || $.noop;
    setTimeout(callback, this.limit * 1000);
  }
}
