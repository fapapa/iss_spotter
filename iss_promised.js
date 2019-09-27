const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  return request('https://ipvigilante.com/' + JSON.parse(body).ip);
};

const fetchISSFlyOverTimes = (body) => {
  const parsed = JSON.parse(body);
  const lat = parsed.data.latitude;
  const lon = parsed.data.longitude;

  const API_URL = 'http://api.open-notify.org/iss-pass.json?';
  const resource = API_URL + `lat=${lat}&lon=${lon}`;
  console.log(resource);
  return request(resource);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes);
};


module.exports = { nextISSTimesForMyLocation };
