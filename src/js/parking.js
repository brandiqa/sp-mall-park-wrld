const Wrld = require('wrld.js');
const env = require('../../env');
const { getParkingAreas } = require('./api-service');

const keys = {
  wrld: env.WRLD_KEY,
};

window.addEventListener('load', async () => {
  const map = await Wrld.map('map', keys.wrld, {
    center: [56.460087, -2.975432],
    zoom: 17.5,
  });

  // Adjust bearing and tilt
  setTimeout(() => {
    map.setCameraHeadingDegrees(45).setCameraTiltDegrees(0);
  }, 1000);

  const parkingAreas = await getParkingAreas();
  parkingAreas.forEach((parkingArea) => {
    Wrld.polygon(parkingArea.polygonPoints).addTo(map);
  });
});
