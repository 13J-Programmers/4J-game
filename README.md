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
- [ ] クラス間の連携の枠組み（GameクラスとMonoBehaviorクラス）の作成
    - [x] ゲーム初期化時に全MonoBehaviorのstart()を実行する
    - [x] render()周りの骨組み（イベント駆動で全MonoBehaviorのupdate()メソッドをrender()から呼ぶ）
    - [x] MonoBehavior#constructor()がstart()とupdate()をGameのイベントハンドラに登録する
    - [ ] テストの追加
    - [ ] イベントハンドラに登録されたupdate()を持つインスタンスが削除された時の振る舞いの確認
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
