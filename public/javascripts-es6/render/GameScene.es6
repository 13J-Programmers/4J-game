
window.game = window.game || {}
window.game.GameScene =

class GameScene {
    constructor() {
        // init scene
        this._scene = new THREE.Scene();

        // init camera
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this._camera.position.z = 200;

        // init render
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);

        this.generateLights();
        this.generateGameObjects();
    }

    get scene() {
        return this._scene;
    }

    get camera() {
        return this._camera;
    }

    get renderer() {
        return this._renderer;
    }

    generateLights() {
        // init light
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 2, 1);
        this.scene.add(light);
    }

    generateGameObjects() {
        // init objects
        this.objects = {};
        let geometry, material;

        // ground
        geometry = new THREE.PlaneGeometry(100, 10000);
        material = new THREE.MeshPhongMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
        });
        this.objects.plane = new THREE.Mesh(geometry, material);
        this.objects.plane.position.z = -5000 + 100;
        this.objects.plane.position.y = -100;
        this.objects.plane.rotation.x = Math.PI / 2;
        this.scene.add(this.objects.plane);
    }
}
