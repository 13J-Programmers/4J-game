"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.game = window.game || {};
window.game.Player = function (_game$MonoBehavior) {
    _inherits(Player, _game$MonoBehavior);

    function Player(gameScene) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this));

        _this.gameScene = gameScene;
        _this.theta = 0;
        return _this;
    }

    _createClass(Player, [{
        key: "start",
        value: function start() {
            // init objects
            this.objects = {};
            var geometry = undefined,
                material = undefined;

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
            this.objects.lines.left = new THREE.Mesh(geometry, material);
            var lineLength = this.objects.lines.right.geometry.parameters.height;
            var donutRadius = this.objects.donut.geometry.parameters.radius;
            this.objects.lines.left.position.x = -(donutRadius + lineLength / 2);
            this.objects.lines.right.position.x = donutRadius + lineLength / 2;
            this.objects.lines.left.rotation.z = -90 * Math.PI / 180;
            this.objects.lines.right.rotation.z = 90 * Math.PI / 180;
            this.objects.player.add(this.objects.lines.left);
            this.objects.player.add(this.objects.lines.right);
        }
    }, {
        key: "update",
        value: function update() {
            this.theta += 1 * Math.PI / 180;
            this.objects.donut.rotation.z = this.theta;

            var donutRadius = this.objects.donut.geometry.parameters.radius;
            var donutTube = this.objects.donut.geometry.parameters.tube;

            this.objects.electron.position.x = Math.cos(3 * this.theta) * donutTube + donutRadius;
            this.objects.electron.position.z = Math.sin(3 * this.theta) * donutTube;
        }
    }]);

    return Player;
}(game.MonoBehavior);