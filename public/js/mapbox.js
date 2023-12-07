/* eslint-disable */
const mapBox = document.getElementById('map');
const locations = JSON.parse(mapBox.dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWhtZWRvc2FtYXNhd2FoIiwiYSI6ImNscHF6NmQzYTAyYmUyam16MGFuc2IwbGEifQ.Tbu0kFBlxMKYPQO97pmhnw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ahmedosamasawah/clpqzieht015d01p9b0hpadti',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

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
