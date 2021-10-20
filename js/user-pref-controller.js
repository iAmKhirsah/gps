'use strict';

$(initUserPref);

function initUserPref() {
  var colors = loadFromStorage('userData');
  setColor(colors.bgColor, colors.txtColor, true);
}

function getColor() {
  var bgColor = $('#bg-color').val();
  var txtColor = $('#txt-color').val();
  setColor(bgColor, txtColor);
  return { bgColor, txtColor };
}

function submitForm(ev) {
  ev.preventDefault();
  saveUserData();
}

function getDateOfBirth() {
  var dob = $('#dob').val();
  return dob;
}

function setColor(bgc, txtc, isReset = false) {
  $('body').css({ 'background-color': bgc, color: txtc });
  if (isReset) {
    $('#bg-color').val(bgc);
    $('#txt-color').val(txtc);
  }
}

function showAge(val) {
  $('#sAge').text(val);
}

function getAge() {
  return $('#age').val();
}

function getEmail() {
  return $('#email').val();
}
