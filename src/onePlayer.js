import { twoPlayer } from './twoPlayer.js';

export const onePlayer = async () => {
  // If somehow manages to start a one-player game, silently start a two-player game instead.
  twoPlayer();
}