
window.game = window.game || {}
window.game.ScreenTransition =

class ScreenTransition {
  static openScreen() {
    var leftPane = $('div[name=leftPane]');
    var rightPane = $('div[name=rightPane]');

    document.dispatchEvent(new Event('play-audio-open-doors'));

    var deferredLeft = leftPane.animate({
      left: '-100%'
    }, 2000).promise();

    var deferredRight = rightPane.animate({
      right: '-100%'
    }, 2000).promise();

    return {left: deferredLeft, right: deferredRight};
  }

  static closeScreen() {
    var leftPane = $('div[name=leftPane]');
    var rightPane = $('div[name=rightPane]');

    document.dispatchEvent(new Event('play-audio-close-doors'));

    var deferredLeft = leftPane.animate({
      left: 0
    }, 2000).promise();

    var deferredRight = rightPane.animate({
      right: 0
    }, 2000).promise();

    return {left: deferredLeft, right: deferredRight};
  }
}
