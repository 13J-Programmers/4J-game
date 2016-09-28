var camera, scene, renderer,
particle1, particle2, particle2,
light1, light2, light3, light4,
light5, light6, light7, light8,
object, door, knob, lamp, lamptube, loadervar, spotLight, spotLight2;

var clock = new THREE.Clock();

init();
animate();

function init() {

  var container = document.getElementById( 'container' );
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 100;
  scene = new THREE.Scene();

  var callback = function( geometry ) {
    object = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x555555, specular: 0x111111, shininess: 50 }  )  );
    object.scale.x = object.scale.y = object.scale.z = 0.80;
    scene.add( object );
  };

  // ==Door==
  var geometry = new THREE.BoxGeometry(36,55,1);
  var material = new THREE.MeshStandardMaterial( { color: 0x222222 } );
  door = new THREE.Mesh( geometry, material );
  scene.add( door );
  door.position.y = -5;

  // ==Lamp Tube==
  var geometry = new THREE.CylinderGeometry(0.6,0.6,30,32);
  var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
  lamptube = new THREE.Mesh( geometry, material );
  scene.add( lamptube );
  lamptube.rotation.z = Math.PI/2;
  lamptube.position.y = 30;

  // ==Lamp Shade==
  var geometry = new THREE.BoxGeometry(34,1.5,4);
  var material = new THREE.MeshStandardMaterial( { color: 0xCCCCCC } );
  lamp = new THREE.Mesh( geometry, material );
  scene.add( lamp );
  lamp.position.y = 31.5;


  // ==Door Knob==
  // var geometry = new THREE.CylinderGeometry(1,1,5,32);
  // var material = new THREE.MeshStandardMaterial( { color: 0x222222 } );
  // knob = new THREE.Mesh( geometry, material );
  // scene.add( knob );
  // knob.rotation.x = Math.PI/2;
  // knob.position.x = 13.5;
  // knob.position.y = -5;
  // knob.position.z = 10;

  var sphere = new THREE.SphereGeometry( 0.1, 16, 8 );

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  directionalLight.position.set( 0, -1, 0 );
  scene.add( directionalLight );

  spotLight = new THREE.SpotLight( 0xFFFAF0 );
  spotLight.position.set( 0, 40, 100 );
  // spotLight.position = lamp.position;
  spotLight.target = door;
  scene.add( spotLight );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth*0.8, window.innerHeight );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth*0.8, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  render();

}


function render() {

  var time = Date.now() * 0.005;
  var delta = clock.getDelta();

  if( object ) object.rotation.y -= 0.5 * delta;

  console.log((time%10) * Math.random() );

  if ((time%10) * Math.random() < 0.2) {
    // door.rotation.y += delta;
    spotLight.intensity  =  0.6;
    // spotLight2.intensity =  0.6;
  }
  else {
    spotLight.intensity  =  2.3 + Math.sin( time * 0.3 ) *0.1;
    // spotLight2.intensity =  1.8 + Math.sin( time * 0.3 ) *0.1;
  }

  renderer.render( scene, camera );

}