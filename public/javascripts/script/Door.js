
// load texture
const loader = new THREE.TextureLoader();


const oneDoor = function (threejsObjects) {
  let geometry, material;
  // door
  geometry = new THREE.BoxGeometry(50, 100, 0);
  material = new THREE.MeshBasicMaterial({ map: this.texture1 });
  threejsObjects.door = new THREE.Mesh(geometry, material);
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
};

const twoDoor = function (threejsObjects) {
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

  return threejsObjects;
};


const doors = {
  door1: {
    texture1: loader.load("/images/game/doors/door1.png"),
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
    texture1: loader.load("/images/game/doors/door2.png"),
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
    texture1: loader.load("/images/game/doors/door3.png"),
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
    texture1: loader.load("/images/game/doors/door4.png"),
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
    texture1: loader.load("/images/game/doors/door5-1.png"),
    texture2: loader.load("/images/game/doors/door5-2.png"),
    addDoorAndWallMesh: twoDoor,
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // slide right
      if (door[0].position.x >= 75) return false;
      door[0].position.x -= 4;
      door[1].position.x += 4;
      return true;
    },
  },
  door6: {
    texture1: loader.load("/images/game/doors/door6-1.png"),
    texture2: loader.load("/images/game/doors/door6-2.png"),
    addDoorAndWallMesh: twoDoor,
    openSesame: function (method) {
      return (method === "both-side");
    },
    openMotion: function (door) {
      // rotate to back
      if (door[0].rotation.y >= Math.PI / 2) return false;
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
    texture1: loader.load("/images/game/doors/door7-1.png"),
    texture2: loader.load("/images/game/doors/door7-2.png"),
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
    texture1: loader.load("/images/game/doors/door8-1.png"),
    texture2: loader.load("/images/game/doors/door8-2.png"),
    texture3: loader.load("/images/game/doors/door8-3.png"),
    texture4: loader.load("/images/game/doors/door8-4.png"),
    texture5: loader.load("/images/game/doors/door8-5.png"),
    texture6: loader.load("/images/game/doors/door8-6.png"),
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
  door9: {
    texture1: loader.load("/images/game/doors/door9-1left.png"),
    texture2: loader.load("/images/game/doors/door9-1.png"),
    texture3: loader.load("/images/game/doors/door9-2.png"),
    texture4: loader.load("/images/game/doors/door9-2right.png"),
    texture5: loader.load("/images/game/doors/door9top.png"),
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
  door10: {
    texture1: loader.load("/images/game/doors/door10-1left.png"),
    texture2: loader.load("/images/game/doors/door10-1.png"),
    texture3: loader.load("/images/game/doors/door10-2.png"),
    texture4: loader.load("/images/game/doors/door10-2right.png"),
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
  door11: {
    texture1: loader.load("/images/game/doors/door11-1.png"),
    texture1: loader.load("/images/game/doors/door11-2.png"),
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
  door12: {
    texture1: loader.load("/images/game/doors/door12.png"),
    texture2: loader.load("/images/game/doors/door12wheel.png"),
    addDoorAndWallMesh: function (threejsObjects) {
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
  }

  update() {
    if (!this.isOpening) return;
    const moved = this.door.openMotion(this.objects.door);
    if (!moved) this.isOpening = false;
    return;
  }

  openSesame(method) {
    if (this.door.openSesame(method)) {
      this.isOpening = true;
      return true;
    }
  }
}
