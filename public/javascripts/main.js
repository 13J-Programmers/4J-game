
// Utils

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// init scene
const scene = new THREE.Scene();

// init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.lookAt(new THREE.Vector3(0, 0, -10000));
camera.position.z = 100;

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
//         └──  new game.Door()
//

// init gameScene
const gameScene = new game.GameScene(scene, camera, renderer);

// set player
let player = new game.Player().setOn(gameScene);

// set doors
let doors = [];
const maxDoorNum = 100;
const distanceBetweenDoors = window.game.settings['dist-between-doors'];

for (var i = 0; i < maxDoorNum; i++) {
    doors[i] = new game.Door({ type: getRandomInt(1, 3), pos: [0, 0, -(distanceBetweenDoors * i)] });
    doors[i].setOn(gameScene);
}
let currentDoor = doors.shift();

// set OrbitControls
//new game.OrbitControls().setOn(gameScene);

const KEY_CODE_LEFT  = 37;
const KEY_CODE_UP    = 38;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_DOWN  = 40;
const KEY_CODE_B     = 66;

document.addEventListener("keydown" , function (e) {
    var keyCode = e.keyCode;
    var method;

    switch (keyCode) {
        case KEY_CODE_LEFT : method = "left";  break;
        case KEY_CODE_UP   : method = "up";    break;
        case KEY_CODE_RIGHT: method = "right"; break;
        case KEY_CODE_DOWN : method = "down";  break;
        case KEY_CODE_B    : method = "both-side"; break;
        default: method = "";
    }

    if (currentDoor.openSesame(method)) {
        currentDoor = doors.shift();
        player.moveForward();
    }
});

// init mainProcess
const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();
