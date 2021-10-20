'use strict';
// function initMap() {
//   const eilat = { lat: 29.55208744174587, lng: 34.95272486138504 };
//   const map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     center: eilat,
//   });
//   const marker = new google.maps.Marker({
//     position: eilat,
//     map: map,
//   });
// }

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
  const locationButton = document.createElement('button');
  locationButton.textContent = 'Pan to Current Location';
  locationButton.classList.add('custom-map-control-button');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
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
    infoWindow.setContent(userInput(pos));
    // infoWindow.setContent(JSON.stringify(userInput(pos), null, 2));
    infoWindow.open(map);
  });
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
