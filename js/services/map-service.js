'use strict';
var gLocations;

$(init);
function init() {
  if (!loadFromStorage('mapData') || loadFromStorage('mapData').length === 0) {
    gLocations = [
      {
        id: _makeId(3),
        lat: 29.55208744174587,
        lng: 34.95272486138504,
        name: 'eilat',
      },
    ];
  } else gLocations = loadFromStorage('mapData');
  renderTable(gLocations);
}

function userInput(pos) {
  var userTxt = prompt('Enter text');
  saveMarker(userTxt, pos);
  return userTxt;
}

function saveMarker(userTxt, pos) {
  var regex = /[-]?[\d]+[.][\d]*/g;
  var newPos = pos.match(regex);
  var info = {
    id: _makeId(3),
    lat: newPos[0],
    lng: newPos[1],
    name: userTxt,
  };
  gLocations.push(info);
  saveToStorage('mapData', gLocations);
}

function getMarkersData() {
  gLocations = loadFromStorage('mapData');
  return gLocations;
}

function deleteMarker(idx) {
  gLocations.splice(idx, 1);
  saveToStorage('mapData', gLocations);
}
