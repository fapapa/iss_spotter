const { nextISSTimesForMyLocation } = require('./iss_promised.js');

const printPassTimes = (passTimes) => {
  for (const passTime of JSON.parse(passTimes).response) {
    const date = new Date(0);
    date.setUTCSeconds(passTime.risetime);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work!:", error.message);
  });
