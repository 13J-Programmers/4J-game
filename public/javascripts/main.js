
// init scene
const scene = new THREE.Scene();

// init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 200;

// init render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// init gameScene
const gameScene = new game.GameScene(scene, camera, renderer);

// new game.Player().setOn(gameScene);
let fstDoor =
new game.Door({ type: 0, pos: [0, 0, -0  ] }).setOn(gameScene);
new game.Door({ type: 1, pos: [0, 0, -200] }).setOn(gameScene);
new game.Door({ type: 2, pos: [0, 0, -400] }).setOn(gameScene);
new game.OrbitControls().setOn(gameScene);

document.addEventListener("keydown" , function (e) {
    var keyCode = e.keyCode;
    console.log(keyCode);
    fstDoor.openSesame();
});

const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();
