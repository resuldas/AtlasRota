function openNav() {
    document.getElementById("mySidenav").style.width = "275px";
    document.getElementById("drawerSpan").style.display = "none";
    document.getElementById("pauseButton").style.visibility = "hidden";
    document.getElementById("attackListContainer").style.visibility = "hidden";
    document.getElementById("graf-dropdown").style.visibility="hidden";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("drawerSpan").style.display = "block";
    document.getElementById("pauseButton").style.visibility = "visible";
    document.getElementById("attackListContainer").style.visibility = "visible";
    document.getElementById("graf-dropdown").style.visibility="visible";
}