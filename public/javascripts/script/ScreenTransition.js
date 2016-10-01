
window.game = window.game || {}
window.game.ScreenTransition =

class ScreenTransition {
  static init() {
    ScreenTransition.leftPane = $('<div>')
      .attr('name', 'leftPane')
      .css({
        'z-index': '100',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        'background-color': '#231f20',
        'border-right': 'medium solid #999999'
      })
      .appendTo('body');
    ScreenTransition.rightPane = $('<div>')
      .attr('name', 'rightPane')
      .css({
        'z-index': '100',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        'background-color': '#231f20',
        'border-left': 'medium solid #999999'
      })
      .appendTo('body');
  }

  static openScreen() {
    var deferredLeft = ScreenTransition.leftPane.animate({
      left: '-100%'
    }, 2000).promise();

    var deferredRight = ScreenTransition.rightPane.animate({
      right: '-100%'
    }, 2000).promise();

    return {left: deferredLeft, right: deferredRight};
  }

  static closeScreen() {
    var deferredLeft = ScreenTransition.leftPane.animate({
      left: 0
    }, 2000).promise();

    var deferredRight = ScreenTransition.rightPane.animate({
      right: 0
    }, 2000).promise();

    return {left: deferredLeft, right: deferredRight};
  }
}
