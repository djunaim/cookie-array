import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSnackPositionsByMachineID = (machineID) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snackPositions.json?orderBy="machineID"&equalTo="${machineID}"`)
    .then((response) => {
      const demSnackPositions = response.data;
      const snackPositions = [];
      Object.keys(demSnackPositions).forEach((fbId) => {
        demSnackPositions[fbId].id = fbId;
        snackPositions.push(demSnackPositions[fbId]);
      });
      resolve(snackPositions); // hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

const deleteSnackPosition = (snackPositionID) => axios.delete(`${baseUrl}/snackPositions/${snackPositionID}.json`);

export default { getAllSnackPositionsByMachineID, deleteSnackPosition };
