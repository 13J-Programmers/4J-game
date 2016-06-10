
window.game = window.game || {}
window.game.Door =

class Door extends game.MonoBehavior {
    constructor(args) {
        super();
        this.gameScene = {};
        this.objects = {};

        // flags
        this.isOpening = false;

        // door type
        // 1: slide to left, 2: slide to right, 3: slide to both sides,
        this.type = args.type;
        switch (this.type) {
            case 0:  this.image_url = "/images/game/sliding-door-left.jpg";  break;
            case 1:  this.image_url = "/images/game/sliding-door-right.jpg"; break;
            case 2:  this.image_url = "/images/game/sliding-door.jpg";       break;
            default: this.image_url = "";
        }

        // door position
        this.pos = args.pos || [0, 0, 0];
    }

    start() {
        // root object
        this.objects.root = new THREE.Object3D();
        this.objects.root.position.set(...this.pos);
        this.gameScene.scene.add(this.objects.root);

        let geometry, material;

        var loader = new THREE.TextureLoader(); // to load a resource

        loader.load(
            this.image_url,
            (texture) => {
                geometry = new THREE.BoxGeometry(50, 100, 1);
                material = new THREE.MeshPhongMaterial({ map: texture });
                this.objects.door = new THREE.Mesh(geometry, material);
                this.objects.root.add(this.objects.door);
            }
        );
    }

    update() {
        if (!this.isOpening) return;
        if (this.type === 0) {
            this.objects.door.position.x -= 5;
            if (this.objects.door.position.x <= -50) this.isOpening = false;
        }
    }

    openSesame() {
        this.isOpening = true;
    }
}
