// Init the scene
const scene_r = new THREE.Scene();
const scene_h = new THREE.Scene();

const canvas = document.querySelector('#c');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const WIDTH = innerWidth * 0.30;
const HEIGHT = innerHeight;
var frameCount = 0;

var phone_r;
var phone_h;

const MODEL_PATH_R = "../media/models/phone_r_model.glb";
const MODEL_PATH_H = "../media/models/phone_h_model.glb";

var r = true;
var running = false;

const BACKGROUND_COLOR = 0xf1f1f1;

scene_r.background = new THREE.Color(BACKGROUND_COLOR);
scene_r.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

scene_h.background = new THREE.Color(BACKGROUND_COLOR);
scene_h.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

var cameraFar = 5;

document.body.appendChild(renderer.domElement);


var LightenColor = function (color, percent) {
    var num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;

    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Add a camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;
renderer.setPixelRatio(1);
renderer.setSize(WIDTH, HEIGHT, false);
camera.aspect = WIDTH / HEIGHT;
camera.updateProjectionMatrix();


var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
});


const MTL_INITIAL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });
const MTL_CAM = new THREE.MeshPhongMaterial({ color: 0xE7E7E7, shininess: 10 });
const MTL_FLASH = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 10 });
const MTL_TOP = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });
var mtl_home = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });
const MTL_DISPLAY = new THREE.MeshPhongMaterial({ color: 0x1D1D1D, shininess: 10 });
var mtl_body = new THREE.MeshPhongMaterial({ color: '#' + vars.color, shininess: 10 });

if (vars.color == "000000") {
    document.getElementById("color_black").className = "activeColor";
    document.getElementById("color_black").innerHTML = "X";
} else if (vars.color == "FFFFFF") {
    document.getElementById("color_white").className = "activeColor";
    document.getElementById("color_white").innerHTML = "X";
} else if (vars.color == "fa5543") {
    document.getElementById("color_red").className = "activeColor";
    document.getElementById("color_red").innerHTML = "X";
} else if (vars.color == "2E86C1") {
    document.getElementById("color_blue").className = "activeColor";
    document.getElementById("color_blue").innerHTML = "X";
} else {
    document.getElementById("color_costum").className = "activeColor";
}
document.getElementById("color_costum").value = '#' + vars.color;

var lighterColor = LightenColor(vars.color, 7);
mtl_home = new THREE.MeshPhongMaterial({ color: parseInt('0x' + lighterColor), shininess: 10 });

var mtl_map = [
    { childID: "button_top", mtl: MTL_TOP },
    { childID: "body", mtl: mtl_body },
    { childID: "button_home", mtl: mtl_home },
    { childID: "cam", mtl: MTL_CAM },
    { childID: "flash", mtl: MTL_FLASH },
    { childID: "display", mtl: MTL_DISPLAY },
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
    for (let object of mtl_map) {
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
    for (let object of mtl_map) {
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

    if (frameCount % 50 == 0) {
        renderer.setSize(innerWidth * .29, innerHeight, false);
        camera.aspect = (innerWidth * .29) / innerHeight;
        camera.updateProjectionMatrix();
        frameCount = 1;
    }
    frameCount++;
    running = true;
    requestAnimationFrame(animate);

}

animate();


