'use strict';
function getAsCSV() {
  let csvStr = `ID, Name, Position`;
  console.log('hello');
  var locations = loadFromStorage('mapData');
  locations.forEach((location) => {
    if (!location.isSelected) return;
    const csvLine = `\n${location.id}, ${location.name},lat${location.lat},lng ${location.lng} `;
    csvStr += csvLine;
  });
  return csvStr;
}

function toggleLocation(id, isSelected) {
  var locations = getLocations();
  const mark = locations.find((location) => location.id == id);
  mark.isSelected = isSelected;
  saveToStorage('mapData', locations)
}

function getLocations() {
  var location = loadFromStorage('mapData');
  return location;
}
