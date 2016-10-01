
// load texture
const loader = new THREE.TextureLoader();

// put a door
const oneDoor = function (threejsObjects, onlyDoor) {
  let geometry, material;
  // door
  geometry = new THREE.BoxGeometry(50, 100, 0);
  material = new THREE.MeshBasicMaterial({ map: this.texture1 });
  threejsObjects.door = new THREE.Mesh(geometry, material);
  threejsObjects.root.add(threejsObjects.door);
  if (!onlyDoor) {
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
  }

  return threejsObjects;
};

// put two door
const twoDoor = function (threejsObjects, onlyDoor) {
  let geometry, material;
  // door
  geometry = new THREE.BoxGeometry(50, 100, 0);
  material = new THREE.MeshBasicMaterial({ map: this.texture1 });
  threejsObjects.door = {};
  threejsObjects.door[0] = new THREE.Mesh(geometry, material);
  threejsObjects.door[0].position.x -= 25;
  threejsObjects.root.add(threejsObjects.door[0]);
  material = new THREE.MeshBasicMaterial({ map: this.texture2 });
  threejsObjects.door[1] = new THREE.Mesh(geometry, material);
  threejsObjects.door[1].position.x += 25;
  threejsObjects.root.add(threejsObjects.door[1]);
  if (!onlyDoor) {
    // wall
    geometry = new THREE.BoxGeometry(300, 100, 0);
    material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
    threejsObjects.wall = {};
    threejsObjects.wall.left = new THREE.Mesh(geometry, material);
    threejsObjects.wall.left.position.x -= 200;
    threejsObjects.root.add(threejsObjects.wall.left);
    threejsObjects.wall.right = new THREE.Mesh(geometry, material);
    threejsObjects.wall.right.position.x += 200;
    threejsObjects.root.add(threejsObjects.wall.right);
    geometry = new THREE.BoxGeometry(800, 200, 0);
    threejsObjects.wall.top = new THREE.Mesh(geometry, material);
    threejsObjects.wall.top.position.y += 149;
    threejsObjects.root.add(threejsObjects.wall.top);
  }

  return threejsObjects;
};

