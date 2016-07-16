
window.game = window.game || {}
window.game.Player =

class Player extends game.MonoBehavior {
    constructor() {
        super();
        this.gameScene = {};
        this.objects = {};
    }

    start() {
        this.position = this.gameScene.camera.position;

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
        const distBetweenDoors  = window.game.settings['dist-between-doors'];
        const stopPosBeforeDoor = window.game.settings['stop-pos-before-door'];
        return (this.gameScene.camera.position.z <= -(this.moveSteps * distBetweenDoors) + stopPosBeforeDoor);
    }

    _calcAccelaration(t) {
        const slant = window.game.settings['player-accelaration'];
        return t * slant + this.defaultAccelaration;
    }
}
