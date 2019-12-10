
var cam, shape, color, performance, extras, screen;
var price = 300;


cam = vars.cam;
performance = vars.perf;
extras = vars.extras;
screen = vars.screen;
color = vars.color;
shape = vars.shape;

var cam_back = Math.floor(cam / 10);
var cam_front = cam % 10;
var ss = ('' + performance)[0];
var bs = ('' + performance)[1];
var ram = ('' + performance)[2];
var cpu = ('' + performance)[3];
var os = ('' + extras)[0];
var cp = ('' + extras)[1];
var misc = ('' + extras)[2];

var error = false;
// Replace undefined with Standard-Values
if (typeof cam == 'undefined' || parseInt(cam_back, 10) > 4 || parseInt(cam_front, 10) > 4) {
    cam = '11';
    error = true;
}
if (typeof color == 'undefined') {
    color = '000000';
    error = true;
}
if (typeof shape == 'undefined' || parseInt(shape, 10) > 2) {
    shape = '1';
    error = true;
}
if (typeof performance == 'undefined' || parseInt(ss, 10) > 4 || parseInt(bs, 10) > 4 || parseInt(ram, 10) > 4 || parseInt(cpu, 10) > 4) {
    performance = '2222';
    error = true;
}
if (typeof extras == 'undefined' || parseInt(os, 10) > 3 || parseInt(cp, 10) > 3 || parseInt(misc, 10) > 3) {
    extras = '110';
    error = true;
}
if (typeof screen == 'undefined' || parseInt(screen, 10) > 4) {
    screen = '1';
}

cam_back = Math.floor(cam / 10);
cam_front = cam % 10;
ss = ('' + performance)[0];
bs = ('' + performance)[1];
ram = ('' + performance)[2];
cpu = ('' + performance)[3];
os = ('' + extras)[0];
cp = ('' + extras)[1];
misc = ('' + extras)[2];

if (error) {
    alert("One or more values were undefined and have been replaced with standard value");
    goTo(screen, true);
}

var oldVars = generateUrlVars(false);

// Initial Selection Cameras
if (cam_back == 0) {
    document.getElementById("cam_0_l").checked = true;
} else if (cam_back == 1) {
    document.getElementById("cam_1_l").checked = true;
    price += 30;
} else if (cam_back == 2) {
    document.getElementById("cam_2_l").checked = true;
    price += 60;
} else if (cam_back == 3) {
    document.getElementById("cam_3_l").checked = true;
    price += 90;
} else if (cam_back == 4) {
    document.getElementById("cam_4_l").checked = true;
    price += 120;
}


if (cam_front == 0) {
    document.getElementById("cam_0_r").checked = true;
} else if (cam_front == 1) {
    document.getElementById("cam_1_r").checked = true;
    price += 30;
} else if (cam_front == 2) {
    document.getElementById("cam_2_r").checked = true;
    price += 60;
} else if (cam_front == 3) {
    document.getElementById("cam_3_r").checked = true;
    price += 90;
} else if (cam_front == 4) {
    document.getElementById("cam_4_r").checked = true;
    price += 120;
}


// Initial Selection Performance
if (ss == 1) {
    document.getElementById("ss1").checked = true;
} else if (ss == 2) {
    document.getElementById("ss2").checked = true;
    price += 40;
} else if (ss == 3) {
    document.getElementById("ss3").checked = true;
    price += 80;
} else if (ss == 4) {
    document.getElementById("ss4").checked = true;
    price += 120;
}

if (bs == 1) {
    document.getElementById("bs1").checked = true;
} else if (bs == 2) {
    document.getElementById("bs2").checked = true;
    price += 30;
} else if (bs == 3) {
    document.getElementById("bs3").checked = true;
    price += 60;
} else if (bs == 4) {
    document.getElementById("bs4").checked = true;
    price += 90;
}

if (ram == 1) {
    document.getElementById("ram1").checked = true;
} else if (ram == 2) {
    document.getElementById("ram2").checked = true;
    price += 30;
} else if (ram == 3) {
    document.getElementById("ram3").checked = true;
    price += 60;
} else if (ram == 4) {
    document.getElementById("ram4").checked = true;
    price += 90;
}

if (cpu == 1) {
    document.getElementById("cpu1").checked = true;
} else if (cpu == 2) {
    document.getElementById("cpu2").checked = true;
    price += 30;
} else if (cpu == 3) {
    document.getElementById("cpu3").checked = true;
    price += 60;
} else if (cpu == 4) {
    document.getElementById("cpu4").checked = true;
    price += 90;
}


// Initial Selection Extras
if (os == 1) {
    document.getElementById("os1").checked = true;
} else if (os == 2) {
    document.getElementById("os2").checked = true;
    price += 40;
} else if (os == 3) {
    document.getElementById("os3").checked = true;
}

if (cp == 1) {
    document.getElementById("cp1").checked = true;
} else if (cp == 2) {
    document.getElementById("cp2").checked = true;
} else if (cp == 3) {
    document.getElementById("cp3").checked = true;
    price += 20;
}

