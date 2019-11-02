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
      resolve(positions); // hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

export default { getAllPositionsByMachineID };
