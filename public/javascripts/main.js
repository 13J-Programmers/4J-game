
// init scene
const scene = new THREE.Scene();

// init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.lookAt(new THREE.Vector3(0, 0, -10000));
camera.position.z = window.game.settings['stop-pos-before-door'];

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

let fieldGenerator = new game.FieldGenerator().setOn(gameScene);
fieldGenerator.generateDoor();
fieldGenerator.generateDoor();

// set OrbitControls
//new game.OrbitControls().setOn(gameScene);

document.addEventListener("keydown" , function (e) {
    var keyCode = e.keyCode;
    var method;

    switch (keyCode) {
        case 37: /* KEY_CODE_LEFT  */ method = "left";      break;
        case 38: /* KEY_CODE_UP    */ method = "up";        break;
        case 39: /* KEY_CODE_RIGHT */ method = "right";     break;
        case 40: /* KEY_CODE_DOWN  */ method = "down";      break;
        case 66: /* KEY_CODE_B     */ method = "both-side"; break;
        default: method = "";
    }

    // Prevent from opening a door far from here.
    if (player.position.distanceTo(fieldGenerator.getDoor().position) > 500) return;

    if (fieldGenerator.openDoor(method)) {
        player.moveForward();
        fieldGenerator.generateDoor();
    }
});

// init mainProcess
const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();
