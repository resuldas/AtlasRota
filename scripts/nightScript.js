// Map data source: https://raw.githubusercontent.com/Utku-Mese/AtlasRota/main/data.json

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
            /* .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') */
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
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

        // Card datas
        const road = document.getElementById('road');
        road.textContent = jsonData.attacks[0].attackers + " → " + jsonData.attacks[0].target;

        const attackerName = document.getElementById('attacker');
        attackerName.textContent = "Saldiran: " + jsonData.attacks[0].attackers;

        const targetDescription = document.getElementById('target');
        targetDescription.textContent = "Hedef: " + jsonData.attacks[0].target;

        const attackDescription = document.getElementById('attackDescription');
        attackDescription.textContent = jsonData.attacks[0].description;

        const attackType = document.getElementById('attackType');
        attackType.textContent = "Atak Tipi: " + jsonData.attacks[0].attackType;

        const attackTime = document.getElementById('attackTime');
        attackTime.textContent = "Tarih: " + new Date(jsonData.attacks[0].time).toLocaleString('en-US', { timeZone: 'UTC' });

        const attackStatus = document.getElementById('attackStatus');
        attackStatus.textContent = "Statü: " + jsonData.attacks[0].status;

        const attackSeverity = document.getElementById('attackSeverity');
        attackSeverity.textContent = "Şiddet: " + jsonData.attacks[0].severity;

        const attackDuration = document.getElementById('attackDuration');
        attackDuration.textContent = "Süre: " + jsonData.attacks[0].attackDuration;

        const attackVolume = document.getElementById('attackVolume');
        attackVolume.textContent = "Hacim: " + jsonData.attacks[0].attackVolume;

        const attackMethod = document.getElementById('attackMethod');
        attackMethod.textContent = "Yöntem: " + jsonData.attacks[0].attackMethod;

    })
    .catch(error => {
        console.error('Veri çekme hatası:', error);
    });

var daySwitch = document.getElementById('daySwitch');

daySwitch.addEventListener('change', function () {
    if (daySwitch.checked) {
        window.location.href = 'night.html';
        daySwitch.style.backgroundImage = "url('assets/images/sun.png')";
    } else {
        window.location.href = 'day.html';
    }
})

function openNav() {
    document.getElementById("mySidenav").style.width = "275px";
    document.getElementById("drawerSpan").style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("drawerSpan").style.display = "block";
}
