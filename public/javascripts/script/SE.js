window.game = window.game || {}
window.game.SE =

class SE extends game.MonoBehavior {
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

        // this.audioListener = new THREE.AudioListener();
        // this.gameScene.camera.add(this.audioListener);
        this.sound2 = new THREE.Audio(this.audioListener);
        this.gameScene.scene.add(this.sound2);
    }

    update() {
        //
    }

    playAudioOpenDoor() {
      //this.playAudio('se/open_door.mp3', false, 2);
      var title = 'se/open_door.mp3';
      var isLoop = false;
      var volume = 2;
      console.log(title);

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

    playAudioCloseDoor() {
      //this.playAudio('se/close_door.mp3', false, 2);
      var title = 'se/close_door.mp3';
      var isLoop = false;
      var volume = 2;
      console.log(title);

      this.soundLoader.load(
        title,
        function (audioBuffer) {
          this.sound2.buffer = null;
          this.sound2.setBuffer(audioBuffer);
          this.sound2.setLoop(isLoop);
          this.audioListener.setMasterVolume(volume);
          this.sound2.play();
        }.bind(this),
        function (xhr) {
          //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (xhr) {
          console.log('An error happened');
        }
      );
    }

    // playAudio(title, isLoop, volume) {
    //     console.log(title);
    //     this.soundLoader.load(
    //         title,
    //         function (audioBuffer) {
    //             this.sound.buffer = null;
    //             this.sound.setBuffer(audioBuffer);
    //             this.sound.setLoop(isLoop);
    //             this.audioListener.setMasterVolume(volume);
    //             this.sound.play();
    //         }.bind(this),
    //         function (xhr) {
    //             //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    //         },
    //         function (xhr) {
    //             console.log('An error happened');
    //         }
    //     );
    // }
}
