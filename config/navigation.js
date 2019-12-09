function goToCam() {
    document.getElementById("cam").style.display = "block";
    document.getElementById("design").style.display = "none";
    document.getElementById("extras").style.display = "none";
    document.getElementById("performance").style.display = "none";

    document.getElementById("nav_cam").style.backgroundColor = "#4CAF50";
    document.getElementById("nav_design").style.backgroundColor = "#555";
    document.getElementById("nav_extras").style.backgroundColor = "#555";
    document.getElementById("nav_performance").style.backgroundColor = "#555";
}

function goToDesign() {
    document.getElementById("design").style.display = "block";
    document.getElementById("cam").style.display = "none";
    document.getElementById("extras").style.display = "none";
    document.getElementById("performance").style.display = "none";

    document.getElementById("nav_design").style.backgroundColor = "#4CAF50";
    document.getElementById("nav_cam").style.backgroundColor = "#555";
    document.getElementById("nav_extras").style.backgroundColor = "#555";
    document.getElementById("nav_performance").style.backgroundColor = "#555";
}

function goToPerformance() {
    document.getElementById("performance").style.display = "block";
    document.getElementById("cam").style.display = "none";
    document.getElementById("extras").style.display = "none";
    document.getElementById("design").style.display = "none";

    document.getElementById("nav_performance").style.backgroundColor = "#4CAF50";
    document.getElementById("nav_design").style.backgroundColor = "#555";
    document.getElementById("nav_extras").style.backgroundColor = "#555";
    document.getElementById("nav_cam").style.backgroundColor = "#555";
}

function goToExtras() {
    document.getElementById("extras").style.display = "block";
    document.getElementById("cam").style.display = "none";
    document.getElementById("design").style.display = "none";
    document.getElementById("performance").style.display = "none";

    document.getElementById("nav_extras").style.backgroundColor = "#4CAF50";
    document.getElementById("nav_design").style.backgroundColor = "#555";
    document.getElementById("nav_cam").style.backgroundColor = "#555";
    document.getElementById("nav_performance").style.backgroundColor = "#555";
}


