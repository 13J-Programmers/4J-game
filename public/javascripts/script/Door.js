
// load texture
const loader = new THREE.TextureLoader();
// const left_door_texture  = loader.load("/images/game/sliding-door-left.jpg");
// const right_door_texture = loader.load("/images/game/sliding-door-right.jpg");

const doors = {
  door1: new Object({
    texture1: loader.load("/images/game/doors/door1.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      let geometry, material;
      // door
      geometry = new THREE.BoxGeometry(50, 100, 0);
      material = new THREE.MeshBasicMaterial({ map: this.texture1 });
      threejsObjects.door = new THREE.Mesh(geometry, material);
      threejsObjects.door.position.y -= 1;
      threejsObjects.root.add(threejsObjects.door);
      // wall
      geometry = new THREE.BoxGeometry(300, 100, 0);
      material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
      threejsObjects.wall = {};
      threejsObjects.wall.left = new THREE.Mesh(geometry, material);
      threejsObjects.wall.left.position.x -= 175;
      threejsObjects.root.add(threejsObjects.wall.left);
      threejsObjects.wall.right = new THREE.Mesh(geometry, material);
      threejsObjects.wall.right.position.x += 175;
      threejsObjects.root.add(threejsObjects.wall.right);
      geometry = new THREE.BoxGeometry(800, 200, 0);
      threejsObjects.wall.top = new THREE.Mesh(geometry, material);
      threejsObjects.wall.top.position.y += 149;
      threejsObjects.root.add(threejsObjects.wall.top);

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "right");
    },
    openMotion: function (door) {
      // rotate right
      if (door.rotation.y <= -Math.PI / 2) return false;
      door.position.x += 1.5;
      door.position.z -= 1.5;
      door.rotation.y -= 0.1;
      return true;
    },
  }),
  door2: new Object({
    texture1: loader.load("/images/game/doors/door2.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      let geometry, material;
      // door
      geometry = new THREE.BoxGeometry(50, 100, 0);
      material = new THREE.MeshBasicMaterial({ map: this.texture1 });
      threejsObjects.door = new THREE.Mesh(geometry, material);
      threejsObjects.door.position.y -= 1;
      threejsObjects.root.add(threejsObjects.door);
      // wall
      geometry = new THREE.BoxGeometry(300, 100, 0);
      material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
      threejsObjects.wall = {};
      threejsObjects.wall.left = new THREE.Mesh(geometry, material);
      threejsObjects.wall.left.position.x -= 175;
      threejsObjects.root.add(threejsObjects.wall.left);
      threejsObjects.wall.right = new THREE.Mesh(geometry, material);
      threejsObjects.wall.right.position.x += 175;
      threejsObjects.root.add(threejsObjects.wall.right);
      geometry = new THREE.BoxGeometry(800, 200, 0);
      threejsObjects.wall.top = new THREE.Mesh(geometry, material);
      threejsObjects.wall.top.position.y += 149;
      threejsObjects.root.add(threejsObjects.wall.top);

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "left");
    },
    openMotion: function (door) {
      // rotate left
      if (door.rotation.y >= Math.PI / 2) return false;
      door.position.x -= 1.5;
      door.position.z -= 1.5;
      door.rotation.y += 0.1;
      return true;
    },
  }),
  door3: {
    texture1: loader.load("/images/game/doors/door3.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      let geometry, material;
      // door
      geometry = new THREE.BoxGeometry(50, 100, 0);
      material = new THREE.MeshBasicMaterial({ map: this.texture1 });
      threejsObjects.door = new THREE.Mesh(geometry, material);
      threejsObjects.door.position.y -= 1;
      threejsObjects.root.add(threejsObjects.door);
      // wall
      geometry = new THREE.BoxGeometry(300, 100, 0);
      material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
      threejsObjects.wall = {};
      threejsObjects.wall.left = new THREE.Mesh(geometry, material);
      threejsObjects.wall.left.position.x -= 175;
      threejsObjects.root.add(threejsObjects.wall.left);
      threejsObjects.wall.right = new THREE.Mesh(geometry, material);
      threejsObjects.wall.right.position.x += 175;
      threejsObjects.root.add(threejsObjects.wall.right);
      geometry = new THREE.BoxGeometry(800, 200, 0);
      threejsObjects.wall.top = new THREE.Mesh(geometry, material);
      threejsObjects.wall.top.position.y += 149;
      threejsObjects.root.add(threejsObjects.wall.top);

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "right");
    },
    openMotion: function (door) {
      // slide right
      if (door.position.y >= 50) return false;
      door.position.x += 4;
      return true;
    },
  },
  door4: {
    texture1: loader.load("/images/game/doors/door4.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      //
    },
    openSesame: function (method) {
      //
    },
    openMotion: function (door) {
      //
    },
  },
  door5: {
    texture1: loader.load("/images/game/doors/door5-1.png"),
    texture2: loader.load("/images/game/doors/door5-2.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      //
    },
    openSesame: function (method) {
      //
    },
    openMotion: function (door) {
      //
    },
  },
  door6: {
    texture1: loader.load("/images/game/doors/door6-1.png"),
    texture2: loader.load("/images/game/doors/door6-2.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      //
    },
    openSesame: function (method) {
      //
    },
    openMotion: function (door) {
      //
    },
  },
  door7: {
    texture1: loader.load("/images/game/doors/door7-1.png"),
    texture2: loader.load("/images/game/doors/door7-2.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      //
    },
    openSesame: function (method) {
      //
    },
    openMotion: function (door) {
      //
    },
  },
  door8: {
    texture1: loader.load("/images/game/doors/door8-1.png"),
    texture2: loader.load("/images/game/doors/door8-2.png"),
    texture3: loader.load("/images/game/doors/door8-3.png"),
    texture4: loader.load("/images/game/doors/door8-4.png"),
    texture5: loader.load("/images/game/doors/door8-5.png"),
    texture6: loader.load("/images/game/doors/door8-6.png"),
  },
  door9: {
    texture1: loader.load("/images/game/doors/door9-1left.png"),
    texture2: loader.load("/images/game/doors/door9-1.png"),
    texture3: loader.load("/images/game/doors/door9-2.png"),
    texture4: loader.load("/images/game/doors/door9-2right.png"),
    texture5: loader.load("/images/game/doors/door9top.png"),
  },
  door10: {
    texture1: loader.load("/images/game/doors/door10-1left.png"),
    texture2: loader.load("/images/game/doors/door10-1.png"),
    texture3: loader.load("/images/game/doors/door10-2.png"),
    texture4: loader.load("/images/game/doors/door10-2right.png"),
  },
  door11: {
    texture1: loader.load("/images/game/doors/door11-1.png"),
    texture1: loader.load("/images/game/doors/door11-2.png"),
  },
  door12: {
    texture1: loader.load("/images/game/doors/door12.png"),
    addDoorAndWallMesh: function (threejsObjects) {
      //
    },
    openSesame: function (method) {
      //
    },
    openMotion: function (door) {
      //
    },
  },
}

