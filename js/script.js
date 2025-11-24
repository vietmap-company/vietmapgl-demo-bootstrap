console.log('Bootstrap project loaded');

// Initialize Vietmap
// Note: Replace 'YOUR_API_KEY_HERE' with your actual Vietmap API key
const map = new vietmapgl.Map({
    container: 'map',
    style: 'https://maps.vietmap.vn/maps/styles/tm/style.json?apikey=YOUR_API_KEY_HERE',
    center: [106.6755666, 10.7588867], // [lng, lat]
    zoom: 12
});

map.addControl(new vietmapgl.NavigationControl(), 'top-right');

map.on('load', function() {
    fetch('./data/VN34City.geojson')
        .then(response => response.json())
        .then(data => {
            // Add random color to each feature
            data.features.forEach(feature => {
                feature.properties.color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            });

            map.addSource('vn-city', {
                type: 'geojson',
                data: data
            });

            // Add a layer to show the polygon fill
            map.addLayer({
                'id': 'vn-city-fill',
                'type': 'fill',
                'source': 'vn-city',
                'layout': {},
                'paint': {
                    'fill-color': ['get', 'color'],
                    'fill-opacity': 0.4
                }
            });

            // Add a layer to show the polygon outline
            map.addLayer({
                'id': 'vn-city-outline',
                'type': 'line',
                'source': 'vn-city',
                'layout': {},
                'paint': {
                    'line-color': '#fff',
                    'line-width': 1
                }
            });
        });

    // Create a popup, but don't add it to the map yet.
    const popup = new vietmapgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mousemove', 'vn-city-fill', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.lngLat;
        const description = `<strong>${e.features[0].properties.Name}</strong><br>${e.features[0].properties.Prefix}`;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'vn-city-fill', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    map.on('click', 'vn-city-fill', function(e) {
        // Handle API call here
    });
});
