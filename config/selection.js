
var cam, design, performance, extras;


cam = vars.cam;
var cam_back = Math.floor(cam / 10);
var cam_front = cam % 10;
var color = vars.color;
var shape = vars.shape;
performance = vars.perf;
var ss = ('' + performance)[0];
var bs = ('' + performance)[1];
var ram = ('' + performance)[2];
var cpu = ('' + performance)[3];
extras = vars.extras;
var os = ('' + extras)[0];
var cp = ('' + extras)[1];
var misc = ('' + extras)[2];

// Initial Selection Cameras
if (cam_back == 0) {
    document.getElementById("cam_0_l").checked = true;
} else if (cam_back == 1) {
    document.getElementById("cam_1_l").checked = true;
} else if (cam_back == 2) {
    document.getElementById("cam_2_l").checked = true;
} else if (cam_back == 3) {
    document.getElementById("cam_3_l").checked = true;
} else if (cam_back == 4) {
    document.getElementById("cam_4_l").checked = true;
}


if (cam_front == 0) {
    document.getElementById("cam_0_r").checked = true;
} else if (cam_front == 1) {
    document.getElementById("cam_1_r").checked = true;
} else if (cam_front == 2) {
    document.getElementById("cam_2_r").checked = true;
} else if (cam_front == 3) {
    document.getElementById("cam_3_r").checked = true;
} else if (cam_front == 4) {
    document.getElementById("cam_4_r").checked = true;
}


// Initial Selection Performance
if (ss == 1) {
    document.getElementById("ss1").checked = true;
} else if (ss == 2) {
    document.getElementById("ss2").checked = true;
} else if (ss == 3) {
    document.getElementById("ss3").checked = true;
} else if (ss == 4) {
    document.getElementById("ss4").checked = true;
}

if (bs == 1) {
    document.getElementById("bs1").checked = true;
} else if (bs == 2) {
    document.getElementById("bs2").checked = true;
} else if (bs == 3) {
    document.getElementById("bs3").checked = true;
} else if (bs == 4) {
    document.getElementById("bs4").checked = true;
}

if (ram == 1) {
    document.getElementById("ram1").checked = true;
} else if (ram == 2) {
    document.getElementById("ram2").checked = true;
} else if (ram == 3) {
    document.getElementById("ram3").checked = true;
} else if (ram == 4) {
    document.getElementById("ram4").checked = true;
}

if (cpu == 1) {
    document.getElementById("cpu1").checked = true;
} else if (cpu == 2) {
    document.getElementById("cpu2").checked = true;
} else if (cpu == 3) {
    document.getElementById("cpu3").checked = true;
} else if (cpu == 4) {
    document.getElementById("cpu4").checked = true;
}


// Initial Selection Extras
if (os == 1) {
    document.getElementById("os1").checked = true;
} else if (os == 2) {
    document.getElementById("os2").checked = true;
} else if (os == 3) {
    document.getElementById("os3").checked = true;
}

if (cp == 1) {
    document.getElementById("cp1").checked = true;
} else if (cp == 2) {
    document.getElementById("cp2").checked = true;
} else if (cp == 3) {
    document.getElementById("cp3").checked = true;
}

if (misc == 1) {
    document.getElementById("misc1").checked = true;
} else if (misc == 2) {
    document.getElementById("misc2").checked = true;
} else if (misc == 3) {
    document.getElementById("misc1").checked = true;
    document.getElementById("misc2").checked = true;
}


var LightenColor = function (color, percent) {
    var num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;

    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};


function changeColor(newColor) {
    // TODO: Change Color
    mtl_body = new THREE.MeshPhongMaterial({ color: parseInt('0x' + newColor), shininess: 10 });
    if (r) {
        setMaterial(phone_r, 'body', mtl_body);
    } else {
        setMaterial(phone_h, 'body', mtl_body);
    }
    var newLighterColor = LightenColor(newColor, 7);
    mtl_home = new THREE.MeshPhongMaterial({ color: parseInt('0x' + newLighterColor), shininess: 10 });
    if (r) {
        setMaterial(phone_r, 'button_home', mtl_home);
    } else {
        setMaterial(phone_h, 'button_home', mtl_home);
    }

    document.getElementById("color_black").className = "colors";
    document.getElementById("color_white").className = "colors";
    document.getElementById("color_red").className = "colors";
    document.getElementById("color_blue").className = "colors";
    document.getElementById("color_black").innerHTML = "";
    document.getElementById("color_white").innerHTML = "";
    document.getElementById("color_red").innerHTML = "";
    document.getElementById("color_blue").innerHTML = "";
    if (newColor == "000000") {
        document.getElementById("color_black").className = "activeColor";
        document.getElementById("color_black").innerHTML = "X";
    } else if (newColor == "FFFFFF") {
        document.getElementById("color_white").className = "activeColor";
        document.getElementById("color_white").innerHTML = "X";
    } else if (newColor == "FF0000") {
        document.getElementById("color_red").className = "activeColor";
        document.getElementById("color_red").innerHTML = "X";
    } else if (newColor == "0000FF") {
        document.getElementById("color_blue").className = "activeColor";
        document.getElementById("color_blue").innerHTML = "X";
    }
    color = newColor;
}




function hardCorners() {
    document.getElementById("corners_hard").className = "activeShape";
    document.getElementById("corners_round").className = "shape";
    r = false;
    shape = 1;
    changeColor(color);
}

function roundCorners() {
    document.getElementById("corners_round").className = "activeShape";
    document.getElementById("corners_hard").className = "shape";
    r = true;
    shape = 2;
    changeColor(color);
}

function generateUrlVars() {


}

function setMaterial(parent, type, mtl) {
    parent.traverse((o) => {
        if (o.isMesh && o.nameID != null) {
            if (o.nameID == type) {
                o.material = mtl;
            }
        }
    });
}


// Initial Selection Design
if (shape == 1) {
    document.getElementById("corners_hard").className = "activeShape";
    document.getElementById("corners_round").className = "shape";
} else {
    document.getElementById("corners_round").className = "activeShape";
    document.getElementById("corners_hard").className = "shape";
    r = true;
}


