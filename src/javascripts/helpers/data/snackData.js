import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSnacksByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demSnacks = response.data;
      const snacks = [];
      Object.keys(demSnacks).forEach((fbId) => {
        demSnacks[fbId].id = fbId;
        snacks.push(demSnacks[fbId]);
      });
      resolve(snacks); // hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

const addNewSnack = (newSnack) => axios.post(`${baseUrl}/snacks.json`, newSnack);

const updateSnack = (snackID, updatedSnack) => axios.put(`${baseUrl}/snacks/${snackID}.json`, updatedSnack);

const buySnack = (snackID) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks/${snackID}.json`)
  // the whole promise is going through .then as 'result'. Need to only get the object
    .then((result) => {
      const snackObject = result.data;
      snackObject.currentStocked = snackObject.currentStocked === 0 ? 0 : snackObject.currentStocked -= 1;
      updateSnack(snackID, snackObject);
      // don't care what comes back, only that it works
      resolve();
    })
    .catch((error) => reject(error));
});

const restock = (snackID, restockNum) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks/${snackID}.json`)
  // the whole promise is going through .then as 'result'. Need to only get the object
    .then((result) => {
      const snackObject = result.data;
      snackObject.currentStocked += restockNum;
      snackObject.lifetimeNum += restockNum;
      updateSnack(snackID, snackObject);
      // don't care what comes back, only that it works
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getSnacksByUid,
  addNewSnack,
  restock,
  buySnack,
};
