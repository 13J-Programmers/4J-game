
window.game = window.game || {}
window.game.GameScene =

class GameScene {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // --- lights ---
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 2, 2);
    this.scene.add(light);

    // --- game objects ---

    // init objects
    this.objects = {};
    this.addedObjects = [];

    let geometry, material;

      // road
      geometry = new THREE.PlaneGeometry(50, 50000);
      material = new THREE.MeshPhongMaterial({
        color: 0x333333,
        side: THREE.DoubleSide
      });
      this.objects.road = new THREE.Mesh(geometry, material);
      this.objects.road.position.z = -5000 + 100;
      this.objects.road.position.y = -50;
      this.objects.road.position.y += 1;
      this.objects.road.rotation.x = Math.PI / 2;
      this.scene.add(this.objects.road);
      // ground
      geometry = new THREE.PlaneGeometry(400, 50000);
      material = new THREE.MeshPhongMaterial({
        color: 0x231f20,
        side: THREE.DoubleSide
      });
      this.objects.ground = new THREE.Mesh(geometry, material);
      this.objects.ground.position.z = -5000 + 100;
      this.objects.ground.position.y = -50;
      this.objects.ground.rotation.x = Math.PI / 2;
      this.scene.add(this.objects.ground);
      // tunnel
      geometry = new THREE.CylinderGeometry(90,90,50000,0);
      var colorSeed = (Math.random() * 0xFFFFFF | 0).toString(16);
      material = new THREE.MeshLambertMaterial({
        // material = new THREE.MeshNormalMaterial({
        color: "#" + (Math.floor(Math.random() * 16777215).toString(16) + colorSeed).slice(-6),
        // color: 0x231f20,
        side: THREE.DoubleSide
      });
      this.objects.tunnel = new THREE.Mesh(geometry, material);
      this.objects.tunnel.position.z = -5000 + 150;
      // this.objects.ground.position.y = -50;
      this.objects.tunnel.rotation.x = Math.PI / 2;
      this.scene.add(this.objects.tunnel);
    }
}
