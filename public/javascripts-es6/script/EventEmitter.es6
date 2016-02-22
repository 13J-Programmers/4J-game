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
class EventEmitter {
    constructor() {
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
    static get listen_once_suffix() {
        return '-once';
    }

    // get listeners
    //
    // @return array which is specified event listeners
    //
    listeners(eventName) {
        return this._listeners[eventName] || [];
    }

    // check if having listener
    //
    // @param  eventName : event name
    // @return true if it has event listeners
    //
    hasListener(eventName) {
        return typeof this._listeners[eventName] !== 'undefined' &&
            this._listeners[eventName] !== null &&
            this._listeners[eventName].length > 0;
    }

    // add event listener
    //
    // @param eventName : event name
    // @param listener  : a function which is passed some arguments or no
    //
    addListener(eventName, listener) {
        if (!this._listeners[eventName]) {
            this._listeners[eventName] = [];
        }
        this._listeners[eventName].push(listener);
    }

    // on event
    // alias for addListener
    on(eventName, listener) {
        this.addListener(eventName, listener);
    }

    // do listener once on event
    //
    // @param eventName : event name
    // @param listener  : a function which is passed some arguments or no
    //
    once(eventName, listener) {
        this.addListener(eventName + EventEmitter.listen_once_suffix, listener);
    }

    // remove all listener from event
    //
    // @param eventName : event name
    //
    removeListener(eventName) {
        let deleted = false;

        // eventName
        if (this._listeners[eventName]) {
            delete this._listeners[eventName];
            deleted = true;
        }

        // eventName-onceSuffix
        const eventOnce = eventName + EventEmitter.listen_once_suffix;
        if (this._listeners[eventOnce]) {
            delete this._listeners[eventOnce];
            deleted = true;
        }

        if (!deleted) {
            throw new Error(`eventName "${eventName}" is not found`);
        }
    }

    // issue the event
    //
    // @param eventName : event name
    // @param args      : pass to listeners
    //
    emit(eventName, ...args) {
        // eventName
        if (this._listeners[eventName]) {
            for (let listener of this._listeners[eventName]) {
                listener(...args);
            }
        }

        // eventName-onceSuffix
        const eventOnce = eventName + EventEmitter.listen_once_suffix;
        if (this._listeners[eventOnce]) {
            for (let listener of this._listeners[eventOnce]) {
                listener(...args);
            }
            delete this._listeners[eventOnce];
        }
    }
}

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
