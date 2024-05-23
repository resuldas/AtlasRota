
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
            pop: attack.pop * 5
        }));

        const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
            .domain([0, 1e7]);

        const world = Globe()
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
