import { styleText } from 'node:util';
import { select } from '@inquirer/prompts';
import { onePlayer } from './onePlayer.js';
import { twoPlayer } from './twoPlayer.js';
import { activePlayer, available, endGame, playerOne, playerTwo, resetGlobals, selected, gameOver } from './globals.js';

export const newGame = async () => {
  console.clear();

  const players = await select({
    message: 'How many players?',
    choices: [
      {
        name: 'Two',
        value: 2
      },
      {
        name: 'One',
        value: 1,
        disabled: '(Sorry, two player only at present!)'
      }
    ],
  });

  resetGlobals();

  if ( players === 1) onePlayer();
  if ( players === 2) twoPlayer();
}

const checkWins = (moves) => {
  // There are 8 possible wincons in tic tac toe.
  // Top row - 1,2,3
  if (moves.includes(1) && moves.includes(2) && moves.includes(3)) return true;
  // Middle row - 4,5,6
  if (moves.includes(4) && moves.includes(5) && moves.includes(6)) return true;
  // Bottom row - 7,8,9
  if (moves.includes(7) && moves.includes(8) && moves.includes(9)) return true;
  // Left column - 1,4,7
  if (moves.includes(1) && moves.includes(4) && moves.includes(7)) return true;
  // Middle column - 2,5,8
  if (moves.includes(2) && moves.includes(5) && moves.includes(8)) return true;
  // Right column - 3,6,9
  if (moves.includes(3) && moves.includes(6) && moves.includes(9)) return true;
  // L-R diagonal - 1,5,9
  if (moves.includes(1) && moves.includes(5) && moves.includes(9)) return true;
  // R-L diagonal - 3,5,7
  if (moves.includes(3) && moves.includes(5) && moves.includes(7)) return true;

  return false;
}

const playAgain = async () => {
  const again = await select({
    message: 'Play again?',
    choices: [
      {
        name: 'Yes',
        value: true
      },
      {
        name: 'No',
        value: false
      }
    ],
  });

  if (again) {
    newGame();
  } else {
    console.log('\nThanks for playing!');
    process.exit();
  }
}

export const renderBoard = async () => {
  let boardState = [' ',' ',' ',' ',' ',' ',' ',' ',' '];

  available.forEach(e => {
    boardState[e-1] = ' ';
  });
  playerOne.forEach(e => {
    boardState[e-1] = 'X';
  });
  playerTwo.forEach(e => {
    boardState[e-1] = 'O';
  });

  boardState[selected-1] = styleText(['bold', 'underline'], boardState[selected-1]);
  
  const renderString = ` ${boardState[0]} | ${boardState[1]} | ${boardState[2]} \n-----------\n ${boardState[3]} | ${boardState[4]} | ${boardState[5]} \n-----------\n ${boardState[6]} | ${boardState[7]} | ${boardState[8]} \n`;

  console.clear();
  console.log(renderString);
}

export const renderText = async () => {
  if (checkWins(playerOne)) {
    endGame();
    console.log('Congratulations, Player One! You win!\n');
    await playAgain();
  } else if (checkWins(playerTwo)) {
    endGame();
    console.log('Congratulations, Player Two! You win!\n');
    await playAgain();
  } else if (available.length === 0) {
    endGame();
    console.log('The game ends in a draw!\n');
    await playAgain();
  } else {
    console.log('Use the arrow keys to select a square.\n');
    console.log(`Player ${styleText(['bold'],activePlayer)}'s turn.`);
  }
}