// door data
//
// each key was indexed by incrementally
// - texture*: set THREE.js texture via loader
// - addDoorAndWallMesh: render door and walls
// - openSesame: return boolean by comparing opening way
// - openMotion: this function is invoked continually till return false
const doors = {
  door1: {
    texture1: loader.load("images/game/doors/door1.png"),
    addDoorAndWallMesh: oneDoor,
    openSesame: function (method) {
      return (method === "right");
    },
    openMotion: function (door) {
      // rotate right
      if (door.rotation.y <= -Math.PI / 2) return false;
      door.position.x += 1.5;
      door.position.z -= 1.0;
      door.rotation.y -= 0.1;
      return true;
    },
  },
  door2: {
    texture1: loader.load("images/game/doors/door2.png"),
    addDoorAndWallMesh: oneDoor,
    openSesame: function (method) {
      return (method === "left");
    },
    openMotion: function (door) {
      // rotate left
      if (door.rotation.y >= Math.PI / 2) return false;
      door.position.x -= 1.5;
      door.position.z -= 1.0;
      door.rotation.y += 0.1;
      return true;
    },
  },
  door3: {
    texture1: loader.load("images/game/doors/door3.png"),
    addDoorAndWallMesh: oneDoor,
    openSesame: function (method) {
      return (method === "right");
    },
    openMotion: function (door) {
      // slide right
      if (door.position.x >= 50) return false;
      door.position.x += 4;
      return true;
    },
  },
  door4: {
    texture1: loader.load("images/game/doors/door4.png"),
    addDoorAndWallMesh: oneDoor,
    openSesame: function (method) {
      return (method === "right");
    },
    openMotion: function (door) {
      // rotate right to back
      if (door.rotation.y >= Math.PI / 2) return false;
      door.position.x += 1.5;
      door.position.z += 1.0;
      door.rotation.y += 0.1;
      return true;
    },
  },
  door5: {
    texture1: loader.load("images/game/doors/door5-1.png"),
    texture2: loader.load("images/game/doors/door5-2.png"),
    addDoorAndWallMesh: twoDoor,
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // slide right
      if (door[0].position.x <= -75) return false;
      door[0].position.x -= 4;
      door[1].position.x += 4;
      return true;
    },
  },
  door6: {
    texture1: loader.load("images/game/doors/door6-1.png"),
    texture2: loader.load("images/game/doors/door6-2.png"),
    addDoorAndWallMesh: twoDoor,
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // rotate to back
      if (door[0].rotation.y <= -Math.PI / 2) return false;
      // left
      door[0].position.x -= 1.5;
      door[0].position.z += 1.0;
      door[0].rotation.y -= 0.1;
      // right
      door[1].position.x += 1.5;
      door[1].position.z += 1.0;
      door[1].rotation.y += 0.1;
      return true;
    },
  },
  door7: {
    texture1: loader.load("images/game/doors/door7-1.png"),
    texture2: loader.load("images/game/doors/door7-2.png"),
    addDoorAndWallMesh: twoDoor,
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // rotate
      if (door[0].rotation.y >= Math.PI / 2) return false;
      // left
      door[0].position.x -= 1.5;
      door[0].position.z -= 1.0;
      door[0].rotation.y += 0.1;
      // right
      door[1].position.x += 1.5;
      door[1].position.z -= 1.0;
      door[1].rotation.y -= 0.1;
      return true;
    },
  },
  door8: {
    texture1: loader.load("images/game/doors/door8-1.png"),
    texture2: loader.load("images/game/doors/door8-2.png"),
    texture3: loader.load("images/game/doors/door8-3.png"),
    texture4: loader.load("images/game/doors/door8-4.png"),
    texture5: loader.load("images/game/doors/door8-5.png"),
    texture6: loader.load("images/game/doors/door8-6.png"),
    addDoorAndWallMesh: function (threejsObjects, onlyDoor) {
      let geometry, material;
      // door
      //   left
      geometry = new THREE.BoxGeometry(20, 100, 0);
      threejsObjects.door = {}
      material = new THREE.MeshBasicMaterial({ map: this.texture1 });
      threejsObjects.door[0] = new THREE.Mesh(geometry, material);
      threejsObjects.door[0].position.x -= 50;
      threejsObjects.root.add(threejsObjects.door[0]);
      material = new THREE.MeshBasicMaterial({ map: this.texture2 });
      threejsObjects.door[1] = new THREE.Mesh(geometry, material);
      threejsObjects.door[1].position.x += 20;
      threejsObjects.door[0].add(threejsObjects.door[1]);
      material = new THREE.MeshBasicMaterial({ map: this.texture3 });
      threejsObjects.door[2] = new THREE.Mesh(geometry, material);
      threejsObjects.door[2].position.x += 20;
      threejsObjects.door[1].add(threejsObjects.door[2]);
      //   right
      material = new THREE.MeshBasicMaterial({ map: this.texture6 });
      threejsObjects.door[5] = new THREE.Mesh(geometry, material);
      threejsObjects.door[5].position.x += 50;
      threejsObjects.root.add(threejsObjects.door[5]);
      material = new THREE.MeshBasicMaterial({ map: this.texture5 });
      threejsObjects.door[4] = new THREE.Mesh(geometry, material);
      threejsObjects.door[4].position.x -= 20;
      threejsObjects.door[5].add(threejsObjects.door[4]);
      material = new THREE.MeshBasicMaterial({ map: this.texture4 });
      threejsObjects.door[3] = new THREE.Mesh(geometry, material);
      threejsObjects.door[3].position.x -= 20;
      threejsObjects.door[4].add(threejsObjects.door[3]);

      if (!onlyDoor) {
        // wall
        geometry = new THREE.BoxGeometry(300, 100, 0);
        material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
        threejsObjects.wall = {};
        threejsObjects.wall.left = new THREE.Mesh(geometry, material);
        threejsObjects.wall.left.position.x -= 210;
        threejsObjects.root.add(threejsObjects.wall.left);
        threejsObjects.wall.right = new THREE.Mesh(geometry, material);
        threejsObjects.wall.right.position.x += 210;
        threejsObjects.root.add(threejsObjects.wall.right);
        geometry = new THREE.BoxGeometry(800, 200, 0);
        threejsObjects.wall.top = new THREE.Mesh(geometry, material);
        threejsObjects.wall.top.position.y += 149;
        threejsObjects.root.add(threejsObjects.wall.top);
      }

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // fold
      if (door[0].rotation.y >= Math.PI / 2) return false;
      door[0].position.x -= 1.0;
      door[0].position.z -= 1.0;
      door[0].rotation.y += 0.1;
      door[1].position.x -= 1.0;
      door[1].rotation.y -= 0.2;
      door[2].position.x -= 1.0;
      door[2].rotation.y += 0.2;

      door[5].position.x += 1.0;
      door[5].position.z -= 1.0;
      door[5].rotation.y -= 0.1;
      door[4].position.x += 1.0;
      door[4].rotation.y += 0.2;
      door[3].position.x += 1.0;
      door[3].rotation.y -= 0.2;
      return true;
    },
  },
  door9: {
    texture1: loader.load("images/game/doors/door9-1left.png"),
    texture2: loader.load("images/game/doors/door9-1.png"),
    texture3: loader.load("images/game/doors/door9-2.png"),
    texture4: loader.load("images/game/doors/door9-2right.png"),
    texture5: loader.load("images/game/doors/door9top.png"),
    addDoorAndWallMesh: function (threejsObjects, onlyDoor) {
      let geometry, material;
      // door
      geometry = new THREE.BoxGeometry(50, 100, 0);
      threejsObjects.door = {}
      material = new THREE.MeshBasicMaterial({ map: this.texture2 });
      threejsObjects.door[0] = new THREE.Mesh(geometry, material);
      threejsObjects.door[0].position.x -= 25;
      threejsObjects.root.add(threejsObjects.door[0]);
      material = new THREE.MeshBasicMaterial({ map: this.texture3 });
      threejsObjects.door[1] = new THREE.Mesh(geometry, material);
      threejsObjects.door[1].position.x += 25;
      threejsObjects.root.add(threejsObjects.door[1]);

      if (!onlyDoor) {
        // wall
        geometry = new THREE.BoxGeometry(300, 100, 0);
        material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
        threejsObjects.wall = {};
        threejsObjects.wall.left = new THREE.Mesh(geometry, material);
        threejsObjects.wall.left.position.x -= 210;
        threejsObjects.root.add(threejsObjects.wall.left);
        threejsObjects.wall.right = new THREE.Mesh(geometry, material);
        threejsObjects.wall.right.position.x += 210;
        threejsObjects.root.add(threejsObjects.wall.right);
        geometry = new THREE.BoxGeometry(800, 200, 0);
        threejsObjects.wall.top = new THREE.Mesh(geometry, material);
        threejsObjects.wall.top.position.y += 149;
        threejsObjects.root.add(threejsObjects.wall.top);
        // wall texture
        geometry = new THREE.BoxGeometry(20, 120, 0);
        material = new THREE.MeshBasicMaterial({ map: this.texture1 });
        threejsObjects.wall.leftTexture = new THREE.Mesh(geometry, material);
        threejsObjects.wall.leftTexture.position.x -= 60;
        threejsObjects.wall.leftTexture.position.y += 10;
        threejsObjects.wall.leftTexture.position.z += 1;
        threejsObjects.root.add(threejsObjects.wall.leftTexture);
        material = new THREE.MeshBasicMaterial({ map: this.texture4 });
        threejsObjects.wall.rightTexture = new THREE.Mesh(geometry, material);
        threejsObjects.wall.rightTexture.position.x += 60;
        threejsObjects.wall.rightTexture.position.y += 10;
        threejsObjects.wall.rightTexture.position.z += 1;
        threejsObjects.root.add(threejsObjects.wall.rightTexture);
        geometry = new THREE.BoxGeometry(100, 20, 0);
        material = new THREE.MeshBasicMaterial({ map: this.texture5 });
        threejsObjects.wall.topTexture = new THREE.Mesh(geometry, material);
        threejsObjects.wall.topTexture.position.y += 60;
        threejsObjects.wall.topTexture.position.z += 1;
        threejsObjects.root.add(threejsObjects.wall.topTexture);
      }

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // slide
      if (door[0].position.x <= -75) return false;
      door[0].position.x -= 4;
      door[1].position.x += 4;
      return true;
    },
  },
  door10: {
    texture1: loader.load("images/game/doors/door10-1left.png"),
    texture2: loader.load("images/game/doors/door10-1.png"),
    texture3: loader.load("images/game/doors/door10-2.png"),
    texture4: loader.load("images/game/doors/door10-2right.png"),
    addDoorAndWallMesh: function (threejsObjects, onlyDoor) {
      let geometry, material;
      // door
      geometry = new THREE.BoxGeometry(50, 100, 0);
      threejsObjects.door = {}
      material = new THREE.MeshBasicMaterial({ map: this.texture2 });
      threejsObjects.door[0] = new THREE.Mesh(geometry, material);
      threejsObjects.door[0].position.x -= 25;
      threejsObjects.root.add(threejsObjects.door[0]);
      material = new THREE.MeshBasicMaterial({ map: this.texture3 });
      threejsObjects.door[1] = new THREE.Mesh(geometry, material);
      threejsObjects.door[1].position.x += 25;
      threejsObjects.root.add(threejsObjects.door[1]);
      if (!onlyDoor) {
        // wall
        geometry = new THREE.BoxGeometry(300, 100, 0);
        material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
        threejsObjects.wall = {};
        threejsObjects.wall.left = new THREE.Mesh(geometry, material);
        threejsObjects.wall.left.position.x -= 210;
        threejsObjects.root.add(threejsObjects.wall.left);
        threejsObjects.wall.right = new THREE.Mesh(geometry, material);
        threejsObjects.wall.right.position.x += 210;
        threejsObjects.root.add(threejsObjects.wall.right);
        geometry = new THREE.BoxGeometry(800, 200, 0);
        threejsObjects.wall.top = new THREE.Mesh(geometry, material);
        threejsObjects.wall.top.position.y += 149;
        threejsObjects.root.add(threejsObjects.wall.top);
        // wall texture
        geometry = new THREE.BoxGeometry(20, 100, 0);
        material = new THREE.MeshBasicMaterial({ map: this.texture1 });
        threejsObjects.wall.leftTexture = new THREE.Mesh(geometry, material);
        threejsObjects.wall.leftTexture.position.x -= 60;
        threejsObjects.wall.leftTexture.position.z += 1;
        threejsObjects.root.add(threejsObjects.wall.leftTexture);
        material = new THREE.MeshBasicMaterial({ map: this.texture4 });
        threejsObjects.wall.rightTexture = new THREE.Mesh(geometry, material);
        threejsObjects.wall.rightTexture.position.x += 60;
        threejsObjects.wall.rightTexture.position.z += 1;
        threejsObjects.root.add(threejsObjects.wall.rightTexture);
      }

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // rotate forward
      if (door[0].rotation.y >= Math.PI / 2) return false;
      // left
      door[0].position.x -= 1.5;
      door[0].position.z -= 1.0;
      door[0].rotation.y += 0.1;
      // right
      door[1].position.x += 1.5;
      door[1].position.z -= 1.0;
      door[1].rotation.y -= 0.1;
      return true;
    },
  },
  door11: {
    texture1: loader.load("images/game/doors/door11.png"),
    addDoorAndWallMesh: oneDoor,
    openSesame: function (method) {
      return (method === "up");
    },
    openMotion: function (door) {
      // move up
      if (door.position.y >= 150) return false;
      door.position.y += 6;
      return true;
    },
  },
  door12: {
    texture1: loader.load("images/game/doors/door12.png"),
    texture2: loader.load("images/game/doors/door12wheel.png"),
    addDoorAndWallMesh: function (threejsObjects, onlyDoor) {
      let geometry, material;
      // door
      geometry = new THREE.BoxGeometry(50, 100, 0);
      material = new THREE.MeshBasicMaterial({ map: this.texture1 });
      threejsObjects.door = new THREE.Mesh(geometry, material);
      threejsObjects.root.add(threejsObjects.door);
      // wheel
      geometry = new THREE.CircleGeometry(25, 32, 0);
      material = new THREE.MeshBasicMaterial({ map: this.texture2 });
      threejsObjects.door.wheel = new THREE.Mesh(geometry, material);
      threejsObjects.door.wheel.position.z += 1;
      threejsObjects.door.add(threejsObjects.door.wheel);
      if (!onlyDoor) {
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
      }

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "turn");
    },
    openMotion: function (door) {
      if (door.rotation.y <= -Math.PI / 2) return false;
      // rotate door right
      door.position.x += 1.5;
      door.position.z -= 1.0;
      door.rotation.y -= 0.1;

      // rotate wheel
      door.wheel.rotation.z += 0.1;
      return true;
    },
  },
  door13: {
    texture1: loader.load("images/game/doors/door13-1.png"),
    texture2: loader.load("images/game/doors/door13-2.png"),
    addDoorAndWallMesh: function (threejsObjects, onlyDoor) {
      threejsObjects = twoDoor.bind(this)(threejsObjects, onlyDoor);
      // render switch
      let geometry, material;
      // switch box
      geometry = new THREE.BoxGeometry(10, 20);
      material = new THREE.MeshBasicMaterial({ color: 0x333333 });
      threejsObjects.door.doorSwitchBox = new THREE.Mesh(geometry, material);
      threejsObjects.door.doorSwitchBox.position.x -= 50;
      threejsObjects.door.doorSwitchBox.position.z += 1;
      threejsObjects.root.add(threejsObjects.door.doorSwitchBox);
      // lower switch
      threejsObjects.door.doorSwitch = {}
      geometry = new THREE.CircleGeometry(2, 32);
      material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      threejsObjects.door.doorSwitch[0] = new THREE.Mesh(geometry, material);
      threejsObjects.door.doorSwitch[0].position.y -= 5;
      threejsObjects.door.doorSwitch[0].position.z += 2;
      threejsObjects.door.doorSwitchBox.add(threejsObjects.door.doorSwitch[0]);
      // upper switch
      threejsObjects.door.doorSwitch[1] = new THREE.Mesh(geometry, material);
      threejsObjects.door.doorSwitch[1].position.y += 5;
      threejsObjects.door.doorSwitch[1].position.z -= 2;
      threejsObjects.door.doorSwitchBox.add(threejsObjects.door.doorSwitch[1]);

      return threejsObjects;
    },
    openSesame: function (method) {
      return (method === "switch");
    },
    openMotion: function (door) {
      // startup
      if (door.startOpening === undefined) {
        door.startOpening = true;
        door.doorSwitch[0].position.z -= 4;
        door.doorSwitch[1].position.z += 4;
      }

      // shift
      if (door[0].position.x <= -50) return false;
      door[0].position.x -= 4;
      door[1].position.x += 4;
      return true;
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
    this.isOpened = false;

    // door type (1-13)
    this.type = args.type;
    this.door = doors["door" + this.type];

    // door position
    this.position = args.position || new THREE.Vector3(0, 0, 0);

    // scale
    this.scale = args.scale || 1;

    // render only door
    this.onlyDoor = args.onlyDoor || false;
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
    this.objects.root.scale.set(this.scale, this.scale, this.scale);
    this.gameScene.scene.add(this.objects.root);

    // render door and walls
    this.objects = this.door.addDoorAndWallMesh(this.objects, this.onlyDoor);
  }

  update() {
    if (!this.isOpening) return;
    const moved = this.door.openMotion(this.objects.door);

    // If the door is opened, function openMotion() will never be invoked.
    if (!moved) this.isOpening = false;
    return;
  }

  openSesame(method) {
    // Whether the opening method of the door is correct or not.
    if (this.door.openSesame(method)) {
      this.isOpened = true;
      this.isOpening = true;
      return true;
    }
  }
}
