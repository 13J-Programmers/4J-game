
window.game = window.game || {}
window.game.MonoBehavior =

class MonoBehavior {
    constructor() {
        this._mainGaim = game.Game.instance;
        this._mainGaim.on('start', () => this.start());
        this._updateProcess = () => this.update();
        this._mainGaim.on('update', this._updateProcess);
    }

    start() {
        //
    }

    update() {
        //
    }

    destructor() {
        this._mainGaim.removeListener('update', this._updateProcess);
    }
}
