window.game = window.game || {}
window.game.AudioManager =

class AudioManager extends game.MonoBehavior {
    constructor() {
        super();
        this.gameScene = {};
        this.objects = {};

        this.soundLoader = new THREE.AudioLoader();
    }

    start() {
        // set audio
        this.audioListener = new THREE.AudioListener();
        this.gameScene.camera.add(this.audioListener);
        this.sound = new THREE.Audio(this.audioListener);
        this.gameScene.scene.add(this.sound);
    }

    update() {
        //
    }

    playAudio(title, isLoop, volume) {
        this.soundLoader.load(
            title,
            function (audioBuffer) {
                this.sound.buffer = null;
                this.sound.setBuffer(audioBuffer);
                this.sound.setLoop(isLoop);
                this.audioListener.setMasterVolume(volume);
                this.sound.play();
            }.bind(this),
            function (xhr) {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (xhr) {
                console.log('An error happened');
            }
        );
    }
}
