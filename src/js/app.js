const Wrld = require('wrld.js');
const env = require('../../env');
const { floorControls } = require('./floor-controls');
const { getPOIs, getPOI } = require('./poi-service');

const indoorMapId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';

const keys = {
  wrld: env.WRLD_KEY,
};

const baseTemplate = $.templates('#baseTemplate');
const infoTemplate = $.templates('#infoTemplate');
const timeTemplate = $.templates('#timeTemplate');

const popupOptions = {
  indoorMapId,
  indoorMapFloorIndex: 0,
  autoClose: true,
  closeOnClick: true,
  elevatiion: 10,
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
    // link.setId('id', `${linkName}Menu`);
    link.addEventListener('click', () => {
      $.tab('change tab', linkName);
      $('.item').toggleClass('active');
    });
    return link;
  };

  const createMenu = (menuParent) => {
    const infoLink = createMenuLink('Info', 'info circle');
    infoLink.className += ' active';
    menuParent.appendChild(infoLink);
    const timeLink = createMenuLink('Time', 'clock');
    menuParent.appendChild(timeLink);
  };

  const buildBaseContent = () => {
    const htmlOutput = baseTemplate.render({});
    const parent = $.parseHTML(htmlOutput)[1];
    const menuParent = parent.childNodes[1].childNodes[1];
    createMenu(menuParent);
    return parent;
  };

  const baseContent = buildBaseContent();

  const clearTab = (tab) => {
    while (tab.firstChild) {
      tab.removeChild(tab.firstChild);
    }
  };

  const showPopup = async (event) => {
    /* eslint no-underscore-dangle:  [2, { "allow": ["_latlng"] }] */
    const latlang = event.target._latlng;
    // let popup;
    const popup = Wrld.popup(popupOptions)
      .setLatLng(latlang);
    try {
      // Fetch data
      const poi = await getPOI(event.target.options.id);
      // Bind data to templates
      const infoHTML = infoTemplate.render(poi);
      const timeHTML = timeTemplate.render(poi);
      // Convert to DOM objects
      const infoDOM = $.parseHTML(infoHTML)[1];
      const timeDOM = $.parseHTML(timeHTML)[1];
      // Populate Tabs
      const infoTab = baseContent.childNodes[1].childNodes[3];
      clearTab(infoTab);
      infoTab.appendChild(infoDOM);
      const timeTab = baseContent.childNodes[1].childNodes[5];
      clearTab(timeTab);
      timeTab.appendChild(timeDOM);

      // Display popup
      popup.setContent(baseContent);
      popup.addTo(map);
      map.setView(latlang, 18);
    } catch (error) {
      popup.setContent('Oops! Something went wrong');
      popup.addTo(map);
    }
  };

  const placeMarkers = (pois) => {
    let marker;
    let poi;
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < pois.length; i++) {
      poi = pois[i];
      const latlang = [poi.lat, poi.long];
      marker = Wrld.marker(latlang, {
        id: poi.id,
        title: poi.title,
        indoorMapId,
        indoorMapFloorId: 1,
      }).addTo(map);
      marker.on('click', showPopup);
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
