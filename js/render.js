var container;

var camera, scene, renderer;

var mesh, lightMesh, geometry;
var objects = [];

var directionalLight, pointLight;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var sign = Math.round(Math.random()) * 2 - 1;


document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 135, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z = sign*2500;
    camera.setLens(22);

    scene = new THREE.Scene();

    var path = "img/env/";
    var format = '.jpg';
    var urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
    ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls );

    var geometries = [
        new THREE.IcosahedronGeometry(1000),
        new THREE.SphereGeometry( 1000, 32, 16 ),
        new THREE.TetrahedronGeometry(1000),
        new THREE.SphereGeometry( 1000, 32, 16 ),
        new THREE.TorusKnotGeometry(1000, 100, 128)
    ];

    var materials = [
        new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, envMap: textureCube, reflectivity: .25 } ),
        new THREE.MeshLambertMaterial( { wireframe: true, wireframeLinewidth: 2, emissive: 0xffffff } ),
        new THREE.MeshLambertMaterial( { wireframe: true, wireframeLinewidth: 10, emissive: 0xffffff } ),
        new THREE.MeshLambertMaterial(),
        new THREE.MeshLambertMaterial( { envMap: textureCube } )
    ];

    for ( var i = 0; i < materials.length; i ++ ) {

        var mesh = new THREE.Mesh( geometries[i], materials[i] );

        mesh.position.x = Math.random() * 10000 - 5000;
        mesh.position.y = Math.random() * 10000 - 5000;
        mesh.position.z = Math.random() * 10000 - 5000;

        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.pow(1.75, i);

        scene.add( mesh );

        objects.push( mesh );

    }

    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;

    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        side: THREE.BackSide

    } ),

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
    scene.add(mesh);

    scene.add(new THREE.HemisphereLight(0xeeeeee, 0x111111, 1));

    renderer = new THREE.WebGLRenderer();
    container.appendChild( renderer.domElement );

    var width = window.innerWidth || 2;
    var height = window.innerHeight || 2;

    renderer.setSize( width, height );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) * 20;
    mouseY = ( event.clientY - windowHalfY ) * 20;

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    var timer = 0.0001 * Date.now();

    camera.position.x += ( -sign*mouseX - camera.position.x ) * .05;
    camera.position.y += ( mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    for ( var i = 0, il = objects.length; i < il; i ++ ) {

        var object = objects[ i ];

        object.position.x = 10000 * Math.pow(-1, i+1) * Math.cos( timer + i );
        object.position.y = 5000 * Math.sin( timer + i * 1.1 );
        object.position.z = 5000 * Math.pow(-1, i+1) * Math.cos( timer + i );
        object.rotation.x += Math.pow(-1, i+1) * 0.005;
        object.rotation.y += Math.pow(-1, i+1) * -0.00025;

    }

    renderer.render( scene, camera );

}
