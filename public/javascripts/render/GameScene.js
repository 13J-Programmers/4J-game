"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.game = window.game || {};
window.game.GameScene = function () {
    function GameScene() {
        _classCallCheck(this, GameScene);

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

    _createClass(GameScene, [{
        key: "generateLights",
        value: function generateLights() {
            // init light
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 2, 1);
            this.scene.add(light);
        }
    }, {
        key: "generateGameObjects",
        value: function generateGameObjects() {
            // init objects
            this.objects = {};
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
        }
    }, {
        key: "scene",
        get: function get() {
            return this._scene;
        }
    }, {
        key: "camera",
        get: function get() {
            return this._camera;
        }
    }, {
        key: "renderer",
        get: function get() {
            return this._renderer;
        }
    }]);

    return GameScene;
}();