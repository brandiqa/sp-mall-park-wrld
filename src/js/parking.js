const Wrld = require('wrld.js');
const env = require('../../env');

const keys = {
  wrld: env.WRLD_KEY,
};

window.addEventListener('load', async () => {
  const map = await Wrld.map('map', keys.wrld, {
    center: [56.460087, -2.975191],
    zoom: 17,
  });

  // Adjust bearing and tilt
  setTimeout(() => {
    map.setCameraHeadingDegrees(45).setCameraTiltDegrees(20);
  }, 1000);

  // Highlight parking areas
  const polygonPoints1 = [
    [56.459857, -2.974004],
    [56.459889, -2.974036],
    [56.459836, -2.974188],
    [56.460079, -2.974526],
    [56.460254, -2.974096],
    [56.459954, -2.973698]];
  const parking1 = Wrld.polygon(polygonPoints1).addTo(map);
});
