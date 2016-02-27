'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.game = window.game || {};
window.game.MonoBehavior = function () {
    function MonoBehavior() {
        var _this = this;

        _classCallCheck(this, MonoBehavior);

        new game.Game().on('start', function () {
            return _this.start();
        });
        this._updateProcess = function () {
            return _this.update();
        };
        new game.Game().on('update', this._updateProcess);
    }

    _createClass(MonoBehavior, [{
        key: 'start',
        value: function start() {
            //
        }
    }, {
        key: 'update',
        value: function update() {
            //
        }
    }, {
        key: 'destructor',
        value: function destructor() {
            new game.Game().removeListener('update', this._updateProcess);
        }
    }]);

    return MonoBehavior;
}();