
window.game = window.game || {}
window.game.ResultScene =

class ResultScene extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};
  }

  start() {
    this.showResultTime = utils.getParameterByName('show-result-time') || 10;
  }

  update() {
    //
  }

  // show result => wait => close screen => transition (next game)
  showResult(args) {
    var score = args.score || 0;
    var maxCombo = args.maxCombo || 0;
    $('#doorNum').text(score);
    $('#maxCombo').text(maxCombo);
    $('#score').text(score * maxCombo);
    $('#result').css('top', '-100%');
    $('#result').show();
    $('#result').animate({'top': '0'}, 2000);

    setTimeout(function () {
      var deferred = game.ScreenTransition.closeScreen();
      $.when(deferred.left, deferred.right).done(function () {
        location.reload();
      });
    }, this.showResultTime * 1000); // wait 10sec and reload
  }
}
