
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
        geometry = new THREE.PlaneGeometry(100, 10000);
        material = new THREE.MeshPhongMaterial({
            color: 0xf0601d,
            side: THREE.DoubleSide,
        });
        this.objects.plane = new THREE.Mesh(geometry, material);
        this.objects.plane.position.z = -5000 + 100;
        this.objects.plane.position.y = -50;
        this.objects.plane.rotation.x = Math.PI / 2;
        this.scene.add(this.objects.plane);
    }
}
