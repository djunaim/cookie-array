import $ from 'jquery';

import firebase from 'firebase/app';
import 'firebase/auth';

import './stocker.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import stockCard from '../stockCard/stockCard';
import snackPositionData from '../../helpers/data/snackPositionData';

import machine from '../machine/machine';

const deleteFromMachine = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  snackPositionData.deleteSnackPosition(e.target.id)
    .then(() => {
      // console.log('it worked')
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
      machine.buildTheMachine();
    })
    .catch((error) => console.error(error));
};

const addToMachine = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const inputText = $(e.target).siblings().val();
  // console.log(inputText);
  smash.getAvailablePositions()
    .then((positions) => {
      const selectedPosition = positions.find((x) => x.position.toLowerCase() === inputText.toLowerCase());
      if (selectedPosition) {
        const newSnackPosition = {
          positionID: selectedPosition.id,
          snackID: e.target.id,
          machineID: selectedPosition.machineID,
          uid,
        };
        snackPositionData.createSnackPosition(newSnackPosition).then(() => {
          // eslint-disable-next-line no-use-before-define
          buildTheStocker(uid);
          machine.buildTheMachine();
        });
      }
    })
    .catch((error) => console.error(error));
};

const buildTheStocker = (uid) => {
  // console.log('uid in buildTheStocker', uid);
  smash.getSnacksWithPositions(uid)
    .then((snacks) => {
      // console.log(snacks);
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDOM('stock', domString);
      $('#stock').on('click', '.deleteSnackPosition', deleteFromMachine);
      $('#stock').on('click', '.addSnackPosition', addToMachine);
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
