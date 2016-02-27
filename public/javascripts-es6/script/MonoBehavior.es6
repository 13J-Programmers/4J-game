
window.game = window.game || {}
window.game.MonoBehavior =

class MonoBehavior {
    constructor() {
        new game.Game().on('start', () => this.start());
        this._updateProcess = () => this.update();
        new game.Game().on('update', this._updateProcess);
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
