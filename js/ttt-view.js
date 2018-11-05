class View {
  constructor(game, $el, computerPlayer) {
    this.game = game;
    this.$el = $el;
    this.computer = computerPlayer;
    this.turn = 0;
    this.rickWin = [
      "../css/audio/hit_the_sack_jack.wav",
      "../css/audio/Riggity.mp3"
    ];

    this.setupBoard();
    this.bindEvents();
    this.computerMove();
  }

  bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", event => {
      const $square = $(event.currentTarget);
      this.makeMove($square);
    });
  }

  computerMove() {
    const comppos = this.computer.getMove();
    const currentPlayer = "x";
    const $square = $("#" + comppos[0].toString() + comppos[1].toString());

    $square.addClass(currentPlayer);
    this.game.playMove(comppos, currentPlayer);
    this.checkifOver();
    const RickMovesound = [
      document.getElementById("aids"),
      document.getElementById("hit")
    ];

    this.makeMoveNoise("rick");

    // debugger;
  }

  makeMoveNoise(character) {
    const RickMovesound = [
      document.getElementById("aids"),
      document.getElementById("hit")
    ];

    if (character == "rick") {
      const random =
        RickMovesound[Math.floor(Math.random() * RickMovesound.length)];
      console.log(random);
      random.play();
    } else {
      document.getElementById("oh").play();
    }
  }

  makeWinNoise() {
    const rick = [
      document.getElementById("and"),
      document.getElementById("woo"),
      document.getElementById("riggity")
    ];
    const random = rick[Math.floor(Math.random() * rick.length)];
    random.play();
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = "o";

    try {
      this.game.playMove(pos, currentPlayer);
    } catch (e) {
      alert("This " + e.msg.toLowerCase());
      return;
    }

    // feed the move to the comptuer AI
    $square.addClass(currentPlayer);
    this.makeMoveNoise("morty");
    this.computer.updateComputer(pos);
    this.computerMove();
    this.checkifOver();
  }

  checkifOver() {
    if (this.game.isOver()) {
      // cleanup click handlers.
      this.$el.off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner();
      const $figcaption = $("<figcaption>");

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`Pathetic. Even by Morty Standards!`);
        this.makeWinNoise();
      } else {
        $figcaption.html("It's a draw!");
      }

      this.$el.append($figcaption);
    }
  }

  setupBoard() {
    const $ul = $("<ul>");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        $li.attr("id", rowIdx.toString() + colIdx.toString());

        $ul.append($li);
      }
    }

    this.$el.append($ul);
  }
}

module.exports = View;
