import { twoPlayer } from './twoPlayer.js';
import { activePlayer, available, playerOne, playerTwo, selected } from './globals.js';

export const onePlayer = async () => {
  twoPlayer();
}