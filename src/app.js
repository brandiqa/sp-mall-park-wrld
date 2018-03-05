const Wrld = require('wrld.js');
const env = require('../env');

const keys = {
  wrld: env.WRLD_KEY,
};

const overgateId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';

window.addEventListener('load', async () => {
  const mallBtn = document.getElementById('mallBtn');
  const exitBtn = document.getElementById('exitBtn');
  const topBtn = document.getElementById('topBtn');
  const upBtn = document.getElementById('upBtn');
  const downBtn = document.getElementById('downBtn');
  const bottomBtn = document.getElementById('bottomBtn');

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

  topBtn.addEventListener('click', () => {
    const indoorMap = map.indoors.getActiveIndoorMap();

    if (indoorMap) {
      map.indoors.setFloor(indoorMap.getFloorCount() - 1);
    }
  });

  upBtn.addEventListener('click', () => {
    map.indoors.moveUp();
  });

  downBtn.addEventListener('click', () => {
    map.indoors.moveDown();
  });

  bottomBtn.addEventListener('click', () => {
    map.indoors.setFloor(0);
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

      const indoorMapId = event.indoorMap.getIndoorMapId();
      const buildingName = event.indoorMap.getIndoorMapName();

      const marker = Wrld.marker([56.4593862, -2.9742504], {
        title: 'JD Sports',
        indoorMapId,
        indoorMapFloorId: 1,
      }).addTo(map);
    }
  });
});
