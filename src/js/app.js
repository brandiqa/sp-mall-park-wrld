const Wrld = require('wrld.js');
const env = require('../../env');
const { initFloors } = require('./floors');
const { getPOIs } = require('./poi');

const keys = {
  wrld: env.WRLD_KEY,
};

const indoorMapId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';

const template = $.templates('#cardStoreTemplate');

const popupOptions = {
  indoorMapId,
  indoorMapFloorIndex: 0,
  autoClose: false,
  closeOnClick: true,
};

window.addEventListener('load', async () => {
  const map = await Wrld.map('map', keys.wrld, {
    center: [56.459733, -2.973371],
    zoom: 17,
    indoorsEnabled: true,
  });

  map.on('initialstreamingcomplete', () => {
    map.indoors.enter(indoorMapId);
  });

  const placeMarkers = (pois) => {
    let marker;
    let poi;
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < pois.length; i++) {
      poi = pois[i];
      marker = Wrld.marker([poi.lat, poi.long], {
        title: poi.title,
        indoorMapId,
        indoorMapFloorId: 1,
      }).addTo(map);
      // Render poi data to jsrender template
      const htmlOutput = template.render(poi);
      // Create and bind popup to marker
      const popup = Wrld.popup(popupOptions)
        .setContent(htmlOutput);
      marker.bindPopup(popup);
    }
  };

  map.indoors.on('indoormapenter', async (event) => {
    if (event.indoorMap.getIndoorMapId() === indoorMapId) {
      map.indoors.setFloor(0);
      map.setView([56.458968, -2.973841], 18);

      // Set up Floor buttons
      initFloors(map);

      const pois = await getPOIs();
      placeMarkers(pois);
    }
  });
});
