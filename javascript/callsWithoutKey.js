class WeatherApiCall {
  constructor() {
    this.apiKey = `ApiKey`;
  }
  async getWeather(lat, long) {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${
        this.apiKey
      }/${lat},${long}`
    );
    const responseData = await response.json();
    return responseData;
  }
}

class ZipcodeApiCall {
  async getZipcode(zipcode) {
    const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
    const responseData = await response.json();
    return responseData;
  }
}
