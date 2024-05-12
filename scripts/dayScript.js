
fetch('https://raw.githubusercontent.com/Utku-Mese/AtlasRota/main/data/newData.json')
    .then(response => response.json())
    .then(jsonData => {
        const attacksData = jsonData.attacks.map(attack => ({
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
            attackVolume: attack.attackVolume,
            attackMethod: attack.attackMethod,
        }));

        console.log(attacksData);



        const myGlobe = Globe()
            (document.getElementById('globeViz'))
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            /* .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') */
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .pointOfView({ lat: 39.9334, lng: 32.8597, altitude: 2 })
            .arcLabel(d => `${d.attackType} - ${d.status} - ${d.severity}`)
            .arcStartLat(d => +d.startPoint.lat)
            .arcStartLng(d => +d.startPoint.lng)
            .arcEndLat(d => +d.endPoint.lat)
            .arcEndLng(d => +d.endPoint.lng)
            .arcDashGap(1)
            .arcDashInitialGap(() => Math.random())
            .arcDashAnimateTime(2000)
            .arcColor(d => d.lineColor)
            .arcsTransitionDuration(0)
            .pointColor(() => 'orange')
            .pointAltitude(0)
            .pointRadius(0.02)
            .pointsMerge(true);






        myGlobe.arcsData(attacksData);

        myGlobe.controls().autoRotate = true;
        myGlobe.controls().autoRotateSpeed = 0.6;

        /* birdsData.forEach(bird => {
            bird.visitedPlaces.forEach((place, index) => {
                if (index < bird.visitedPlaces.length - 1) {
                    myGlobe.arcsData([{
                        name: `${bird.name} Visited Place ${index}`,
                        lineColor: bird.lineColor,
                        startPoint: { lat: place.lat, lng: place.lng },
                        endPoint: { lat: bird.visitedPlaces[index + 1].lat, lng: bird.visitedPlaces[index + 1].lng },
                        card: bird.card
                    }]);
                } else {
                    myGlobe.arcsData([{
                        name: `${bird.name} Last Visited Place`,
                        lineColor: bird.lineColor,
                        startPoint: { lat: place.lat, lng: place.lng },
                        endPoint: { lat: bird.endPoint[0], lng: bird.endPoint[1] },
                        card: bird.card
                    }]);
                }
            });
        }); */
    })
    .catch(error => {
        console.error('Veri çekme hatası:', error);
    });


var daySwitch = document.getElementById('daySwitch');

daySwitch.addEventListener('change', function () {
    if (daySwitch.checked) {
        window.location.href = 'night.html';
    } else {
        window.location.href = 'day.html';
    }
})

var cardName = document.getElementById('name');
cardName.textContent = "Leylek"

var cardDescription = document.getElementById('description');
cardDescription.textContent = "Leylekler, Ciconiidae familyasından büyük, uzun bacaklı, uzun boyunlu, genellikle beyaz tüyleri olan kuşlardır"

function openNav() {
    document.getElementById("mySidenav").style.width = "275px";
    document.getElementById("drawerSpan").style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("drawerSpan").style.display = "block";
}