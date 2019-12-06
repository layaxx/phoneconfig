// Init the scene
const scene_r = new THREE.Scene();
const scene_h = new THREE.Scene();

const canvas = document.querySelector('#c');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const WIDTH = 514;
const HEIGHT = 857;

var phone_r;
var phone_h;

const MODEL_PATH_R = "phone_r_model.glb";
const MODEL_PATH_H = "phone_h_model.glb";

var r = true;

const BACKGROUND_COLOR = 0xf1f1f1;

scene_r.background = new THREE.Color(BACKGROUND_COLOR);
scene_r.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

scene_h.background = new THREE.Color(BACKGROUND_COLOR);
scene_h.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

var cameraFar = 5;

document.body.appendChild(renderer.domElement);


// Add a camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;
renderer.setPixelRatio(1);
renderer.setSize(WIDTH, HEIGHT, false);
camera.aspect = WIDTH / HEIGHT;
camera.updateProjectionMatrix();

const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });

const INITIAL_MAP = [
    { childID: "button_top", mtl: INITIAL_MTL },
    { childID: "body", mtl: INITIAL_MTL },
    { childID: "button_home", mtl: INITIAL_MTL },
    { childID: "cam", mtl: INITIAL_MTL },
    { childID: "flash", mtl: INITIAL_MTL },
    { childID: "display", mtl: INITIAL_MTL },
];

// Init the object loader
var loader = new THREE.GLTFLoader();

loader.load(MODEL_PATH_R, function (gltf) {
    phone_r = gltf.scene;

    // Set the models initial scale   
    phone_r.scale.set(1, 1, 1);

    phone_r.rotation.x = Math.PI / 3;
    phone_r.rotation.z = - Math.PI / 10;

    // Offset the y position a bit
    phone_r.position.y = 0;

    // Set initial textures
    for (let object of INITIAL_MAP) {
        initColor(phone_r, object.childID, object.mtl);
    }

    // Add the model to the scene
    scene_r.add(phone_r);

}, undefined, function (error) {
    console.error(error)
});

loader.load(MODEL_PATH_H, function (gltf) {
    phone_h = gltf.scene;

    // Set the models initial scale   
    phone_h.scale.set(1, 1, 1);

    phone_h.rotation.x = Math.PI / 3;
    phone_h.rotation.z = - Math.PI / 10;

    // Offset the y position a bit
    phone_h.position.y = 0;

    // Set initial textures
    for (let object of INITIAL_MAP) {
        initColor(phone_h, object.childID, object.mtl);
    }

    // Add the model to the scene
    scene_h.add(phone_h);

}, undefined, function (error) {
    console.error(error)
});



// Function - Add the textures to the models
function initColor(parent, type, mtl) {
    parent.traverse((o) => {
        if (o.isMesh) {
            if (o.name.includes(type)) {
                o.material = mtl;
                o.nameID = type; // Set a new property to identify this object
            }
        }
    });
}




// Add lights to Scene1
var hemiLight_r = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight_r.position.set(0, 50, 0);
scene_r.add(hemiLight_r);
var dirLight_r = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight_r.position.set(-8, 12, 8);
dirLight_r.castShadow = true;
dirLight_r.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene_r.add(dirLight_r);


// Add lights to Scene2
var hemiLight_h = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight_h.position.set(0, 50, 0);
scene_h.add(hemiLight_h);
var dirLight_h = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight_h.position.set(-8, 12, 8);
dirLight_h.castShadow = true;
dirLight_h.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene_h.add(dirLight_h);




var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

function animate() {
    controls.update();
    if (r === true) {
        renderer.render(scene_r, camera);
    } else {
        renderer.render(scene_h, camera);
    }

    requestAnimationFrame(animate);

}

animate();


