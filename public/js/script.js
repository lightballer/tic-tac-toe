const cells = [...document.getElementsByClassName('cell')];
const restartGameButton = document.getElementById('restart-game');

const WinCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let firstPlayerState = [];
let secondPlayerState = [];

let isFirstPlayerMove = true;
let isSecondPlayerMove = false;

cells.map(cell => {
  cell.addEventListener('click', e => {
    if (cell.innerHTML || !isFirstPlayerMove) return;
    cell.innerHTML = '<i class="fas fa-times"></i>';
    isFirstPlayerMove = !isFirstPlayerMove;
    isSecondPlayerMove = !isSecondPlayerMove;
    const cellPosition = +cell.getAttribute('id');
    firstPlayerState.push(cellPosition);

    const suitableCombination = checkGameEnded(firstPlayerState);
    if (suitableCombination.length) {
      paintWonCells(suitableCombination);
      isFirstPlayerMove = false;
      isSecondPlayerMove = false;
      console.log(`X wins!`);
    }
  });

  cell.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (cell.innerHTML || !isSecondPlayerMove) return;
    cell.innerHTML = '<i class="far fa-circle"></i>';
    isSecondPlayerMove = !isSecondPlayerMove;
    isFirstPlayerMove = !isFirstPlayerMove;
    const cellPosition = +cell.getAttribute('id');
    secondPlayerState.push(cellPosition);

    const suitableCombination = checkGameEnded(secondPlayerState);
    if (suitableCombination.length) {
      paintWonCells(suitableCombination);
      isFirstPlayerMove = false;
      isSecondPlayerMove = false;
      console.log(`O wins!`);
    }
    return false;
  });
});

const checkGameEnded = playerMoves => {
  const suitableCombinations = WinCombinations.filter(combination =>
    combination.every(num => playerMoves.includes(num))
  );
  return suitableCombinations;
};

const paintWonCells = suitableCombination => {
  suitableCombination.map(combination =>
    combination.map(number => {
      console.log(number);
      document.getElementById(number + '').classList.add('win');
    })
  );
};
const restartGame = () => {
  cells.map(item => {
    item.innerHTML = '';
    item.classList.remove('win');
  });
  firstPlayerState = [];
  secondPlayerState = [];
  isFirstPlayerMove = true;
  isSecondPlayerMove = false;
};

restartGameButton.addEventListener('click', restartGame);
