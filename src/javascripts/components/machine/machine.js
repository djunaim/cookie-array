import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import snacks from '../snacks/snacks';
import './machine.scss';

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then((positions) => {
      // domString builder
      // h2 that says VENDING MACHINE
      // div with id = "snackSection", class= d-flex, flex-wrap
      // forEach over positions - call a component called snacks
      // snacks component should return bootstrap card
      // printToDom('stock', domString)

      let domString = '<h2>VENDING MACHINE</h2>';
      domString += '<div id="snackSection" class="d-flex flex-wrap">';
      positions.forEach((position) => {
        domString += snacks.makeASnack(position);
      });
      domString += '</div>';
      utilities.printToDOM('machine', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildTheMachine };
