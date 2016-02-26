'use strict';

const assert = require('assert');
const ee = require('../public/javascripts-es6/script/EventEmitter.es6');

let emitter;

class ObjectHasProp {
    constructor() {
        this.handled = 0;
    }

    count() {
        this.handled += 1;
    }
}

describe('EventEmitter', () => {
    beforeEach((done) => {
        emitter = new ee.EventEmitter();
        done();
    });

    describe('#addListener()', () => {
        it('should add a listener', () => {
            emitter.addListener('eventname', () => {});

            assert.equal(emitter.has('eventname'), true);
        });
    });

    describe('#on()', () => {
        it('should be alias for addListener', () => {
            emitter.on('eventname', () => {});

            assert.equal(emitter.has('eventname'), true);
        });
    });

    describe('#has()', () => {
        it('should return false if it has no listener', () => {
            assert.equal(emitter.has('eventname'), false);
        });

        it('should return true if it has listener', () => {
            emitter.on('eventname', () => {});
            assert.equal(emitter.has('eventname'), true);
        });
    });

    describe('#emit()', () => {
        it('should emit the event', () => {
            let handled1 = 0;
            let handled2 = 0;
            emitter.on('eventname', () => { handled1 += 1; });
            emitter.on('eventname', () => { handled2 += 1; });
            emitter.emit('eventname');
            emitter.emit('eventname');

            assert.equal(handled1, 2);
            assert.equal(handled2, 2);
        });

        it('should emit the event to object\'s method', () => {
            const obj = new ObjectHasProp();
            const func = () => obj.count();
            emitter.on('eventname', func);
            emitter.emit('eventname');

            assert.equal(obj.handled, 1);
        });

        it('should not throw error when emit the event which has no listeners', () => {
            assert.doesNotThrow(() => {
                emitter.emit('eventname');
            });
        });
    });

    describe('#removeListener()', () => {
        it('should remove listener', () => {
            let handled = 0;
            let func = () => handled += 1;
            emitter.on('eventname', func);
            emitter.removeListener('eventname', func);
            emitter.emit('eventname');

            assert.equal(handled, 0);
        });

        it('should not remove listener which is not added', () => {
            let handled = 0;
            let func1 = () => handled += 1;
            let func2 = () => {};
            emitter.on('eventname', func1);
            emitter.removeListener('eventname', func2);
            emitter.emit('eventname');

            assert.equal(handled, 1);
        });

        it('should remove listener on object', () => {
            const obj = new ObjectHasProp();
            const func = () => obj.count();
            emitter.on('eventname', func);
            emitter.removeListener('eventname', func);
            emitter.emit('eventname');

            assert.equal(obj.handled, 0);
        });

        it('should return false when eventname is not found', () => {
            let func = () => handled += 1;
            assert.equal(emitter.removeListener('eventname', func), false);
        });
    });
});
