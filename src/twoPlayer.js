import * as readline from 'readline';
import { available, decSelected, incSelected, gameOver, registerMove, selected } from './globals.js';
import { checkWins, newGame, renderBoard } from './utils.js';

export const twoPlayer = () => {
  renderBoard();

  // Key event listening setup.
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on('keypress', (str, key) => {
    // Ctrl + C = Exit process.
    // Default behaviour overridden, so need to instruct manually.
    if (key.ctrl && key.name === 'c') process.exit();

    if (!gameOver) {
      switch (key.name) {
        case 'up':
          if (selected > 3) decSelected(3);
          renderBoard();
          break;
        case 'down':
          if (selected < 7) incSelected(3);
          renderBoard();
          break;
        case 'left':
          if (!(selected === 1 || selected === 4 || selected === 7)) decSelected(1);
          renderBoard();
          break;
        case 'right':
          if (!(selected === 3 || selected === 6 || selected === 9)) incSelected(1);
          renderBoard();
          break;
        case 'return':
          if (available.find((e) => {return e === selected})) {
            registerMove();
            renderBoard();
          } else {
            console.log('Already taken!');
          }
          break;
      }
    }
    
  });
}