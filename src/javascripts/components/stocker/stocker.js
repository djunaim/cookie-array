import './stocker.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import stockCard from '../stockCard/stockCard';

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
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