if (misc == 1) {
    document.getElementById("misc1").checked = true;
    price += 50;
} else if (misc == 2) {
    document.getElementById("misc2").checked = true;
    price += 10;
} else if (misc == 3) {
    document.getElementById("misc1").checked = true;
    document.getElementById("misc2").checked = true;
    price += 60;
}


setPrice();

// Initialise Screen

goTo(screen, false);



function bugfix() {
    var colorRGB = hexToRgb(color);
    var relLuminance = relativeLuminanceW3C(colorRGB.r, colorRGB.g, colorRGB.b);
    if (relLuminance > 0.98) {
        document.getElementById("color_costum").value = '#bbbbbb';
    } else if (relLuminance < 0.02) {
        document.getElementById("color_costum").value = '#333333';
    }
}



function relativeLuminanceW3C(R8bit, G8bit, B8bit) {

    var RsRGB = R8bit / 255;
    var GsRGB = G8bit / 255;
    var BsRGB = B8bit / 255;

    var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

    // For the sRGB colorspace, the relative luminance of a color is defined as: 
    var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    return L;
}

function changeColorCostum() {
    var newColor = document.getElementById("color_costum").value;
    console.log(newColor);
    newColor = newColor.substr(1);
    console.log(newColor);
    changeColor(newColor);
}

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

    document.getElementById("color_costum").className = "colors";
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
    } else if (newColor == "fa5543") {
        document.getElementById("color_red").className = "activeColor";
        document.getElementById("color_red").innerHTML = "X";
    } else if (newColor == "2E86C1") {
        document.getElementById("color_blue").className = "activeColor";
        document.getElementById("color_blue").innerHTML = "X";
    } else {
        document.getElementById("color_costum").className = "activeColor";
    }
    document.getElementById("color_costum").value = '#' + newColor;
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
    r = false;
} else {
    document.getElementById("corners_round").className = "activeShape";
    document.getElementById("corners_hard").className = "shape";
    r = true;
}


function setCam(number, side) {
    if (side == 'r') {
        price -= cam_front * 30;
        cam_front = number;
        price += number * 30;
    } else if (side == 'l') {
        price -= cam_back * 30;
        cam_back = number;
        price += number * 30;
    }
    setPrice();
}

function setExtras(number, id) {
    if (id == 'os') {
        if (os == 2 && number != 2) {
            price -= 40;
        } else if (os != 2 && number == 2) {
            price += 40;
        }

        os = number;

    } else if (id == 'cp') {
        if (cp == 3 && number != 3) {
            price -= 20;
        } else if (cp != 3 && number == 3) {
            price += 20;
        }
        cp = number;
    }
    else if (id == 'misc') {
        if (misc == 1 && number == 1) {
            misc = 0;
            price -= 50;
        } else if (misc == 2 && number == 1) {
            misc = 3;
            price += 50;
        } else if (misc == 3 && number == 1) {
            misc = 2;
            price -= 50;
        } else if (misc == 1 && number == 2) {
            misc = 3;
            price += 10;
        } else if (misc == 2 && number == 2) {
            misc = 0;
            price -= 10;
        } else if (misc == 3 && number == 2) {
            misc = 2;
            price -= 10;
        } else if (misc == 0 && number == 2) {
            misc = 2;
            price += 10;
        } else if (misc == 0 && number == 1) {
            misc = 1;
            price += 50;
        }
    }
    setPrice();
}

function setPerf(number, id) {
    if (id == 'ss') {
        price -= ss * 40;
        ss = number;
        price += number * 40;
    } else if (id == 'bs') {
        price -= bs * 30;
        bs = number;
        price += number * 30;
    } else if (id == 'ram') {
        price -= ram * 30;
        ram = number;
        price += number * 30;
    } else if (id == 'cpu') {
        price -= cpu * 30;
        cpu = number;
        price += number * 30;
    }
    setPrice();
}


function setOptions(number) {
    if (number == 1) {
        if (document.getElementById("powerbanks").className == "acc") {
            document.getElementById("powerbanks").className = "activeAcc";
            price += 25;
        } else {
            document.getElementById("powerbanks").className = "acc";
            price -= 25;
        }
    } else if (number == 2) {
        if (document.getElementById("headphones").className == "acc") {
            document.getElementById("headphones").className = "activeAcc";
            price += 45;
        } else {
            document.getElementById("headphones").className = "acc";
            price -= 45;
        }
    } else if (number == 3) {
        if (document.getElementById("case").className == "acc") {
            document.getElementById("case").className = "activeAcc";
            price += 15;
        } else {
            document.getElementById("case").className = "acc";
            price -= 15;
        }
    }
    document.getElementById("finalPrice").innerHTML = "Your phone costs " + price + "€.";
}

function generateUrlVars(s) {
    var output = 'cam='
    output = output + cam_back + cam_front;
    output = output + '&color=' + color;
    output = output + '&shape=' + shape;
    output = output + '&perf=' + ss + bs + ram + cpu;
    output = output + '&extras=' + os + cp + misc;
    if (s) {
        output = output + '&screen=' + screen;
    }
    return output;
}


function setPrice() {
    document.getElementById("price").innerHTML = price + "€";
}