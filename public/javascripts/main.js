
var getParameterByName = function(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// transition
// show screen => wait => open screen
var waitTime = (getParameterByName('screen-wait-time'))
  ? getParameterByName('screen-wait-time') * 1000
  : 2000; // 2sec
setTimeout(function () {
  game.ScreenTransition.openScreen();
}, waitTime);

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

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

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
if (getParameterByName('orbit') === 'true') {
  new game.OrbitControls().setOn(gameScene);
}

// set time limit
let timer = new game.Timer();
timer.limit(getParameterByName('play-time') || 30);
// show timer event
document.addEventListener('show-timer', function () {
  timer.showTimer();
});
// on timer-start => wait 30 sec => emit timer-finish
document.addEventListener('timer-start', function () {
  timer.countdown(function () {
    document.dispatchEvent(new Event('timer-finish'));
  });
});

// init mainProcess
const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();

// init score
game.score = 0;
// game controller
// emit game-start event when tutorial has done
document.addEventListener('game-start', function () {
  // (player) done tutorial

  game.KeyController.disable();
  game.LeapController.disable();

  // (player) start game

  game.KeyController.enable(detectUserInput);
  game.LeapController.enable(detectUserInput);

  // this function is invoked when controllers detect user inputs.
  function detectUserInput(method) {
    // argument +method+ -- type String is expected

    // Prevent from opening a door far from here.
    if (player.position.distanceTo(fieldGenerator.getDoor().position) > 500) return;

    if (fieldGenerator.openDoor(method)) {
      startTimer();
      game.score += 1;
      player.moveForward();
      fieldGenerator.generateDoor();
    }
  }
});

function startTimer() {
  if (startTimer.invoked) return;
  startTimer.invoked = true;
  // emit once
  document.dispatchEvent(new Event('timer-start'));
}

// set a result scene
let resultScene = new game.ResultScene().setOn(gameScene);

// (player) game finish
function gameFinish() {
  game.KeyController.disable();
  game.LeapController.disable();
  console.log("game finish!!");
  resultScene.showResult({ score: game.score });
}
document.addEventListener('timer-finish', gameFinish);


// set bgm audio
var audioListener = new THREE.AudioListener();
camera.add(audioListener);
var sound = new THREE.Audio(audioListener);
scene.add(sound);
var soundLoader = new THREE.AudioLoader();
soundLoader.load(
  'bgm/s.mp3',
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
