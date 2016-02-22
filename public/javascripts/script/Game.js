'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Singleton
var instance = null;

window.game = window.game || {};
window.game.Game = function (_EventEmitter) {
    _inherits(Game, _EventEmitter);

    function Game() {
        _classCallCheck(this, Game);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));
    }

    _createClass(Game, [{
        key: 'setScene',
        value: function setScene(gameScene) {
            this.gameScene = gameScene;
        }
    }, {
        key: 'start',
        value: function start() {
            this.emit('start');
            this.render();
        }

        // rendering

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.emit('update');

            requestAnimationFrame(function () {
                return _this2.render();
            }); // continually invoke this
            this.gameScene.renderer.render(this.gameScene.scene, this.gameScene.camera); // render scene
        }
    }], [{
        key: 'instance',
        get: function get() {
            if (!instance) {
                instance = new Game();
            }
            return instance;
        }
    }]);

    return Game;
}(EventEmitter);