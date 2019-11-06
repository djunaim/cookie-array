import './stockCard.scss';

const makeASnack = (snack) => {
  let domString = `
  <div class="card col-3 snackCard">
    <div class="card-body">
      <h5 class="card-title">${snack.name}</h5>
      <p class="card-text">$${snack.price / 100}</p>
      <button class="btn btn-secondary quickStock" id="snack-${snack.id}">Stock 5</button>
    </div>
    <div class="card-footer">`;
  if (snack.snackPositionID !== '') {
    domString += `<button class="btn btn-danger deleteSnackPosition" id="${snack.snackPositionID}">Remove from ${snack.position.position}</button>`;
  } else {
    domString += `<input type="text" placeholder="A3"/><button class="btn btn-success addSnackPosition" id=${snack.id}>Add to Machine</button>`;
  }
  domString += '</div></div>';
  return domString;
};

export default { makeASnack };
