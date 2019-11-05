import './stockCard.scss';

const makeASnack = (snack) => {
  const domString = `
  <div class="card col-3 snackCard">
    <div class="card-body">
      <h5 class="card-title">${snack.name}</h5>
      <p class="card-text">$${snack.price / 100}</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-danger deleteSnackPosition" id="${snack.snackPositionID}">Remove from ${snack.position.position}</button>
    </div>
  </div>
  `;
  return domString;
};

export default { makeASnack };
