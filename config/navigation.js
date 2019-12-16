var addedToCart = false;

function goTo(id, redirect) {
    if (id == 1) {
        document.getElementById("design").style.display = "block";
        document.getElementById("cam").style.display = "none";
        document.getElementById("extras").style.display = "none";
        document.getElementById("performance").style.display = "none";
        document.getElementById("cart").style.display = "none";

        document.getElementById("nav_design").style.backgroundColor = "#4CAF50";
        document.getElementById("nav_cam").style.backgroundColor = "#555";
        document.getElementById("nav_extras").style.backgroundColor = "#555";
        document.getElementById("nav_performance").style.backgroundColor = "#555";
        document.getElementById("nav_cart").style.backgroundColor = "#555";
    } else if (id == 2) {
        document.getElementById("cam").style.display = "block";
        document.getElementById("design").style.display = "none";
        document.getElementById("extras").style.display = "none";
        document.getElementById("performance").style.display = "none";
        document.getElementById("cart").style.display = "none";

        document.getElementById("nav_cam").style.backgroundColor = "#4CAF50";
        document.getElementById("nav_design").style.backgroundColor = "#555";
        document.getElementById("nav_extras").style.backgroundColor = "#555";
        document.getElementById("nav_performance").style.backgroundColor = "#555";
        document.getElementById("nav_cart").style.backgroundColor = "#555";
    } else if (id == 3) {
        document.getElementById("performance").style.display = "block";
        document.getElementById("cam").style.display = "none";
        document.getElementById("extras").style.display = "none";
        document.getElementById("design").style.display = "none";
        document.getElementById("cart").style.display = "none";

        document.getElementById("nav_performance").style.backgroundColor = "#4CAF50";
        document.getElementById("nav_design").style.backgroundColor = "#555";
        document.getElementById("nav_extras").style.backgroundColor = "#555";
        document.getElementById("nav_cam").style.backgroundColor = "#555";
        document.getElementById("nav_cart").style.backgroundColor = "#555";
    } else if (id == 4) {
        document.getElementById("extras").style.display = "block";
        document.getElementById("cam").style.display = "none";
        document.getElementById("design").style.display = "none";
        document.getElementById("performance").style.display = "none";
        document.getElementById("cart").style.display = "none";

        document.getElementById("nav_extras").style.backgroundColor = "#4CAF50";
        document.getElementById("nav_design").style.backgroundColor = "#555";
        document.getElementById("nav_cam").style.backgroundColor = "#555";
        document.getElementById("nav_performance").style.backgroundColor = "#555";
        document.getElementById("nav_cart").style.backgroundColor = "#555";
    } else if (id == 5) {
        document.getElementById("cart").style.display = "block";
        document.getElementById("extras").style.display = "none";
        document.getElementById("cam").style.display = "none";
        document.getElementById("design").style.display = "none";
        document.getElementById("performance").style.display = "none";

        document.getElementById("nav_cart").style.backgroundColor = "#4CAF50";
        document.getElementById("nav_design").style.backgroundColor = "#555";
        document.getElementById("nav_cam").style.backgroundColor = "#555";
        document.getElementById("nav_performance").style.backgroundColor = "#555";
        document.getElementById("nav_extras").style.backgroundColor = "#555";

        if (addedToCart) {
            document.getElementById("finalPrice").innerHTML = "Your phone costs " + price + "€.";
            document.getElementById("messageCart").innerHTML = "Your personalized Phone was added to your cart!";
            document.getElementById("nav_cart").style.cursor = "pointer";
            document.getElementById("checkout").style.background = "#4CAF50";
            document.getElementById("checkout").style.cursor = "pointer";
            document.getElementById("nav_cart").onclick = function () { goTo(5, true) };
        }
    }
    if (redirect && generateUrlVars(false) != oldVars) {
        screen = id;
        var address = 'configurator.html?' + generateUrlVars(true);
        location.href = address;
    }
}


function addToCart() {
    addedToCart = true;
    goTo(5, true);
}

function importURL() {
    var input = prompt("Please enter your code", "");;
    var address = 'configurator.html?' + input;
    location.href = address;
}


function exportURL() {
    // Temporäres Element erzeugen
    var el = document.createElement('textarea');
    // Den zu kopierenden String dem Element zuweisen
    el.value = generateUrlVars(true);
    // Element nicht editierbar setzen und aus dem Fenster schieben
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Text innerhalb des Elements auswählen
    el.select();
    // Ausgewählten Text in die Zwischenablage kopieren
    document.execCommand('copy');
    // Temporäres Element löschen
    document.body.removeChild(el);
    alert("A save code has been copied to zour clipboard!");
}
