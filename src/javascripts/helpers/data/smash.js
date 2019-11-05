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
            const newPositions = [];
            positions.forEach((position) => {
              const newP = { ...position };
              const getSnackPosition = snackPositions.find((x) => x.positionID === newP.id);
              if (getSnackPosition) {
                const snack = snacks.find((x) => x.id === getSnackPosition.snackID);
                newP.snack = snack;
              } else {
                newP.snack = {};
              }
              newPositions.push(newP);
            });
            resolve(newPositions);
          });
        });
    })
    .catch((error) => reject(error));
});

const getSnacksWithPositions = (uid) => new Promise((resolve, reject) => {
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineID(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineID(positions[0].machineID)
        .then((snackPositions) => {
          snackData.getSnacksByUid(uid).then((snacks) => {
            const newSnacks = [];
            snacks.forEach((snack) => {
              const newSnack = { ...snack };
              const getSnackPosition = snackPositions.find((x) => x.snackID === newSnack.id);
              if (getSnackPosition) {
                const getPosition = positions.find((x) => x.id === getSnackPosition.positionID);
                newSnack.position = getPosition;
              } else {
                newSnack.position = {};
              }
              newSnacks.push(newSnack);
            });
            resolve(newSnacks);
          });
        });
    })
    .catch((error) => reject(error));
});

export default { getCompleteMachine, getSnacksWithPositions };
