const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  const API_URL = 'https://api.ipify.org?format=json';
  request(API_URL, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const API_URL = 'https://ipvigilante.com/';
  request(API_URL + ip, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching geolocation. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const parsed = JSON.parse(body);
    const val = {};
    val.latitude = parsed.data.latitude;
    val.longitude = parsed.data.longitude;

    callback(null, val);
  });
};

