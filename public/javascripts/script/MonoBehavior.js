
//
// MonoBehavior -- all game objects behaviour is defined
//
// MonoBehavior is the base class which all game objects derives from.
//
// Usage:
//
//   class Player extends MonoBehavior {
//     constructor() {
//       super();
//     }
//
//     start() {
//       // invoked once before invoked update method
//       // ...
//     }
//
//     update() {
//       // invoked per frame
//       // ...
//     }
//   }
//
window.game = window.game || {}
window.game.MonoBehavior =

class MonoBehavior {
    constructor() {
        new game.Game().addListener('start', () => this.start());
        this._updateProcess = () => this.update();
        new game.Game().addListener('update', this._updateProcess);
    }

    setOn(gameScene) {
        this.gameScene = gameScene;
        return this;
    }

    start() {
        //
    }

    update() {
        //
    }

    destructor() {
        new game.Game().removeListener('update', this._updateProcess);
    }
}
