import $ from 'jquery';

import firebase from 'firebase/app';
import 'firebase/auth';

import './stocker.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import stockCard from '../stockCard/stockCard';
import snackPositionData from '../../helpers/data/snackPositionData';
import snackData from '../../helpers/data/snackData';

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

const addNewSnack = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newSnack = {
    imageURL: $('#snack-image-url').val(),
    name: $('#snack-name').val(),
    price: $('#snack-price').val() * 1,
    currentStocked: 0,
    lifetimeNum: 0,
    uid,
  };
  snackData.addNewSnack(newSnack)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
    })
    .catch((error) => console.error(error));
};

const quickStock = (e) => {
  e.stopImmediatePropagation();
  const snackID = e.target.id.split('snack-')[1];
  snackData.restock(snackID, 5)
    .then(() => {
      const { uid } = firebase.auth().currentUser;
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
      machine.buildTheMachine();
    })
    .catch((error) => console.error(error));
  // console.log(snackID);
};

const buildTheStocker = (uid) => {
  // console.log('uid in buildTheStocker', uid);
  smash.getSnacksWithPositions(uid)
    .then((snacks) => {
      // console.log(snacks);
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add Snack</button>';
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDOM('stock', domString);
      $('#stock').on('click', '.deleteSnackPosition', deleteFromMachine);
      $('#stock').on('click', '.addSnackPosition', addToMachine);
      $('#stock').on('click', '.quickStock', quickStock);
      $('#add-new-snack').click(addNewSnack);
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
