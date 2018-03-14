const Wrld = require('wrld.js');
const env = require('../../env');
const { floorControls } = require('./floor-controls');
const { getPOIs } = require('./poi-service');

const keys = {
  wrld: env.WRLD_KEY,
};

const indoorMapId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';

const template = $.templates('#cardStoreTemplate');

const popupOptions = {
  indoorMapId,
  indoorMapFloorIndex: 0,
  autoClose: true,
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

  const createMenuLink = (linkName, iconClass) => {
    const link = document.createElement('a');
    link.className = 'item';
    const icon = document.createElement('i');
    icon.className = `${iconClass} icon`;
    link.appendChild(icon);
    link.appendChild(document.createTextNode(` ${linkName}`));
    link.setAttribute('data-tab', linkName);
    return link;
  };

  const clickHandler = (tabName) => {
    $.tab('change tab', tabName);
  };

  const createMenu = (menuParent) => {
    const infoLink = createMenuLink('Info', 'info circle');
    infoLink.className += ' active';
    menuParent.appendChild(infoLink);
    infoLink.addEventListener('click', () => {
      clickHandler('Info');
    });
    const timeLink = createMenuLink('Time', 'clock');
    menuParent.appendChild(timeLink);
    timeLink.addEventListener('click', () => {
      clickHandler('Time');
    });
  };

  const placeMarkers = (pois) => {
    let marker;
    let poi;
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < pois.length; i++) {
      poi = pois[i];
      const latlang = [poi.lat, poi.long];
      marker = Wrld.marker(latlang, {
        title: poi.title,
        indoorMapId,
        indoorMapFloorId: 1,
      }).addTo(map);
      // Render poi data to jsrender template
      const htmlOutput = template.render(poi);
      // Convert to DOM object
      const tabsDOM = $.parseHTML(htmlOutput)[1];
      // Build tabs menu
      const menuParent = tabsDOM.childNodes[1].childNodes[1];
      createMenu(menuParent);

      // Create and bind popup to marker
      const popup = Wrld.popup(popupOptions)
        .setContent(tabsDOM);
      marker.bindPopup(popup);
      marker.on('popupopen', () => {
        map.setView(latlang, 18);
      });
    }
  };

  map.indoors.on('indoormapenter', async (event) => {
    if (event.indoorMap.getIndoorMapId() === indoorMapId) {
      map.indoors.setFloor(0);
      map.setView([56.459342, -2.9741433], 18);

      // Set up Floor Control buttons
      floorControls(map);

      const pois = await getPOIs();
      placeMarkers(pois);
    }
  });
});
