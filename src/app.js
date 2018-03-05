const Wrld = require('wrld.js');
const env = require('../env');
const { initFloors } = require('./floors');

const keys = {
  wrld: env.WRLD_KEY,
};

const indoorMapId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';

window.addEventListener('load', async () => {
  const map = await Wrld.map('map', keys.wrld, {
    center: [56.459733, -2.973371],
    zoom: 17,
    indoorsEnabled: true,
  });

  map.on('initialstreamingcomplete', () => {
    map.indoors.enter(indoorMapId);
  });

  map.indoors.on('indoormapenter', (event) => {
    if (event.indoorMap.getIndoorMapId() === indoorMapId) {
      map.indoors.setFloor(0);
      map.setView([56.458968, -2.973841], 18);

      initFloors(map, indoorMapId);

      /* eslint-disable no-unused-vars */
      const indoorControl = new WrldIndoorControl('widget-container', map);

      const buildingName = event.indoorMap.getIndoorMapName();
      const latLng = [56.4593862, -2.9742504];

      const marker = Wrld.marker([56.4593862, -2.9742504], {
        title: 'JD Sports',
        indoorMapId,
        indoorMapFloorId: 1,
      }).addTo(map);

      const popupOptions = {
        indoorMapId,
        indoorMapFloorIndex: 0,
        autoClose: false,
        closeOnClick: true,
      };

      const template = $.templates('#cardStoreTemplate');
      const data = {
        title: 'J.D. Sports',
      };
      const htmlOutput = template.render(data);

      const popup = Wrld.popup(popupOptions)
        .setContent(htmlOutput);

      marker.bindPopup(popup);
    }
  });
});
