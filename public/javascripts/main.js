
// transition
// show screen => wait => open screen
var waitTime = (utils.getParameterByName('screen-wait-time'))
  ? utils.getParameterByName('screen-wait-time') * 1000
  : 1000; // 1sec
setTimeout(function () {
  game.ScreenTransition.openScreen();
}, waitTime);

// exit when ESC key pressed
var exit_invoked = false;
document.addEventListener("keydown", function (e) {
  if (e.keyCode !== 27 /* KEY_CODE_ESC */) return false;
  if (exit_invoked) return false;
  exit_invoked = true;

  var deferred = game.ScreenTransition.closeScreen();
  $.when(deferred.left, deferred.right).done(function () {
    location.reload();
  });
});

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

// set SE
let se = new game.SE().setOn(gameScene);
document.addEventListener('play-audio-footsteps',   function () { se.playAudioFootsteps() });
document.addEventListener('pause-audio-footsteps',  function () { se.pauseAudioFootsteps() });
document.addEventListener('play-audio-open-doors',  function () { se.playAudioOpenDoor() });
document.addEventListener('play-audio-close-doors', function () { se.playAudioCloseDoor() });

// set BGM
let bgm = new game.BGM().setOn(gameScene);

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
if (utils.getParameterByName('orbit') === 'true') {
  new game.OrbitControls().setOn(gameScene);
}

// set time limit
var timer = new game.Timer();
timer.limit(utils.getParameterByName('play-time') || 30);
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

// set combo counter
var comboCounter = new game.ComboCounter();

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
  document.dispatchEvent(new Event('pause-audio-footsteps'));
  resultScene.showResult({ score: game.score, maxCombo: game.maxCombo });
}
document.addEventListener('timer-finish', gameFinish);
