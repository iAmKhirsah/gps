'use strict';

$(init);
function init() {
  renderTable();
}

function downloadCSV(elLink) {
  const csvContent = getAsCSV();
  elLink.href = 'data:text/csv;charset=utf-8,' + csvContent;
}

function renderTable() {
  var locations = getLocations();
  var strHTML = '';
  locations.forEach((val) => {
    const isSelected = val.isSelected ? 'checked' : '';
    strHTML += `
    <tr>
      <td>${val.id}</td>
      <td>${val.name}</td>
      <td>lat:${val.lat} lng:${val.lng}</td>
      <td> <input oninput="onToggleSelection(this, '${val.id}')" type="checkbox" ${isSelected} ></td>
    </tr>
`;
  });
  $('.table-body').html(strHTML);
}
function onToggleSelection(elSelected, id) {
  toggleLocation(id, elSelected.checked);
}

function onToggleCheckAll(elSelectAll) {
  var locations = getLocations();
  const { checked } = elSelectAll;
  locations.forEach((location) => (location.isSelected = checked));
  // setLocations(locations)
  saveToStorage('mapData', locations);
  renderTable(true);
}
