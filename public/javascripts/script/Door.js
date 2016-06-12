
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
            case 1:  this.image_url = "/images/game/sliding-door-left.jpg";  break;
            case 2:  this.image_url = "/images/game/sliding-door-right.jpg"; break;
            case 3:  this.image_url = ["/images/game/sliding-door-left.jpg", "/images/game/sliding-door-right.jpg"]; break;
            default: this.image_url = "";
        }

        // door position
        this.pos = args.pos || [0, 0, 0];
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
        this.objects.root.position.set(...this.pos);
        this.gameScene.scene.add(this.objects.root);

        let geometry, material;

        var loader = new THREE.TextureLoader(); // to load a resource

        // load texture and add door object
        switch (this.type) {
        case 3: // has two doors to slide to both sides.
            this.objects.door = [];

            loader.load(
                this.image_url[0],
                (texture) => {
                    geometry = new THREE.BoxGeometry(50, 100, 1);
                    material = new THREE.MeshPhongMaterial({ map: texture });
                    this.objects.door[0] = new THREE.Mesh(geometry, material);
                    this.objects.door[0].position.x = -25;
                    this.objects.root.add(this.objects.door[0]);
                }
            );
            loader.load(
                this.image_url[1],
                (texture) => {
                    geometry = new THREE.BoxGeometry(50, 100, 1);
                    material = new THREE.MeshPhongMaterial({ map: texture });
                    this.objects.door[1] = new THREE.Mesh(geometry, material);
                    this.objects.door[1].position.x = +25;
                    this.objects.root.add(this.objects.door[1]);
                }
            );
            break;
        default:
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

    }

    update() {
        if (!this.isOpening) return;
        switch (this.type) {
        case 1: // slide to left
            if (this.objects.door.position.x <= -50) return this.isOpening = false;
            this.objects.door.position.x -= 5;
            break;
        case 2: // slide to right
            if (this.objects.door.position.x >= 50) return this.isOpening = false;
            this.objects.door.position.x += 5;
            break;
        case 3: // slide to both sides
            if (this.objects.door[0].position.x <= - 50) return this.isOpening = false;
            this.objects.door[0].position.x -= 5;
            this.objects.door[1].position.x += 5;
            break;
        default:
            this.isOpening = false;
        }
    }

    openSesame(method) {
        switch (method) {
        case "left":
            if (this.type !== 1) return false;
            return this.isOpening = true;
        case "right":
            if (this.type !== 2) return false;
            return this.isOpening = true;
        case "both-side":
            if (this.type !== 3) return false;
            return this.isOpening = true;
        default:
            return false;
        }
    }
}
