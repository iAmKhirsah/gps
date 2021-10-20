'use strict';

function saveUserData() {
  var color = getColor();
  var userData = {
    dob: getDateOfBirth(),
    bgColor: color.bgColor,
    txtColor: color.txtColor,
    email: getEmail(),
    age: getAge(),
  };
  saveToStorage('userData', userData);
  console.log(userData);
}

function checkAge() {
  var elAge = document.querySelector('#age');
  var age = $('#age').val();
  var dob = $('#dob').val();
  dob = new Date(dob);
  var dobYear = dob.getFullYear();
  var year = new Date().getFullYear();
  if (year - dobYear != age) elAge.setCustomValidity('Age doesnt match');
  else elAge.setCustomValidity('');
}
