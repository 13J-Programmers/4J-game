'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
// EventEmitter -- emit event for event-driven programming
//
// All classes which emit event will extend the EventEmitter class
//
// Usage:
//
//     class Sample extends EventEmitter { ... }
//     const sample = new Sample();
//     sample.on('sampleEvent', (arg) => {
//         console.log(`callback function is passed with ${arg}`);
//     });
//     sample.emit('sampleEvent', 123);
//

// private functions

// object to test whether or not it is a function
var _isFunction = function _isFunction(obj) {
    return typeof obj == 'function' || false;
};

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        // All listeners is stored to listeners.
        this.listeners = new Map();
    }

    // check if having listener
    // return true or false


    _createClass(EventEmitter, [{
        key: 'has',
        value: function has(eventName) {
            return this.listeners.has(eventName);
        }

        // add event listener

    }, {
        key: 'addListener',
        value: function addListener(eventName, callback) {
            if (!this.listeners.has(eventName)) {
                this.listeners.set(eventName, []);
            }
            this.listeners.get(eventName).push(callback);
        }

        // alias for addListener

    }, {
        key: 'on',
        value: function on(eventName, callback) {
            this.addListener(eventName, callback);
        }

        // remove listener from event
        // returns true or false

    }, {
        key: 'removeListener',
        value: function removeListener(eventName, callback) {
            var listeners = this.listeners.get(eventName);
            var index = undefined;

            if (listeners && listeners.length) {
                index = listeners.reduce(function (i, listener, index) {
                    return _isFunction(listener) && listener === callback ? i = index : i;
                }, -1);

                if (index > -1) {
                    listeners.splice(index, 1);
                    this.listeners.set(eventName, listeners);
                    return true;
                }
            }
            return false;
        }

        // issue the event
        // return true or false

    }, {
        key: 'emit',
        value: function emit(eventName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.listeners.get(eventName);

            if (listeners && listeners.length) {
                listeners.forEach(function (listener) {
                    listener.apply(undefined, args);
                });
                return true;
            }
            return false;
        }
    }]);

    return EventEmitter;
}();

try {
    window.EventEmitter = EventEmitter;
} catch (e) {
    // suppress error on mocha
}

try {
    module.exports.EventEmitter = EventEmitter;
} catch (e) {
    // suppress error on browser
}