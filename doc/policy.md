
コーディングスタイル
=================


HTML
-----

- タブ幅はスペース2つで、ソフトタブを使います。
- CSSやJavaScriptは外部ファイルに置くようにします。


JavaScript
-----------

- ECMAScript2015(ES6)を標準で使います。
- [ES6 coding style](https://github.com/elierotenberg/coding-styles/blob/master/es6.md)
- クラスへのコメントはYUIDocの形式を積極的に使います。

~~~ js
/**
 * 動物の振る舞いをするオブジェクトを作成するクラス
 * @class Animal
 */
class Animal {
    /**
     * Animalオブジェクトの作成
     *
     * @constructor
     * @method Animal
     * @param  {String} name 動物の名前
     */
    constructor(name) {
        this.name = name;
        this.x = 0;
    }

    /**
     * 動物のx座標を移動する
     *
     * @method move
     * @param  {Number} meters 移動する距離
     * @return {Number} 移動した距離
     */
    move(meters) {
        console.log(`${this.name} moved ${meters}m.`);
        this.x += meters;
        return meters;
    }
}

let animal = new Animal("doc");
animal.move(10);
~~~
