// Map data source: https://raw.githubusercontent.com/Utku-Mese/AtlasRota/main/data.json

fetch('https://raw.githubusercontent.com/Utku-Mese/AtlasRota/main/data.json')
    .then(response => response.json())
    .then(jsonData => {
        const birdsData = jsonData.Birds.map(bird => ({
            name: bird.Name,
            lineColor: bird.Linecolor,
            startPoint: { lat: bird.startPoint[0], lng: bird.startPoint[1] },
            endPoint: { lat: bird.endPoint[0], lng: bird.endPoint[1] },
            card: bird.Card,
            visitedPlaces: bird.VisitedPlaces || []
        }));

        const myGlobe = Globe()
            (document.getElementById('globeViz'))
            /* .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') */
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .pointOfView({ lat: 39.9334, lng: 32.8597, altitude: 2 })
            .arcLabel(d => `${d.name}: ${d.card.description}`)
            .arcStartLat(d => +d.startPoint.lat)
            .arcStartLng(d => +d.startPoint.lng)
            .arcEndLat(d => +d.visitedPlaces[0]?.lat || d.endPoint.lat)
            .arcEndLng(d => +d.visitedPlaces[0]?.lng || d.endPoint.lng)
            .arcDashGap(1)
            .arcDashInitialGap(() => Math.random())
            .arcDashAnimateTime(2000)
            .arcColor(d => d.lineColor)
            .arcsTransitionDuration(0)
            .pointColor(() => 'orange')
            .pointAltitude(0)
            .pointRadius(0.02)
            .pointsMerge(true);




        myGlobe.arcsData(birdsData);
        myGlobe.controls().autoRotate = true;
        myGlobe.controls().autoRotateSpeed = 0.6;

        birdsData.forEach(bird => {
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
        });
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
