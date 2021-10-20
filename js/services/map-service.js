'use strict';

function initMap() {
  const eilat = { lat: 29.55208744174587, lng: 34.95272486138504 };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: eilat,
  });
  const marker = new google.maps.Marker({
    position: eilat,
    map: map,
  });
}
