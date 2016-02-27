
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
