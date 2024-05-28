
fetch('../data/newData.json')
    .then(response => response.json())
    .then(jsonData => {
        const attacksData = jsonData.attacks.map(attack => ({
            /* attackType: attack.attackType,
            lineColor: attack.severity === 'Critical' ? '#7C0000' : attack.severity === 'High' ? '#FF0000' : attack.severity === 'Medium' ? '#FFA500' : '#00FF00',
            
            time: new Date(attack.time).toLocaleString('en-US', { timeZone: 'UTC' }),
            status: attack.status,
            severity: attack.severity,
            description: attack.description,
            target: attack.target,
            attackers: attack.attackers,
            attackDuration: attack.attackDuration,
            
            attackMethod: attack.attackMethod,
            data: attack,
            weight: getWeight(attack.attackVolume), */
            attackVolume: attack.attackVolume,
            lat: attack.endPoint[0],
            lng: attack.endPoint[1],
            pop: attack.pop
        }));

        const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
            .domain([0, 1e7]);

        const world = Globe()
            (document.getElementById('globeViz'))
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .hexBinPointWeight('pop')
            .pointOfView({ lat: 39.9334, lng: 32.8597, altitude: 2 })
            .hexAltitude(d => d.sumWeight * 4e-6)
            .hexBinResolution(3)
            .hexTopColor(d => weightColor(d.sumWeight * 25))
            .hexSideColor(d => weightColor(d.sumWeight * 25))
            .hexBinMerge(true)
            .enablePointerInteraction(false); // performance improvement

        world.hexBinPointsData(attacksData);
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.6;


    })

var daySwitch = document.getElementById('daySwitch');

daySwitch.addEventListener('change', function () {
    if (daySwitch.checked) {
        window.location.href = 'nightDensity.html';
    } else {
        window.location.href = 'dayDensity.html';
    }
});
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
function pause() {
    if (myGlobe) {
        if (isPlaying) {
            myGlobe.controls().autoRotate = false;
            myGlobe.arcDashAnimateTime(0);
            isPlaying = false;
        } else {
            myGlobe.controls().autoRotate = true;
            myGlobe.arcDashAnimateTime(6000);
            isPlaying = true;
        }
    }
}


