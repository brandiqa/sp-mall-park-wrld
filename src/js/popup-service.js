const Wrld = require('wrld.js');
const { getPOI } = require('./api-service');

const indoorMapId = 'EIM-e16a94b1-f64f-41ed-a3c6-8397d9cfe607';
const baseTemplate = $.templates('#baseTemplate');
const infoTemplate = $.templates('#infoTemplate');
const timeTemplate = $.templates('#timeTemplate');

const popupOptions = {
  indoorMapId,
  indoorMapFloorIndex: 0,
  autoClose: true,
  closeOnClick: true,
  elevation: 5,
};

const createMenuLink = (linkName, iconClass) => {
  const link = document.createElement('a');
  link.className = 'item';
  const icon = document.createElement('i');
  icon.className = `${iconClass} icon`;
  link.appendChild(icon);
  link.appendChild(document.createTextNode(` ${linkName}`));
  link.setAttribute('data-tab', linkName);
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

// Clear existing tab content before adding another
const clearTab = (tab) => {
  while (tab.firstChild) {
    tab.removeChild(tab.firstChild);
  }
};

module.exports = {
  /* eslint no-underscore-dangle:  [2, { "allow": ["_latlng", "_map"] }] */
  showPopup: async (event) => {
    // Fetch co-ordinates and map objects from event
    const latlang = event.target._latlng;
    const map = event.target._map;
    // Create an instance of Popup
    const popup = Wrld.popup(popupOptions)
      .setLatLng(latlang);
    try {
      // Fetch data from api-service
      const poi = await getPOI(event.target.options.id);
      // Bind data with templates to render html outputs
      const infoHTML = infoTemplate.render(poi);
      const timeHTML = timeTemplate.render(poi);
      // Convert HTML outputs to DOM objects
      const infoDOM = $.parseHTML(infoHTML)[1];
      const timeDOM = $.parseHTML(timeHTML)[1];
      // Populate Tabs with DOM objects
      const infoTab = baseContent.childNodes[1].childNodes[3];
      clearTab(infoTab); // Clear existing content if any
      infoTab.appendChild(infoDOM);
      const timeTab = baseContent.childNodes[1].childNodes[5];
      clearTab(timeTab); // Clear existing content if any
      timeTab.appendChild(timeDOM);

      // Populate popup with DOM content
      popup.setContent(baseContent);
      // Display the popup
      popup.addTo(map);
      // Navigate map to properly view the Popup
      map.setView(latlang, 18);
    } catch (error) {
      popup.setContent('Oops! Something went wrong');
      popup.addTo(map);
    }
  },
};
