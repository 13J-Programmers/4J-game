
window.game = window.game || {}
window.game.Player =

class Player extends game.MonoBehavior {
    constructor() {
        super();
        this.gameScene = {};
        this.objects = {};
    }

    start() {
        // steps count
        this.moveSteps = 0;
        // accelaration
        this.defaultAccelaration = 5; // per frame
        this.runningTime = 0;

        // flags
        this.isMoving = false;
    }

    update() {
        if (!this.isMoving) return this.runningTime = 0;
        if (this._isReachedInNextDoor()) return this.isMoving = false;

        // move forward
        this.runningTime++;
        let accelaration = this._calcAccelaration(this.runningTime);
        //console.log(accelaration);
        this.gameScene.camera.position.z -= accelaration;
    }

    moveForward() {
        this.isMoving = true;
        this.moveSteps++;
    }

    // --- private ---

    _isReachedInNextDoor() {
        let distanceBetweenDoors = 200;
        return (this.gameScene.camera.position.z <= -(this.moveSteps * distanceBetweenDoors) + 130);
    }

    _calcAccelaration(t) {
        return t * 0.01 + this.defaultAccelaration;
    }
}
