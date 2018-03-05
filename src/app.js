const Wrld = require('wrld.js');
const env = require('../env');

const keys = {
  wrld: env.WRLD_KEY,
};

const overgateId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';

window.addEventListener('load', async () => {
  const mallBtn = document.getElementById('mallBtn');
  const exitBtn = document.getElementById('mallBtn');

  const map = Wrld.map('map', keys.wrld, {
    center: [56.459733, -2.973371],
    zoom: 17,
    indoorsEnabled: true,
  });

  mallBtn.addEventListener('click', () => {
    map.indoors.enter(overgateId);
  });

  exitBtn.addEventListener('click', () => {
    map.indoors.exit();
  });

  map.on('initialstreamingcomplete', () => {
    map.indoors.enter(overgateId);
  });

  map.indoors.on('indoormapenter', (event) => {
    if (event.indoorMap.getIndoorMapId() === overgateId) {
      map.indoors.setFloor(0);
      map.setView([56.458968, -2.973841], 18);
      /* eslint-disable no-unused-vars */
      const indoorControl = new WrldIndoorControl('widget-container', map);
    }
  });
});
