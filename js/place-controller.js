'use strict';

$(init);
function init() {
  var userData = loadFromStorage('userData');
  if (userData.dob) showAstrology();
}
function showAstrology() {
  var forecast = astroForecast();
  var randomNum = getRandomInt(0, 2);
  $('.astrology').text(forecast[randomNum]);
}
