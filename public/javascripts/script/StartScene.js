
let fontLoader = new THREE.FontLoader();

window.game = window.game || {}
window.game.StartScene =

class StartScene extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};

    this.doors = {};
  }

  start() {
    let geometry, material;

    // put start scene background
    geometry = new THREE.BoxGeometry(500, 200, 0);
    material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
    this.objects.root = new THREE.Mesh(geometry, material);
    this.objects.root.position.z += 99;
    this.gameScene.scene.add(this.objects.root);
  }

  update() {
    //
  }

  showDoors() {
    // left
    this.doors.left = new game.Door({
      type: 2,
      position: new THREE.Vector3(-10, 0, 102),
      scale: 0.05,
      onlyDoor: true
    })
    .setOn(this.gameScene);

    // both-side
    this.doors.bothSide = new game.Door({
      type: 9,
      position: new THREE.Vector3(0, 0, 102),
      scale: 0.05,
      onlyDoor: true
    })
    .setOn(this.gameScene);

    // right
    this.doors.right = new game.Door({
      type: 1,
      position: new THREE.Vector3(10, 0, 102),
      scale: 0.05,
      onlyDoor: true
    })
    .setOn(this.gameScene);

    // switch
    this.doors['switch'] = new game.Door({
      type: 13,
      position: new THREE.Vector3(-10, -10, 102),
      scale: 0.05,
      onlyDoor: true
    })
    .setOn(this.gameScene);

    // up
    this.doors.up = new game.Door({
      type: 11,
      position: new THREE.Vector3(0, -10, 102),
      scale: 0.05,
      onlyDoor: true
    })
    .setOn(this.gameScene);

    // wheel
    this.doors.wheel = new game.Door({
      type: 12,
      position: new THREE.Vector3(10, -10, 102),
      scale: 0.05,
      onlyDoor: true
    })
    .setOn(this.gameScene);
  }

  openDoors(method) {
    for (var door in this.doors) {
      if (this.doors.hasOwnProperty(door)) {
        this.doors[door].openSesame(method);
      }
    }

    if (this.didOpenAllDoors()) {
      // hide tutorial
      setTimeout(function () {
        this.hideTitle();
        this.hideTutorial();
        timer.showTimer();
        document.dispatchEvent(new Event('game-start'));
      }.bind(this), 800);
    }
  }

  didOpenAllDoors() {
    for (var door in this.doors) {
      if (this.doors.hasOwnProperty(door)) {
        if (!this.doors[door].isOpened) return false;
      }
    }
    return true;
  }

  showTitle() {
    $('#titlePane').show();
  }

  hideTitle() {
    $('#titlePane').hide();
  }

  hideTutorial() {
    this.objects.root.visible = false;
    for (var door in this.doors) {
      if (this.doors.hasOwnProperty(door)) {
        this.doors[door].objects.root.visible = false;
      }
    }
  }
}
