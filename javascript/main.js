const locationInput = document.querySelector('#zipcode-input'),
  locationInputBtn = document.querySelector('#zipcode-submit-btn'),
  modal = document.querySelector('#modal'),
  modalTitle = document.querySelector('#modal-title'),
  modalMessage = document.querySelector('#modal-message');

//   Instantiate new class
const zip = new ZipcodeApiCall();
const weather = new WeatherApiCall();
const ui = new UI();

// Add Event Listeners
locationInputBtn.addEventListener('click', validateZipcode);

document.addEventListener('DOMContentLoaded', getZipcode(10001));

function validateZipcode(e) {
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(locationInput.value);
  if (locationInput.value === '' || !isValidZip) {
    // Show modal
    modalTitle.innerHTML = 'Invalid ZipCode';
    modalMessage.innerHTML =
      'Please enter a valid ZipCode. ZipCode must be 5 digits long';
    modal.style.visibility = 'visible';
    setTimeout(() => {
      modal.style.visibility = 'hidden';
    }, 5000);
  } else {
    getZipcode(locationInput.value.trim());
  }
  e.preventDefault();
}

function getZipcode(zipcode) {
  zip
    .getZipcode(zipcode)
    .then(results => {
      let location = `${results['places'][0]['place name']}, ${
        results['places'][0]['state abbreviation']
      } ${results['post code']}`;
      weather
        .getWeather(
          results['places'][0]['latitude'],
          results['places'][0]['longitude']
        )
        .then(results => {
          ui.createUI(results, location);
          ui.createUpcomingUI(results);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
