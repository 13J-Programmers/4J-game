
let fontLoader = new THREE.FontLoader();

window.game = window.game || {}
window.game.StartScene =

class StartScene extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};

    this.doors = {};
    this.isSlideDown = false;
  }

  start() {
    let geometry, material;

    // put start scene background
    geometry = new THREE.BoxGeometry(100, 50, 0);
    material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
    this.objects.root = new THREE.Mesh(geometry, material);
    this.objects.root.position.z += 100;
    this.gameScene.scene.add(this.objects.root);

    // put cover for up door
    geometry = new THREE.BoxGeometry(10, 8, 0);
    material = new THREE.MeshBasicMaterial({ color: 0x231f20 /*color: 0x999999*/ });
    this.objects.upDoorCover = new THREE.Mesh(geometry, material);
    this.objects.upDoorCover.position.z += 1.5;
    this.objects.root.add(this.objects.upDoorCover);
  }

  update() {
    if (!this.isSlideDown) return false;

    // slide down
    this.objects.root.position.y -= 1;
    for (var door in this.doors) {
      if (this.doors.hasOwnProperty(door)) {
        this.doors[door].objects.root.position.y -= 1;
      }
    }

    if (this.objects.root.position.y < -300) {
      this.isSlideDown = false;
    }
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
      position: new THREE.Vector3(0, -10, 101),
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
        document.dispatchEvent(new Event('show-timer'));
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
    $('#titlePane').animate({ top: '-100%' }, 2000).promise()
      .done(function () {
        $('#titlePane').hide();
      })
  }

  hideTutorial() {
    this.isSlideDown = true;
  }
}
