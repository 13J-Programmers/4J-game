"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.game = window.game || {};
window.game.GameScene = function GameScene(scene, camera, renderer) {
    _classCallCheck(this, GameScene);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // --- lights ---
    // this.lights = {};
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 2, 1);
    this.scene.add(light);

    // --- game objects ---

    // init objects
    this.objects = {};
    this.addedObjects = [];

    var geometry = undefined,
        material = undefined;

    // ground
    geometry = new THREE.PlaneGeometry(100, 10000);
    material = new THREE.MeshPhongMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide
    });
    this.objects.plane = new THREE.Mesh(geometry, material);
    this.objects.plane.position.z = -5000 + 100;
    this.objects.plane.position.y = -100;
    this.objects.plane.rotation.x = Math.PI / 2;
    this.scene.add(this.objects.plane);
};