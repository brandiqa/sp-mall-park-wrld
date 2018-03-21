const Wrld = require('wrld.js');
const env = require('../../env');

const keys = {
  wrld: env.WRLD_KEY,
};

window.addEventListener('load', async () => {
  const map = await Wrld.map('map', keys.wrld, {
    center: [56.460545, -2.974736],
    zoom: 17,
  });
});
