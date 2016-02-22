'use strict';

const assert = require('assert');
const ee = require('../public/javascripts-es6/script/EventEmitter.es6');

let emitter = undefined;

describe('EventEmitter', () => {
    beforeEach((done) => {
        emitter = new ee.EventEmitter();
        done();
    });

    describe('#addListener()', () => {
        it('should add a listener', () => {
            emitter.addListener('eventname', () => {});

            assert.ok(typeof emitter.listeners('eventname')[0] === 'function',
                'listener was not set to emitter');
        });

        it('should add listeners', () => {
            emitter.addListener('eventname', () => {});
            emitter.addListener('eventname', () => {});
            emitter.addListener('eventname2', () => {});
            emitter.addListener('eventname2', () => {});

            assert.ok(emitter.listeners('eventname').length == 2);
            assert.ok(emitter.listeners('eventname2').length == 2);
        });
    });

    describe('#on()', () => {
        it('should be alias for addListener', () => {
            emitter.on('eventname', () => {});

            assert.ok(typeof emitter.listeners('eventname')[0] === 'function',
                'listener was not set to emitter');
        });
    });

    describe('#listeners()', () => {
        it('should return array', () => {
            assert.deepEqual(emitter.listeners('notdefined'), []);

            const func = () => {};
            emitter.on('eventname', func);
            assert.deepEqual(emitter.listeners('eventname'), [func]);
        });

        it('should return listeners which is attached specified event', () => {
            const func = () => 1;
            const func2 = () => 2;
            emitter.on('eventname', func);
            emitter.on('eventname', func);
            emitter.on('eventname2', func2);

            assert.deepEqual(emitter.listeners('eventname'), [func, func]);
            assert.deepEqual(emitter.listeners('eventname2'), [func2]);
        });
    });

    describe('#hasListener()', () => {
        it('should return false if it has no listener', () => {
            assert.ok(!emitter.hasListener('eventname'));
        });

        it('should return true if it has listener', () => {
            emitter.on('eventname', () => {});
            assert.ok(emitter.hasListener('eventname'));
        });
    });

    describe('#emit()', () => {
        it('should emit the event', () => {
            let handled = 0;
            emitter.on('eventname', () => { handled += 1; });
            emitter.emit('eventname');
            emitter.emit('eventname');

            assert.ok(handled === 2, 'listener is not invoked twice');
        });

        it('should not throw error when emit the event which has no listeners', () => {
            assert.doesNotThrow(() => {
                emitter.emit('eventname');
            });
        });
    });

    describe('#once()', () => {
        it('should be invoked once', () => {
            let handled = 0;
            emitter.once('eventname', () => handled += 1);
            emitter.emit('eventname');
            emitter.emit('eventname');

            assert.ok(handled === 1, 'listener is not invoked once');
        });
    });

    describe('#removeListener()', () => {
        it('should remove all listeners on specified event', () => {
            emitter.on('eventname', () => {});
            emitter.on('eventname', () => {});
            emitter.once('eventname', () => {});
            emitter.removeListener('eventname');

            assert.deepEqual(emitter.listeners('eventname'), []);
            assert.deepEqual(emitter.listeners("eventname#{ee.EventEmitter.listen_once_suffix}"), []);
        });

        it('should throw error when eventname is not found', () => {
            assert.throws(() => {
                emitter.removeListener('notdefined');
            });
        });
    });
});
