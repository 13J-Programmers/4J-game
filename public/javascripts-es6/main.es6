
const mainGame = game.Game.instance;
const gameScene = new game.GameScene();

new game.Player(gameScene);
new game.OrbitControls(gameScene);

mainGame.setScene(gameScene);
mainGame.start();
