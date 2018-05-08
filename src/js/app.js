const Wrld = require('wrld.js');
const env = require('../../env');
const { getPOIs } = require('./api-service');
const { showPopup } = require('./popup-service');

const indoorMapId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';

const keys = {
  wrld: env.WRLD_KEY,
};

window.addEventListener('load', async () => {
  const map = await Wrld.map('map', keys.wrld, {
    center: [56.459733, -2.973371],
    zoom: 17,
    indoorsEnabled: true,
  });


  const indoorControl = new WrldIndoorControl('widget-container', map); // eslint-disable-line no-unused-vars

  map.on('initialstreamingcomplete', () => {
    map.indoors.enter(indoorMapId);
  });

  const placeMarkers = (pois) => {
    let marker;
    pois.forEach((poi) => {
      const latlang = [poi.lat, poi.long];
      marker = Wrld.marker(latlang, {
        id: poi.id,
        title: poi.title,
        indoorMapId,
        indoorMapFloorId: 1,
      }).addTo(map);
      marker.on('click', showPopup);
    });
  };

  map.indoors.on('indoormapenter', async (event) => {
    if (event.indoorMap.getIndoorMapId() === indoorMapId) {
      map.indoors.setFloor(0);
      map.setView([56.459342, -2.9741433], 18);

      const pois = await getPOIs();
      placeMarkers(pois);
    }
  });
});
