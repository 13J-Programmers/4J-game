
window.game = window.game || {}
window.game.MonoBehavior =

class MonoBehavior {
    constructor() {
        this.mainGaim = game.Game.instance;
        this.mainGaim.on('start', () => this.start());
        this.mainGaim.on('update', () => this.update());
    }

    start() {
        //
    }

    update() {
        //
    }
}
