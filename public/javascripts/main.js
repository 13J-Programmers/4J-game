
// Utils

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// init scene
const scene = new THREE.Scene();

// init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 200;

// init render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// hierarchy
//
//     mainProcess
//     └── gameScene
//         ├── new game.Door()
//         └── new game.OrbitControls()
//

// init gameScene
const gameScene = new game.GameScene(scene, camera, renderer);

//new game.Player().setOn(gameScene);

let doors = [];
const maxDoorNum = 10;
for (var i = 0; i < maxDoorNum; i++) {
    doors[i] = new game.Door({ type: getRandomInt(0, 1), pos: [0, 0, -200 * i] }).setOn(gameScene);
}
let currentDoor = doors.shift();

new game.OrbitControls().setOn(gameScene);

document.addEventListener("keydown" , function (e) {
    var keyCode = e.keyCode;
    console.log(keyCode);
    currentDoor.openSesame();
    currentDoor = doors.shift();
});

const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();
