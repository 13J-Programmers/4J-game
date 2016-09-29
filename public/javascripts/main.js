
// init scene
const scene = new THREE.Scene();

// init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.lookAt(new THREE.Vector3(0, 0, -10000));
camera.position.z = game.settings['stop-pos-before-door'];

// init render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// hierarchy
//
// mainProcess
// └── gameScene
//     ├── camera
//     ├── renderer
//     └── scene
//         ├── new game.Player()
//         ├── new game.Door()
//         ├── new game.Door()
//         ├──  :
//         └── new game.Door()
//

// init gameScene
const gameScene = new game.GameScene(scene, camera, renderer);

// set player
let player = new game.Player().setOn(gameScene);

// set a start scene
let startScene = new game.StartScene().setOn(gameScene);
startScene.showDoors();
game.KeyController.enable(detectUserInput);
game.LeapController.enable(detectUserInput);

// this function is invoked when controllers detect user inputs.
function detectUserInput(method) {
  startScene.openDoors(method);
}


// set fieldGenerator
let fieldGenerator = new game.FieldGenerator().setOn(gameScene);
fieldGenerator.generateDoor();
fieldGenerator.generateDoor();

// set OrbitControls
// new game.OrbitControls().setOn(gameScene);

// set time limit
let timer = new game.Time().setOn(gameScene);

// init mainProcess
const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();

// game controller
// emit game-start event when tutorial has done
document.addEventListener('game-start', function () {
  console.log("done tutorial!!");

  game.KeyController.disable();
  game.LeapController.disable();

  game.KeyController.enable(detectUserInput);
  game.LeapController.enable(detectUserInput);

  // this function is invoked when controllers detect user inputs.
  function detectUserInput(method) {
    // argument +method+ -- type String is expected

    // Prevent from opening a door far from here.
    if (player.position.distanceTo(fieldGenerator.getDoor().position) > 500) return;

    if (fieldGenerator.openDoor(method)) {
      player.moveForward();
      fieldGenerator.generateDoor();
    }
  }
});

var audioListener = new THREE.AudioListener();
camera.add(audioListener);
var sound = new THREE.Audio(audioListener);
scene.add(sound);
var soundLoader = new THREE.AudioLoader();
soundLoader.load(
    '../bgm/s.mp3',
    function (audioBuffer) {
        sound.setBuffer(audioBuffer);
        sound.play();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (xhr) {
        console.log('An error happened');
    }
);
