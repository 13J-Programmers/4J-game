
// Singleton
var instance = null;

window.game = window.game || {};
window.game.Game =

class Game extends EventEmitter {
    constructor() {
        super();
    }

    setScene(gameScene) {
        this.gameScene = gameScene;
    }

    static get instance() {
        if (!instance) {
            instance = new Game();
        }
        return instance;
    }

    start() {
        this.emit('start');
        this.render();
    }

    // rendering
    render() {
        this.emit('update');

        requestAnimationFrame(() => this.render()); // continually invoke this
        this.gameScene.renderer.render(this.gameScene.scene, this.gameScene.camera); // render scene
    }
}
