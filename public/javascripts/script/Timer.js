
window.game = window.game || {}
window.game.Timer =

// Usage
//
// let timer = new game.Timer()
// timer.limit(30).startTimer(function () {
//     // invoked when passed 30 sec
// });
//
class Timer extends game.MonoBehavior {
  constructor() {
    super();
    this.startTime;
    this.remainingTime;
  }

  start() {
    //
  }

  update() {
    var elapsedTime = (new Date() - (this.startTime || new Date()));
    this.remainingTime = (this.limit * 1000 - elapsedTime) / 1000;
    if (this.remainingTime < 0) {
      this.remainingTime = 0;
    } else if (this.remainingTime < 2) {
      this.highlightRed();
    } else if (this.remainingTime < 5) {
      this.highlightYellow();
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

  highlightRed() {
    $('#timer').css("fontSize","6em");
    $('#timer').css("color","red");
  }

  highlightYellow() {
    $('#timer').css("fontSize","6em");
    $('#timer').css("color","yellow");
  }
}
