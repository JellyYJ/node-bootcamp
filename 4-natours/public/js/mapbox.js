/* eslintr-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoieWlqaWEwMSIsImEiOiJjbHNhbGV6dnAwM3VqMmtuemhmMGhndmRnIn0.5znqvxfRGEXcognmqmBP_A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/yijia01/clujre5tc00q601r5emb79p6e',
  scrollZoom: false,
  // center: [-118.2426, 34.0549],
  // zoom: 10,
});

const bounds = new mapboxgl.LngLatBounds();

// set globe fog on load
map.on('style.load', () => {
  map.setFog({});
});

let popup;
locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup on marker hover
  el.addEventListener('mouseenter', () => {
    popup = new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
  });

  // Remove popup when mouse leaves marker
  el.addEventListener('mouseleave', () => {
    if (popup) {
      popup.remove();
    }
  });

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
