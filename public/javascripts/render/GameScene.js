
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

        // ground
        geometry = new THREE.PlaneGeometry(50, 10000);
        material = new THREE.MeshPhongMaterial({
            color: 0x333333,
            side: THREE.DoubleSide,
        });
        this.objects.load = new THREE.Mesh(geometry, material);
        this.objects.load.position.z = -5000 + 100;
        this.objects.load.position.y = -50;
        this.objects.load.position.y += 1;
        this.objects.load.rotation.x = Math.PI / 2;
        this.scene.add(this.objects.load);

        geometry = new THREE.PlaneGeometry(400, 10000);
        material = new THREE.MeshPhongMaterial({
            color: 0x231f20,
            side: THREE.DoubleSide,
        });
        this.objects.ground = new THREE.Mesh(geometry, material);
        this.objects.ground.position.z = -5000 + 100;
        this.objects.ground.position.y = -50;
        this.objects.ground.rotation.x = Math.PI / 2;
        this.scene.add(this.objects.ground);
    }
}
