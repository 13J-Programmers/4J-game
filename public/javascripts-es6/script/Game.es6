
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

        setScene(gameScene) {
            this.gameScene = gameScene;
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
})();
