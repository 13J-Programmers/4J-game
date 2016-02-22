
プログラムの設計
=============

サーバ側
-------

routing

- / -> /index
- /index
- /game/title
- /game/main
- /game/result
- /game/score-ranking

ゲーム側
-------

### 配置

シーンの描画のためのプログラムと、ゲームの処理を行うプログラムを分けて管理します。
具体的には次のような分け方です。

    ├── main.js  プログラム実行のための窓口。内部で render/*.js と script/*.js を利用する
    ├── render/  描画関連
    │   ├── scene.js
    │   ├── scene2.js
    │   └── ...
    └── script/  プログラム関連
        ├── class.js
        ├── class2.js
        └── ...

ゲームのプログラムファイルの読み込みはimportやexportを使わず、scriptタグで行います。
（多くのブラウザでimport構文が実装されたら、importを使うかも）

~~~ html
<!DOCTYPE html>
<html>
  <head>
    <script src="public/javascripts/render/scene.js"></script>
    <script src="public/javascripts/render/scene2.js"></script>
    <script src="public/javascripts/script/class.js"></script>
    <script src="public/javascripts/script/class2.js"></script>
  </head>
  <body>
    <script src="public/javascripts/main.js"></script>
  </body>
</html>
~~~

### ゲーム機能

必要なモジュール一覧

- EventEmitter
    - イベント駆動開発用に作成
    - イベントハンドラの登録と、イベントの発火の機能を提供する（Observerパターン）
    - 継承して利用されることが前提
- MonoBehavior
    - UnityのMonoBehaviorのパクリ
    - awake()とstart()とupdate()を提供する（[Unity - MonoBehaviour](http://docs.unity3d.com/ScriptReference/MonoBehaviour.html)）
    - awake() はスクリプトのロード時に実行される
    - start() はゲーム開始時に実行される
    - update() はmainのrender()で実行される
    - 継承されることが前提
- Game
    - 一番最初に呼び出される
    - render()メソッドを持つ
    - ゲーム終了後、game/resultに遷移する
- GameManager
    - スコアや制限時間の管理
    - ゲームオーバーの判定
- FieldGenerator
    - ステージの自動作成
    - フィールドに出現するオブジェクトを表現するクラスを作成する予定
- Player
    - プレイヤーが操作するオブジェクト
    - 主にレンダリングの処理を記述
    - 操作は Controllerクラスを継承したクラスによって行われる（Strategyパターン）
- Controller
    - Playerを操作する方法（API）を定義した抽象クラス
    - デフォルトでエラーを投げるメソッドを定義して、必ずオーバーライドされるようにする
- KeyController
    - KeyBoardによる操作の実装
- LeapController
    - LeapMotionによる操作の実装

~~~
class fig

    game/title             
        |                  
        |                  
        |                  
        |                  
        ∨        game-start
    game/main -------------------> Game <>---------------+ awake()  
        |                          ∧  |                  | start()  
        |                game-over |  | use              | update()
        |                          |  ∨                  ∨          
        |                          |  GameScene     MonoBehavior    
        |                          |                     Δ          
        |                          |                     | extends  
        |                          |     +---------------+          
        |                          |     |               |          
        |                       GameManager              |          
        |                            |                   |          
        |                            | manage            |          
        |                 +----------+----------------+  |          
        |                 |                           |  |          
        |                 |   +--------------+--------|--+---------------+
        |                 |   |              |        |  |               |
        |                 ∨   |   create     |        ∨  |     has       |
        |            FieldGenerator --> gameObjects  Player <>-----> Controller
        |                                                                Δ
        |                                                                | extends
        |                                                          +-----+-----+
        |                                                          |           |
        |                                                  KeyController   LeapController
        |                                
        ∨                                
    game/result                          

-+|<∨∧>Δ
~~~
