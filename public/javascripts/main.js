
// Utils

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// init scene
const scene = new THREE.Scene();

// init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.lookAt(new THREE.Vector3(0, 0, -10000));
camera.position.z = 200;

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
//     ├── new game.Door()
//     ├── new game.Door()
//     ├──  :
//     ├── new game.Door()
//     └── new game.OrbitControls()
//

// init gameScene
const gameScene = new game.GameScene(scene, camera, renderer);

// set player
let player = new game.Player().setOn(gameScene);

// set doors
let doors = [];
const maxDoorNum = 10;
for (var i = 0; i < maxDoorNum; i++) {
    doors[i] = new game.Door({ type: getRandomInt(0, 2), pos: [0, 0, -200 * i] });
    doors[i].setOn(gameScene);
}
let currentDoor = doors.shift();

// set OrbitControls
//new game.OrbitControls().setOn(gameScene);

document.addEventListener("keydown" , function (e) {
    var keyCode = e.keyCode;
    console.log(keyCode);
    currentDoor.openSesame();
    currentDoor = doors.shift();
    player.moveForward();
});

// init mainProcess
const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();
