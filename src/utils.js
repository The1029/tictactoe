export const renderBoard = (boardState, selected) => {
  if (
    boardState.length !== 9 ||
    !boardState.every(e => typeof e === "string") ||
    !boardState.every(e => e.match(/^( |O|X)$/))
  ) {
    throw new Error ("Invalid board state.");
  }

  boardState[selected] = "*";

  const renderString = ` ${boardState[0]} | ${boardState[1]} | ${boardState[2]} \n-----------\n ${boardState[3]} | ${boardState[4]} | ${boardState[5]} \n-----------\n ${boardState[6]} | ${boardState[7]} | ${boardState[8]} \n`;

  console.clear();
  console.log(renderString);
}