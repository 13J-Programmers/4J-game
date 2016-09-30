window.game = window.game || {}
window.game.ResultScene =

class ResultScene extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};
  }

  start() {
    //
  }

  update() {
    //
  }

  showResult(args) {
    var score = args.score || 0;
    $('#doorNum').text(score);
    $('#result').css('top', '-100%');
    $('#result').show();
    $('#result').animate({'top': '0'}, 2000);

    setTimeout(function () {
      location.reload();
    }, 7 * 1000); // wait 7sec and reload
  }
}
