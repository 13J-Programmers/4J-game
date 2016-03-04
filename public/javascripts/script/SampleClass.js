
window.game = window.game || {}
window.game.SampleClass =

class SampleClass {
    constructor() {
        console.log('hello, world from sample-class.es6');
        this.x = 0;
    }

    other() {
        this.x += 1;
    }
}
