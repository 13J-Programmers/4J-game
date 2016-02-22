"use strict";

var mainGame = game.Game.instance;
var gameScene = new game.GameScene();

new game.Player(gameScene);
new game.OrbitControls(gameScene);

mainGame.setScene(gameScene);
mainGame.start();