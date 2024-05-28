let world;
let isPlaying = true;


fetch('../data/newData.json')
    .then(response => response.json())
    .then(jsonData => {
        const attacksData = jsonData.attacks.map(attack => ({

            attackVolume: attack.attackVolume,
            lat: attack.endPoint[0],
            lng: attack.endPoint[1],
            pop: attack.pop * 5,

            // attacks list data
            attackType: attack.attackType,
            lineColor: attack.severity === 'Critical' ? '#7C0000' : attack.severity === 'High' ? '#FF0000' : attack.severity === 'Medium' ? '#FFA500' : '#00FF00',
            startPoint: { lat: attack.startPoint[0], lng: attack.startPoint[1] },
            endPoint: { lat: attack.endPoint[0], lng: attack.endPoint[1] },
            time: new Date(attack.time).toLocaleString('en-US', { timeZone: 'UTC' }),
            status: attack.status,
            severity: attack.severity,
            description: attack.description,
            target: attack.target,
            attackers: attack.attackers,
            attackDuration: attack.attackDuration,
            attackMethod: attack.attackMethod,
            data: attack,
        }));

        const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
            .domain([0, 1e7]);

        world = Globe()
            (document.getElementById('globeViz'))
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .hexBinPointWeight('pop')
            .pointOfView({ lat: 39.9334, lng: 32.8597, altitude: 2 })
            .hexAltitude(d => d.sumWeight * 6e-8)
            .hexBinResolution(4)
            .hexTopColor(d => weightColor(d.sumWeight))
            .hexSideColor(d => weightColor(d.sumWeight))
            .hexBinMerge(true)
            .enablePointerInteraction(false);

        world.hexBinPointsData(attacksData);
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.6;

        populateAttackList(attacksData);

    })


var daySwitch = document.getElementById('daySwitch');

daySwitch.addEventListener('change', function () {
    if (daySwitch.checked) {
        window.location.href = 'nightDensity.html';
        daySwitch.style.backgroundImage = "url('assets/images/sun.png')";
    } else {
        window.location.href = 'dayDensity.html';
    }
})
function openNav() {
    document.getElementById("mySidenav").style.width = "275px";
    document.getElementById("drawerSpan").style.display = "none";
    document.getElementById("pauseButton").style.visibility = "hidden";
    document.getElementById("attackListContainer").style.visibility = "hidden";
    document.getElementById("graf-dropdown").style.visibility = "hidden";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("drawerSpan").style.display = "block";
    document.getElementById("pauseButton").style.visibility = "visible";
    document.getElementById("attackListContainer").style.visibility = "visible";
    document.getElementById("graf-dropdown").style.visibility = "visible";
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

function pause() {
    if (world) {
        if (isPlaying) {
            world.controls().autoRotate = false;
            world.arcDashAnimateTime(0);
            isPlaying = false;
        } else {
            world.controls().autoRotate = true;
            world.arcDashAnimateTime(6000);
            isPlaying = true;
        }
    }
}

function populateAttackList(attacksData) {
    const attackList = document.getElementById('attackList');
    attackList.innerHTML = '';

    attacksData.forEach(attack => {
        const attackItem = document.createElement('div');
        attackItem.className = 'attackItem';
        attackItem.innerHTML = `
            <p><strong>${attack.attackType}</strong></p>
            <p>Attacker: ${attack.attackers}</p>
            <p>Target: ${attack.target}</p>
            <p>Severity: ${attack.severity}</p>
        `;

        /* attackItem.addEventListener('click', () => {
            myGlobe.pointOfView({
                lat: (attack.startPoint.lat + attack.endPoint.lat) / 2,
                lng: (attack.startPoint.lng + attack.endPoint.lng) / 2,
                altitude: 1.5
            }, 1000);
            displayAttackInfo(attack);
        }); */

        attackList.appendChild(attackItem);
    });


    startAutoScroll();
}

function startAutoScroll() {
    const attackList = document.getElementById('attackList');
    const attackItemHeight = attackList.children[0].offsetHeight;
    const totalHeight = attackItemHeight * attackList.children.length;
    const visibleHeight = document.getElementById('attackListContainer').offsetHeight;
    const scrollAmount = totalHeight - visibleHeight;

    if (totalHeight > visibleHeight) {
        attackList.style.top = `0px`;
        attackList.classList.remove('auto-scroll');


        void attackList.offsetWidth;

        attackList.style.top = `0px`;
        attackList.classList.add('auto-scroll');
        attackList.style.animationDuration = `${(totalHeight / attackItemHeight) * 5}s`;
    }
}

function pause() {
    if (world) {
        if (isPlaying) {
            world.controls().autoRotate = false;
            world.arcDashAnimateTime(0);
            isPlaying = false;
        } else {
            world.controls().autoRotate = true;
            world.arcDashAnimateTime(6000);
            isPlaying = true;
        }
    }
}