const history = [];
const CELL_VALUES = [0.01, 0.05, 0.1, 0.25, .5, 1, 2, 5, 10, 20, 50, 100];

const totalEl = document.querySelector('.total span');

function updateTotal() {
  const cellValues = CELL_VALUES.map(value => {
    const cell = document.getElementById(`cedula-${value}`);
    return parseInt(cell.value) * value || 0;
  });

  const total = cellValues.reduce((acc, value) => acc + value, 0);
  totalEl.innerText = total.toFixed(2);
}

function updateCell(value, amount) {
  if (!CELL_VALUES.includes(value)) {
    return;
  }
  const cell = document.getElementById(`cedula-${value}`);
  cell.value = parseInt(cell.value) + amount;
}

function decreaseCell(value) {
  updateCell(value, -1);
}

function increaseCell(value) {
  updateCell(value, 1);
}

function onUndo() {
  const cellValue = history.pop();
  decreaseCell(cellValue);
  updateTotal();
}

function addMoney(amount) {
  history.push(amount);
  increaseCell(amount);
  updateTotal();
}

CELL_VALUES.forEach(value => {
  const cell = document.getElementById(`cedula-${value}`);
  cell.addEventListener('input', updateTotal);
});
