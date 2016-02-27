'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
    // Singleton
    var _instance;

    window.game = window.game || {};
    window.game.Game = function (_EventEmitter) {
        _inherits(Game, _EventEmitter);

        function Game() {
            var _ret2;

            _classCallCheck(this, Game);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));

            if (_typeof(Game.instance) === 'object') {
                var _ret;

                return _ret = Game.instance, _possibleConstructorReturn(_this, _ret);
            }
            Game.instance = _this;
            return _ret2 = Game.instance, _possibleConstructorReturn(_this, _ret2);
        }

        _createClass(Game, [{
            key: 'set',
            value: function set(gameScene) {
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
                return _instance;
            },
            set: function set(newInstance) {
                _instance = newInstance;
            }
        }]);

        return Game;
    }(EventEmitter);
})();