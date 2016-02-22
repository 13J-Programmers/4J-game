
window.game = window.game || {}
window.game.OrbitControls =

class OrbitControls extends game.MonoBehavior {
    constructor(gameScene) {
        super();
        this.gameScene = gameScene;
    }

    start() {
        this.orbitControls = new THREE.OrbitControls(this.gameScene.camera, this.gameScene.renderer.domElement);
    }

    update() {
        this.orbitControls.update();
    }
}
