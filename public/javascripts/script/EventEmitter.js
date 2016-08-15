
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
const _isFunction = (obj) => {
  return typeof obj == 'function';
};

class EventEmitter {
  constructor() {
    // All listeners is stored to listeners.
    this.listeners = new Map();
  }

  // check if having listener
  // return true or false
  has(eventName) {
    return this.listeners.has(eventName);
  }

  // add event listener
  addListener(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  // alias for addListener
  on(eventName, callback) {
    this.addListener(eventName, callback);
  }

  // remove listener from event
  // returns true or false
  removeListener(eventName, callback) {
    let listeners = this.listeners.get(eventName);
    let index;

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return (_isFunction(listener) && listener === callback) ?
          i = index :
          i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        this.listeners.set(eventName, listeners);
        return true;
      }
    }
    return false;
  }

  // remove all listeners from event
  removeAllListeners(eventName) {
    this.listeners.set(eventName, []);
  }

  // issue the event
  // return true or false
  emit(eventName, ...args) {
    let listeners = this.listeners.get(eventName);

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args);
      });
      return true;
    }
    return false;
  }
}

// export
if (typeof window !== 'undefined') {
  window.EventEmitter = EventEmitter;
} else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports.EventEmitter = EventEmitter;
}
