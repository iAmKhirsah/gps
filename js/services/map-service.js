'use strict';
var gMarkers;
$(init);
function init() {
  if (!loadFromStorage('mapData') || loadFromStorage('mapData').length === 0) {
    gMarkers = [
      {
        id: _makeId(3),
        lat: 29.55208744174587,
        lng: 34.95272486138504,
        name: 'eilat',
      },
    ];
  } else gMarkers = loadFromStorage('mapData');
  renderTable();
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
  gMarkers.push(info);
  saveToStorage('mapData', gMarkers);
}

function getMarkersData() {
  gMarkers = loadFromStorage('mapData');
  return gMarkers;
}

function deleteMarker(idx) {
  gMarkers.splice(idx, 1);
  saveToStorage('mapData', gMarkers);
}
