
window.game = window.game || {}
window.game.Player =

class Player extends game.MonoBehavior {
    constructor(gameScene) {
        super();
        this.gameScene = gameScene;
        this.theta = 0;
    }

    start() {
        // init objects
        this.objects = {};
        let geometry, material;

        // player
        this.objects.player = new THREE.Object3D();
        this.gameScene.scene.add(this.objects.player);

        // donut
        geometry = new THREE.TorusGeometry(30, 10, 16, 100);
        material = new THREE.MeshPhongMaterial({ color: 0xaaffaa });
        this.objects.donut = new THREE.Mesh(geometry, material);
        this.objects.player.add(this.objects.donut);

        // electron
        geometry = new THREE.SphereGeometry(5, 32, 32);
        material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        this.objects.electron = new THREE.Mesh(geometry, material);
        this.objects.donut.add(this.objects.electron);

        // lines from hand
        geometry = new THREE.CylinderGeometry(5, 5, 100, 16);
        material = new THREE.MeshPhongMaterial({ color: 0xaaffaa });
        this.objects.lines = {};
        this.objects.lines.right = new THREE.Mesh(geometry, material);
        this.objects.lines.left  = new THREE.Mesh(geometry, material);
        const lineLength  = this.objects.lines.right.geometry.parameters.height;
        const donutRadius = this.objects.donut.geometry.parameters.radius;
        this.objects.lines.left.position.x  = -(donutRadius + lineLength/2);
        this.objects.lines.right.position.x =   donutRadius + lineLength/2;
        this.objects.lines.left.rotation.z  = -90 * Math.PI / 180;
        this.objects.lines.right.rotation.z =  90 * Math.PI / 180;
        this.objects.player.add(this.objects.lines.left);
        this.objects.player.add(this.objects.lines.right);
    }

    update() {
        this.theta += 1 * Math.PI / 180;
        this.objects.donut.rotation.z = this.theta;

        const donutRadius = this.objects.donut.geometry.parameters.radius;
        const donutTube = this.objects.donut.geometry.parameters.tube;

        this.objects.electron.position.x = Math.cos(3 * this.theta) * donutTube + donutRadius;
        this.objects.electron.position.z = Math.sin(3 * this.theta) * donutTube;
    }
}
