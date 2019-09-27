const { nextISSTimesForMyLocation } = require('./iss.js');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.error("It didn't word!", error);
  }

  for (const passTime of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(passTime.risetime);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  }
});
