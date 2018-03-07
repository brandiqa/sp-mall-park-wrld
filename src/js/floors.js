module.exports = {
  initFloors: (map) => {
    const exitBtn = document.getElementById('exitBtn');
    const topBtn = document.getElementById('topBtn');
    const upBtn = document.getElementById('upBtn');
    const downBtn = document.getElementById('downBtn');
    const bottomBtn = document.getElementById('bottomBtn');

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
  },
};
