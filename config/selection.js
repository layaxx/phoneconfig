var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
});


var cam, design, performance, extras;


cam = vars.cam;
var cam_back = ('' + cam)[0];
var cam_front = ('' + cam)[1];
var color = vars.color;
var shape = vars.shape;
performance = vars.performance;
extras = vars.extras;
var os = ('' + extras)[0];
var cp = ('' + extras)[1];
var misc = ('' + extras)[2];


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



function generateUrlVars() {


}