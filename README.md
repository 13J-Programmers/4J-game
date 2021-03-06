# ruNNing AWay

[![Circle CI](https://circleci.com/gh/13J-Programmers/4J-game/tree/master.svg?style=shield)](https://circleci.com/gh/13J-Programmers/4J-game/tree/master)
[![Code Climate](https://codeclimate.com/github/13J-Programmers/4J-game/badges/gpa.svg)](https://codeclimate.com/github/13J-Programmers/4J-game)
[![Test Coverage](https://codeclimate.com/github/13J-Programmers/4J-game/badges/coverage.svg)](https://codeclimate.com/github/13J-Programmers/4J-game/coverage)
[![Issue Count](https://codeclimate.com/github/13J-Programmers/4J-game/badges/issue_count.svg)](https://codeclimate.com/github/13J-Programmers/4J-game)


文化祭クラス企画展示用のゲーム

- [ゲームで遊ぶ on gh-pages（優先）](http://13j-programmers.github.io/4J-game/public/index.html)
- [ゲームで遊ぶ on heroku](http://n4js.herokuapp.com/)
- [implement game -- project](https://github.com/13J-Programmers/4J-game/projects/1)

![スクリーンショット1](public/images/screen1.png)
![スクリーンショット2](public/images/screen2.png)


Feature
-------

- ブラウザ上で遊べる
- 手で操作し（LeapMotionが必要）、迫り来るドアを次々と開けながら時間内でどれだけ進めるか競うゲーム
- ゲームデザインはホラー系。ただし怖くはない


Basic Operation
---------------

- `>` 右手を右にスライドさせる
- `<` 左手を左にスライドさせる
- `^` 片手を上に持ち上げる
- `∨ ∧` ハンドルを回すように、左手と右手をそれぞれ上下に動かす
- `⊿` 左手を奥に押すように動かす


Environment
------------

### Browser

動作環境は、ES2015のJavaScriptが動作するブラウザを前提にしています。
（2016年7月15日の時点で）動作するブラウザのバージョンは次の通りです。

- Chrome 49+
- FireFox 45+
- Edge 13+
- Safari 10+

（2016年7月15日の時点で）動作しないブラウザは次の通りです。

- IE
- Safari 9
- Android Browser
- iOS Safari

### Server

ES2015が動くNodeのバージョンは、6.0以上です。

- Node 6.0+


Debug Option
------------

開発者向けのデバッグオプションを用意しておきました。
使い方は `/game?オプション名=値&オプション名2=値2`

- `screen-wait-time`（int）: タイトルを表示させるまでの待機時間。デフォルトは 1（秒）
- `play-time`（int）: ゲームのプレイ時間。デフォルトは 30（秒）
- `a` (float) : プレーヤの加速度（0.005 ~ 0.01くらいが妥当）
- `show-result-time` (int) : リザルト画面の表示時間（秒）
- `orbit`（boolean）：マウスによるカメラ移動・回転の許可。デフォルトは false


Contributing
------------

1. Fork it ( https://github.com/13J-Programmers/4J-game )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request


Contact us
----------

If you have any questions, please ask us ([issues](https://github.com/13J-Programmers/4J-game/issues), [slack](https://n13decs.slack.com/))
