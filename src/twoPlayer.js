import { renderBoard } from "./utils.js";

export const twoPlayer = async () => {

  let selected = 0;
  let boardState = [" "," "," "," "," "," "," "," "," "];

  renderBoard(boardState, selected);

}