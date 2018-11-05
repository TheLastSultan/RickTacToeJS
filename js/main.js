const View = require("./ttt-view");
const Game = require("../solution/game");
const ComputerPlayer = require("../solution/computer");

$(() => {
  const rootEl = $(".ttt");
  const game = new Game();
  const computerPlayer = new ComputerPlayer();
  new View(game, rootEl, computerPlayer);
});
