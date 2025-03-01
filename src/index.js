import { select } from '@inquirer/prompts';
import { onePlayer } from './onePlayer.js';
import { twoPlayer } from './twoPlayer.js';

const newGame = async () => {
  console.clear();
  const players = await select({
    message: 'How many players?',
    choices: [
      {
        name: 'One',
        value: 1,
      },
      {
        name: 'Two',
        value: 2
      }
    ],
  });

  if ( players === 1) onePlayer();
  if ( players === 2) twoPlayer();
}

newGame();