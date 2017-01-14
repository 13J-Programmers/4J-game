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

    this.sound2 = new THREE.Audio(this.audioListener);
    this.gameScene.scene.add(this.sound2);

    this.sound3 = new THREE.Audio(this.audioListener);
    this.gameScene.scene.add(this.sound3);
    this.loadAudioFootsteps();
  }

  update() {
    //
  }

  loadAudio(args, callback) {
    var audio  = args.audio;
    var file   = args.file;
    var isLoop = args.isLoop || false;
    var volume = args.volume || 1;

    this.soundLoader.load(
      file,
      function (audioBuffer) {
        audio.buffer = null;
        audio.setBuffer(audioBuffer);
        audio.setLoop(isLoop);
        this.audioListener.setMasterVolume(volume);
        //audio.play();
        callback();
      }.bind(this)
    );
  }

  playAudioOpenDoor() {
    var sound = this.sound;
    this.loadAudio({
      audio: sound,
      file: 'se/open_door.mp3',
      volume: 2
    }, function successed() {
      sound.play();
    });
  }

  playAudioCloseDoor() {
    var sound = this.sound2;
    this.loadAudio({
      audio: sound,
      file: 'se/close_door.mp3',
      volume: 2
    }, function successed() {
      sound.play();
    });
  }

  loadAudioFootsteps() {
    var sound = this.sound3;
    this.loadAudio({
      audio: sound,
      file: 'se/running_on_road.mp3',
      isLoop: true,
      volume: 0.3
    }, function successed() {
      sound.play();
    });
  }

  playAudioFootsteps() {
    if (!this.sound3.isPlaying) {
      //console.log("play footsteps");
      this.sound3.play();
    }
  }

  pauseAudioFootsteps() {
    if (this.sound3.isPlaying) {
      //console.log("pause footsteps");
      this.sound3.pause();
    }
  }
}
