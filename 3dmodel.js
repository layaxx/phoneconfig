// Init the scene
const scene = new THREE.Scene();

const canvas = document.querySelector('#c');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);

var phone;
// const MODEL_PATH = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/chair.glb";
const MODEL_PATH = "phone_h_model.glb";

const BACKGROUND_COLOR = 0xf1f1f1;

scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

var cameraFar = 5;

document.body.appendChild(renderer.domElement);

// Add a camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;

const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });

const INITIAL_MAP = [
    { childID: "button_top", mtl: INITIAL_MTL },
    { childID: "phone_h_body", mtl: INITIAL_MTL },
    { childID: "button_home", mtl: INITIAL_MTL },
    { childID: "cam", mtl: INITIAL_MTL },
    { childID: "flash", mtl: INITIAL_MTL },
    { childID: "phone_h_display", mtl: INITIAL_MTL },
];

// Init the object loader
var loader = new THREE.GLTFLoader();

loader.load(MODEL_PATH, function (gltf) {
    phone = gltf.scene;

    // Set the models initial scale   
    phone.scale.set(1, 1, 1);

    phone.rotation.x = Math.PI / 3;
    phone.rotation.z = - Math.PI / 10;

    // Offset the y position a bit
    phone.position.y = 0;

    // Set initial textures
    for (let object of INITIAL_MAP) {
        initColor(phone, object.childID, object.mtl);
    }

    // Add the model to the scene
    scene.add(phone);

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


// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene   
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
scene.add(dirLight);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {

        renderer.setSize(width, height, false);
    }
    return needResize;
}

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
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}

animate();


