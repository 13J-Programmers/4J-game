window.game = window.game || {}
window.game.BGM =

class BGM extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};
  }

  start() {
    // set bgm audio
    var audioListener = new THREE.AudioListener();
    this.gameScene.camera.add(audioListener);
    var sound = new THREE.Audio(audioListener);
    this.gameScene.scene.add(sound);
    var soundLoader = new THREE.AudioLoader();
    soundLoader.load(
      'bgm/track' + Math.floor(Math.random() * 11) + '.mp3',
      // 'bgm/s.mp3',
      function (audioBuffer) {
        sound.setBuffer(audioBuffer);
        sound.setLoop(true);
        sound.play();
      },
      function (xhr) {
        //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (xhr) {
        console.log('An error happened');
      }
    );
  }

  update() {
    //
  }
}
