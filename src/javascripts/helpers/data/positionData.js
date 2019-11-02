import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllPositionsByMachineID = (machineID) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/positions.json?orderBy="machineID"&equalTo="${machineID}"`)
    .then((response) => {
      const demPositions = response.data;
      const positions = [];
      Object.keys(demPositions).forEach((fbId) => {
        demPositions[fbId].id = fbId;
        positions.push(demPositions[fbId]);
      });
      // order positions A1, A2, A3, B1, B2, B3, C1, C2, C3
      const sortedPositions = positions.sort((a, b) => a.position.localeCompare(b.position, 'en', { numeric: true }));
      resolve(sortedPositions); // hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

export default { getAllPositionsByMachineID };
