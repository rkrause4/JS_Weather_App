class UI {
  constructor() {
    this.location = document.querySelector('#location-title');
    this.weatherDesc = document.querySelector('#weather-desc');
    this.date = document.querySelector('#date');
    this.weatherIcon = document.querySelector('#weather-icon');
    this.temperature = document.querySelector('#temperature');
    this.tempMeasurement = document.querySelector('#measurement');
    // For current day details
    this.sunrise = document.querySelector('#sunrise');
    this.sunset = document.querySelector('#sunset');
    this.windSpeed = document.querySelector('#wind-speed');
    this.uvIndex = document.querySelector('#uv-index');
    // For upcoming weather forecast
    this.upComWeatherDisplay = document.querySelector(
      '.upcoming-weather-forecast-list'
    );
  }
  createUI(results, location) {
    this.location.innerHTML = location;
    this.weatherDesc.innerHTML = results.currently.summary;
    this.date.innerHTML = getDate();
    this.weatherIcon.setAttribute(
      'src',
      `images/icons/icon-${results.currently.icon}.png`
    );
    this.temperature.innerHTML = `${results.currently.temperature.toFixed()}`;
    this.tempMeasurement.innerHTML = '˚F';
    this.sunrise.innerHTML = convertUnixTime(results.daily.data[0].sunriseTime);
    this.sunset.innerHTML = convertUnixTime(results.daily.data[0].sunsetTime);
    this.windSpeed.innerHTML = `${results.currently.windSpeed.toFixed()} MPH`;
    this.uvIndex.innerHTML = results.currently.uvIndex;
  }

  createUpcomingUI(results) {
    let displayResults = '';
    results.daily.data.forEach(item => {
      displayResults += `
              <div class="up-w-f-group">
                <p class="up-w-f-day">${convertUnixDate(item.time)}</p>
                <img
                  src="images/icons/icon-${item.icon}.png"
                  alt="${item.icon}"
                  class="up-w-f-icon"
                />
                <h4 class="up-w-f-summary">${item.summary}</h4>
                <h4 class="up-w-f-temperatureHigh">${item.temperatureHigh.toFixed()}</h4>
                <h4 class="up-w-f-temperatureLow">${item.temperatureLow.toFixed()}</h4>
              </div>
      `;
    });

    // Add display results into html
    this.upComWeatherDisplay.innerHTML = displayResults;
  }
}

function getDate() {
  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();
  let formatedDate = `${month + 1}/${day}/${year}`;
  return formatedDate;
}

function convertUnixTime(unixTime) {
  const d = new Date(unixTime * 1000);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let timeOfDay = 'AM';
  if (hours > 12) {
    hours -= 12;
    timeOfDay = 'PM';
  }
  return `${hours}:${minutes} ${timeOfDay}`;
}

function convertUnixDate(unix) {
  let d = new Date(unix * 1000);
  let day;
  switch (d.getDay()) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
  }
  return day;
}
