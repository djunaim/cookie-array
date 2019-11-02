import machineData from './machineData';
import positionData from './positionData';
import snackPositionData from './snackPositionData';
import snackData from './snackData';

const getCompleteMachine = () => new Promise((resolve, reject) => {
// 1. get machines - returns first machine (hard coding) - machineData and machine.js
// 2. use machineID to get all positions for that machine
// 3. use machineID to get all snack positions
// 4. use uid of snackPositions/positions to get available snacks for that machine
// 5. SMASH 'EM - return an array of positions (in order A1, A2, A3, B1 ...). So positions should have position.snack if a snack exists at that position
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineID(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineID(positions[0].machineID)
        .then((snackPositions) => {
          snackData.getSnacksByUid(positions[0].uid).then((snacks) => {
            console.log('snackPositions', snackPositions);
            resolve(snacks);
          });
        });
    })
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
