
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

// --- input from Keyboard ---

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

// --- input from LeapMotion ---

function isLeftHandMoveLeft(leftHand) {
    if (!leftHand || !leftHand.valid) return false;
    if (leftHand.type !== "left") return false;
    return (leftHand.palmPosition[0] < -100 && leftHand.palmVelocity[0] < -200);
}
function isRightHandMoveRight(rightHand) {
    if (!rightHand || !rightHand.valid) return false;
    if (rightHand.type !== "right") return false;
    return (rightHand.palmPosition[0] > 100 && rightHand.palmVelocity[0] > 200);
}

var controller = new Leap.Controller({enableGestures: true})
    .use('screenPosition')
    .connect()
    .on('frame', function(frame) {
        let hand      = frame.hands[0];
        let otherHand = frame.hands[1];
        if (!hand) return;
        let leftHand  = (hand.type === "left")  ? hand: otherHand;
        let rightHand = (hand.type === "right") ? hand: otherHand;

        let method = ""
        if (isLeftHandMoveLeft(leftHand)) {
            method = "left";
        } else if (isRightHandMoveRight(rightHand)) {
            method = "right";
        }
        if (isLeftHandMoveLeft(leftHand) && isRightHandMoveRight(rightHand)) {
            method = "both-side"
        }
        if (method) console.log(method);

        // Prevent from opening a door far from here.
        if (player.position.distanceTo(fieldGenerator.getDoor().position) > 500) return true;

        if (fieldGenerator.openDoor(method)) {
            player.moveForward();
            fieldGenerator.generateDoor();
        }
    });


// init mainProcess
const mainProcess = new game.Game();
mainProcess.set(gameScene);
mainProcess.start();
