# 4J-game

[![Circle CI](https://circleci.com/gh/13J-Programmers/4J-game/tree/master.svg?style=shield)](https://circleci.com/gh/13J-Programmers/4J-game/tree/master)
[![Code Climate](https://codeclimate.com/github/13J-Programmers/4J-game/badges/gpa.svg)](https://codeclimate.com/github/13J-Programmers/4J-game)
[![Test Coverage](https://codeclimate.com/github/13J-Programmers/4J-game/badges/coverage.svg)](https://codeclimate.com/github/13J-Programmers/4J-game/coverage)
[![Issue Count](https://codeclimate.com/github/13J-Programmers/4J-game/badges/issue_count.svg)](https://codeclimate.com/github/13J-Programmers/4J-game)


文化祭クラス企画展示用のゲーム

[開発中のサイト](https://n4js.herokuapp.com/)


Feature
-------

- ブラウザ上で遊べる
- オブジェクトの傾きを手で操作し、障害物を避けながら進む前後スクロールなゲーム


TODO
-----

展示本体に関するTODO

- [ ] ゲーム名の決定
- [ ] 三次元モデルの作成
    - または代替となるオブジェクトの描画の検討
- [x] プログラムの設計
- [ ] クラス間の連携の枠組み
    - [x] GameクラスとMonoBehaviorクラスの作成
    - [x] GameクラスのSingleton化
        - `new Game()` は常に同じインスタンスを返す
        - クロージャによって、インスタンスを保存するフィールドをプライベートにする
    - [x] SceneのRender処理方法
        - MonoBehaviorのstart()とupdate()は、Gameのstartイベントとupdateイベントにハンドラとして登録される
        - MonoBehaviorは、画面描画に関する情報を持つGameSceneのインスタンスgameSceneをフィールドとして持っている
        - GameSceneへの設定方法は `new ObjectWillBeRendered().setOn(sceneName)` にする
        - MonoBehaviorのstart()やupdate()内に、gameSceneの内容を操作する処理を加えて画面描画に動きを加える
    - [x] MonoBehavior#constructor()がstart()とupdate()をGameのイベントハンドラに登録する
    - [x] MonoBehavior#destructor()は登録されたイベントハンドラを削除する
    - [x] MonoBehavior#setOn()は、自身の描画を行うSceneを設定する
    - [x] ゲーム初期化時に全MonoBehaviorのstart()を実行する
    - [x] render()周りの骨組み（イベント駆動で全MonoBehaviorのupdate()メソッドをrender()から呼ぶ）
    - [ ] GameManagerの作成
    - [ ] FieldGeneratorの作成
    - [ ] PlayerとControllerの作成
- [ ] プレイヤーの操作
    - [ ] キーボードによる操作
    - [ ] LeapMotionによる操作
    - [ ] 置き換え可能な操作デバイスとそれを扱うコード


Contributing
------------

1. Fork it ( https://github.com/13J-Programmers/4J-game )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request


Contact us
----------

If you have any questions, please ask us ([issues](https://github.com/13J-Programmers/4J-game/issues), slack)
