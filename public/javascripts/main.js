"use strict";

// init scene
var scene = new THREE.Scene();

// init camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 200;

// init render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// init gameScene
var gameScene = new game.GameScene(scene, camera, renderer);

new game.Player({ on: gameScene });
new game.OrbitControls({ on: gameScene });

new game.Game().setScene(gameScene);
new game.Game().start();