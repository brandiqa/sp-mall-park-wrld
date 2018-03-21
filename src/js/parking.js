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
});
