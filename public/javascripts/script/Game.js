
//
// Game -- game process manager
//
// Usage:
//
//   const mainProcess = new game.Game();
//   mainProcess.set(new game.GameScene(...));
//   mainProcess.start();
//

(() => {
    // Singleton
    var _instance;

    window.game = window.game || {};
    window.game.Game =

    class Game extends EventEmitter {
        constructor() {
            super();

            if (typeof Game.instance === 'object') {
                return Game.instance;
            }
            Game.instance = this;
            return Game.instance;
        }

        static get instance() {
            return _instance;
        }

        static set instance(newInstance) {
            _instance = newInstance;
        }

        set(gameScene) {
            this.gameScene = gameScene;
        }

        start() {
            this.emit('start');
            this.render();
        }

        // rendering
        render() {
            this.emit('update');

            // continually invoke this
            requestAnimationFrame(() => this.render());
            // render scene
            this.gameScene.renderer.render(
                this.gameScene.scene,
                this.gameScene.camera
            );
        }
    }
})();
