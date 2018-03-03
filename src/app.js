const Wrld = require('wrld.js')
const env = require('../env')

const keys = {
  wrld: env.WRLD_KEY
}

window.addEventListener('load', async () => {
  const map = Wrld.map('map', keys.wrld, {
    center: [56.459733, -2.973371],
    zoom: 17,
    indoorsEnabled: true
  })

  map.on('load', () => {
    map.indoors.enter('Overgate');
    console.log('go in');
  })
})
