
window.game = window.game || {}
window.game.Player =

class Player extends game.MonoBehavior {
    constructor() {
        super();
        this.gameScene = {};
        this.objects = {};
    }

    start() {
        // number of steps
        this.moveSteps = 0;

        // flags
        this.isMoving = false;
    }

    update() {
        if (!this.isMoving) return;
        if (this.gameScene.camera.position.z <= 200 - 200 * this.moveSteps) return this.isOpening = false;
        this.gameScene.camera.position.z -= 5;
    }

    moveForward() {
        this.isMoving = true;
        this.moveSteps++;
    }
}
