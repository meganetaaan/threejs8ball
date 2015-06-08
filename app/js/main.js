require({
    baseUrl: 'js',
    // three.js should have UMD support soon, but it currently does not
    shim: { 'vendor/three': { exports: 'THREE' } }
}, [
    'vendor/three'
], function(THREE) {

var scene, camera, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 300;

    var ambientLight = THREE.AmbientLight('#888888');

    //geometry = new THREE.BoxGeometry( 200, 200, 200 );
    var geometry = new THREE.SphereGeometry(100, 64, 48);
    //material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    var texture = THREE.ImageUtils.loadTexture( "res/image/eightBall.png" );
	var uniforms = {
		"texture": { type: "t", value: texture }	
	};

    var material = new THREE.ShaderMaterial( { 
            attributes  : {},
            uniforms    : uniforms,
            vertexShader	: document.getElementById( 'vertex_shader' ).textContent,
            fragmentShader	: document.getElementById( 'fragment_shader' ).textContent
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(new THREE.Color(0xf0f0f0));

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    //mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.03;

    renderer.render( scene, camera );

}

});
