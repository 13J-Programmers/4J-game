
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
// let startScene = new game.StartScene().setOn(gameScene);

// set fieldGenerator
let fieldGenerator = new game.FieldGenerator().setOn(gameScene);
fieldGenerator.generateDoor();
fieldGenerator.generateDoor();

// set OrbitControls
// new game.OrbitControls().setOn(gameScene);

// init mainProcess
const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();

// game controller
game.KeyController.enable();
game.LeapController.enable();
