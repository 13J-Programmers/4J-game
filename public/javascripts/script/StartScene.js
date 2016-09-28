
let fontLoader = new THREE.FontLoader();

window.game = window.game || {}
window.game.StartScene =

class StartScene extends game.MonoBehavior {
  constructor() {
    super();
    this.gameScene = {};
    this.objects = {};
  }

  start() {
    let geometry, material;

    // put start scene
    geometry = new THREE.BoxGeometry(500, 200, 0);
    material = new THREE.MeshBasicMaterial({ color: 0x231f20 });
    this.objects.root = new THREE.Mesh(geometry, material);
    this.objects.root.position.z += game.settings['dist-between-doors'];
    this.gameScene.scene.add(this.objects.root);

    // put title "ruNNing AWay" (~= "coNNeCTing")
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
      geometry = new THREE.TextGeometry("ruNNing AWay", {
        size: 10,
        height: 0.1,
        curveSegments: 3,
        font: font,
        weight: "normal",
        style: "normal"
      });
      material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      this.objects.titleText = new THREE.Mesh(geometry, material);
      this.objects.titleText.position.x -= 50;
      this.objects.titleText.position.y += 30;
      this.objects.root.add(this.objects.titleText);
    }.bind(this));
  }

  update() {
    //
  }

  showTitle() {
    $('titlePane').show();
  }

  hideTitle() {
    $('titlePane').hide();
  }
}
