/* eslintr-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoieWlqaWEwMSIsImEiOiJjbHVqbjQycGUwMnl3Mmtsd2Rud2U2b3p3In0.QXWgw7hJBUMUO0vYP0kbPA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
