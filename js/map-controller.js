'use strict';

let map, infoWindow;
function initMap() {
  const eilat = { lat: 29.55208744174587, lng: 34.95272486138504 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: eilat,
    zoom: 14,
  });
  const marker = new google.maps.Marker({
    position: eilat,
    map: map,
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement('img');
    locationButton. src = './img/target.png';   
  // locationButton.textContent = 'Pan to Current Location';
  locationButton.classList.add('custom-map-control-button');
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locationButton);
  locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          const marker = new google.maps.Marker({
            position: pos,
            map: map,
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  infoWindow.open(map);
  map.addListener('click', (mapsMouseEvent) => {
    infoWindow.close();
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });

    let pos = JSON.stringify(mapsMouseEvent.latLng);
    infoWindow.setContent(onUserInput(pos));
    // infoWindow.setContent(JSON.stringify(userInput(pos), null, 2));
    infoWindow.open(map);
  });
}

function moveTo(lat,lng){
  map.setCenter({lat,lng})
}

function onUserInput(pos) {
  userInput(pos);
  renderTable();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function renderTable(locations = getMarkersData()) {
  
  var strHTML = '';
  locations.forEach((val, idx) => {
    strHTML += `
    <tr>
      <td>${val.id}</td>
      <td>${val.name}</td>
      <td>lat:${val.lat} lng:${val.lng}</td>
      <td><button onclick="onDeleteMarker(${idx})">Delete</button></td>
      <td><button onclick="moveTo(${val.lat},${val.lng})">Move To</button></td>
    </tr>
`;
  });
  $('.table-body').html(strHTML);
}

function onDeleteMarker(idx) {
  deleteMarker(idx);
  renderTable();
}