window.game = window.game || {}
window.game.Door =

class Door extends game.MonoBehavior {
  constructor(args) {
    super();
    this.gameScene = {};
    this.objects = {};

    // flags
    this.isOpening = false;

    // door type (1-12)
    this.type = args.type;
    this.door = doors["door" + this.type];

    // door position
    this.position = args.position || new THREE.Vector3(0, 0, 0);
  }

  start() {
    // hierarchy
    //
    // gameScene.scene
    // └── objects.root
    //     └── objects.door
    //

    // root object
    this.objects.root = new THREE.Object3D();
    this.objects.root.position.set(...this.position.toArray());
    this.gameScene.scene.add(this.objects.root);

    let geometry, material;
    geometry = new THREE.BoxGeometry(50, 100, 1);

    this.objects = this.door.addDoorAndWallMesh(this.objects);
    //
    // // material = new THREE.MeshPhongMaterial({ map: loader.load("/images/game/doors/door1.png") });
    // material = new THREE.MeshPhongMaterial({ map: left_door_texture });
    // this.objects.door = new THREE.Mesh(geometry, material);
    // this.objects.root.add(this.objects.door);

    // switch (this.type) {
    // case 1:
    //     material = new THREE.MeshPhongMaterial({ map: left_door_texture });
    //     this.objects.door = new THREE.Mesh(geometry, material);
    //     this.objects.root.add(this.objects.door);
    //     break;
    // case 2:
    //     material = new THREE.MeshPhongMaterial({ map: right_door_texture });
    //     this.objects.door = new THREE.Mesh(geometry, material);
    //     this.objects.root.add(this.objects.door);
    //     break;
    // case 3:
    //     this.objects.door = [];
    //
    //     material = new THREE.MeshPhongMaterial({ map: left_door_texture });
    //     this.objects.door[0] = new THREE.Mesh(geometry, material);
    //     this.objects.door[0].position.x = -25;
    //     this.objects.root.add(this.objects.door[0]);
    //
    //     material = new THREE.MeshPhongMaterial({ map: right_door_texture });
    //     this.objects.door[1] = new THREE.Mesh(geometry, material);
    //     this.objects.door[1].position.x = +25;
    //     this.objects.root.add(this.objects.door[1]);
    //     break;
    // }
  }

  update() {
    if (!this.isOpening) return;
    const moved = this.door.openMotion(this.objects.door);
    if (!moved) this.isOpening = false;
    return;

    // switch (this.type) {
    // case 1: // slide to left
    //     if (this.objects.door.position.x <= -50) return this.isOpening = false;
    //     this.objects.door.position.x -= 5;
    //     break;
    // case 2: // slide to right
    //     if (this.objects.door.position.x >= 50) return this.isOpening = false;
    //     this.objects.door.position.x += 5;
    //     break;
    // case 3: // slide to both sides
    //     if (this.objects.door[0].position.x <= - 50) return this.isOpening = false;
    //     this.objects.door[0].position.x -= 5;
    //     this.objects.door[1].position.x += 5;
    //     break;
    // default:
    //     this.isOpening = false;
    // }
  }

  openSesame(method) {
    if (this.door.openSesame(method)) {
      this.isOpening = true;
      return true;
    }

    // switch (method) {
    // case "left":
    //     if (this.type !== 1) return false;
    //     return this.isOpening = true;
    // case "right":
    //     if (this.type !== 2) return false;
    //     return this.isOpening = true;
    // case "both-side":
    //     if (this.type !== 3) return false;
    //     return this.isOpening = true;
    // default:
    //     return false;
    // }
  }
}
