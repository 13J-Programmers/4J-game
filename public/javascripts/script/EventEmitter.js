'use strict';

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        // All listeners is stored to _listeners.
        // Listener is a callback function.
        // Listeners are composed of some events (each event has Listeners array)
        //
        //     { eventName:
        //         [ [Function], [Function], ... ],
        //       eventName-onceSuffix:
        //         [ [Function], [Function], ... ] }
        //
        this._listeners = {};
    }

    // the listener which is invoked only once is stored in
    // _listeners[eventName + EventEmitter.listen_once_suffix]


    _createClass(EventEmitter, [{
        key: 'listeners',


        // get listeners
        //
        // @return array which is specified event listeners
        //
        value: function listeners(eventName) {
            return this._listeners[eventName] || [];
        }

        // check if having listener
        //
        // @param  eventName : event name
        // @return true if it has event listeners
        //

    }, {
        key: 'hasListener',
        value: function hasListener(eventName) {
            return typeof this._listeners[eventName] !== 'undefined' && this._listeners[eventName] !== null && this._listeners[eventName].length > 0;
        }

        // add event listener
        //
        // @param eventName : event name
        // @param listener  : a function which is passed some arguments or no
        //

    }, {
        key: 'addListener',
        value: function addListener(eventName, listener) {
            if (!this._listeners[eventName]) {
                this._listeners[eventName] = [];
            }
            this._listeners[eventName].push(listener);
        }

        // on event
        // alias for addListener

    }, {
        key: 'on',
        value: function on(eventName, listener) {
            this.addListener(eventName, listener);
        }

        // do listener once on event
        //
        // @param eventName : event name
        // @param listener  : a function which is passed some arguments or no
        //

    }, {
        key: 'once',
        value: function once(eventName, listener) {
            this.addListener(eventName + EventEmitter.listen_once_suffix, listener);
        }

        // remove all listener from event
        //
        // @param eventName : event name
        //

    }, {
        key: 'removeListener',
        value: function removeListener(eventName) {
            var deleted = false;

            // eventName
            if (this._listeners[eventName]) {
                delete this._listeners[eventName];
                deleted = true;
            }

            // eventName-onceSuffix
            var eventOnce = eventName + EventEmitter.listen_once_suffix;
            if (this._listeners[eventOnce]) {
                delete this._listeners[eventOnce];
                deleted = true;
            }

            if (!deleted) {
                throw new Error('eventName "' + eventName + '" is not found');
            }
        }

        // issue the event
        //
        // @param eventName : event name
        // @param args      : pass to listeners
        //

    }, {
        key: 'emit',
        value: function emit(eventName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            // eventName
            if (this._listeners[eventName]) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._listeners[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var listener = _step.value;

                        listener.apply(undefined, args);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            // eventName-onceSuffix
            var eventOnce = eventName + EventEmitter.listen_once_suffix;
            if (this._listeners[eventOnce]) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this._listeners[eventOnce][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var listener = _step2.value;

                        listener.apply(undefined, args);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                delete this._listeners[eventOnce];
            }
        }
    }], [{
        key: 'listen_once_suffix',
        get: function get() {
            return '-once';
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