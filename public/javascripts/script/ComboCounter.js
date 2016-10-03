
window.game = window.game || {}
window.game.ComboCounter =

class ComboCounter extends game.MonoBehavior {
  constructor() {
    super();
  }

  start() {
    this.combo = 0;
    game.maxCombo = 0;

    document.addEventListener('break-combo', function () {
      this.resetCombo();
      this.showCombo();
    }.bind(this));

    document.addEventListener('continue-combo', function () {
      this.incrementCombo();
      this.showCombo();
    }.bind(this));
  }

  update() {
    this.showCombo();
  }

  resetCombo() {
    this.combo = 0;
  }

  incrementCombo() {
    this.combo += 1;
    if (this.combo >= game.maxCombo) {
      game.maxCombo = this.combo;
    }
  }

  showCombo() {
    $('#comboCounter').show();
    $('#combo').text(this.combo);
  }

  hideCombo() {
    $('#comboCounter').hide();
  }
}
