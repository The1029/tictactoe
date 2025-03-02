export let activePlayer = 'One';
export let selected = 1;
export let available = [1,2,3,4,5,6,7,8,9];
export let playerOne = [];
export let playerTwo = [];
export let gameOver = false;

export const resetGlobals = () => {
  activePlayer = 'One';
  selected = 1;
  available = [1,2,3,4,5,6,7,8,9];
  playerOne = [];
  playerTwo = [];
  gameOver = false;
}

export const changeActive = () => {
  if (activePlayer === 'One') {
    activePlayer = 'Two';
  } else {
    activePlayer = 'One';
  }
}

export const endGame = () => {
  gameOver = true;
  process.stdin.removeAllListeners('keypress');
}

export const decSelected = (n) => {
  selected = selected - n;
}

export const incSelected = (n) => {
  selected = selected + n;
}

export const registerMove = () => {
  if (activePlayer === 'One') {
    playerOne = [...playerOne, selected]
  } else {
    playerTwo = [...playerTwo, selected]
  }

  changeActive();

  const index = available.indexOf(selected);
  if (index > -1) { // only splice array when item is found
    available.splice(index, 1); // 2nd parameter means remove one item only
  }
}