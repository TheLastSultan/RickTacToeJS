/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const View = __webpack_require__(/*! ./ttt-view */ \"./js/ttt-view.js\");\nconst Game = __webpack_require__(/*! ../solution/game */ \"./solution/game.js\");\nconst ComputerPlayer = __webpack_require__(/*! ../solution/computer */ \"./solution/computer.js\"); \n\n$( () => {\n  const rootEl = $('.ttt');\n  const game = new Game();\n  const computerPlayer = new ComputerPlayer();\n  new View(game, rootEl , computerPlayer);\n});\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/ttt-view.js":
/*!************************!*\
  !*** ./js/ttt-view.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class View {\n  constructor(game, $el , computerPlayer) {\n    this.game = game;\n    this.$el = $el;\n    this.computer = computerPlayer;\n    this.turn = 0 ; \n\n    this.setupBoard();\n    this.bindEvents();\n    this.computerMove();\n    \n  }\n\n  \n\n  bindEvents() {\n    // install a handler on the `li` elements inside the board.\n    this.$el.on(\"click\", \"li\", ( event => {\n      const $square = $(event.currentTarget);\n      this.makeMove($square);\n    }));\n  }\n\n  computerMove(){\n    \n    const comppos = this.computer.getMove(); \n    const currentPlayer = \"x\" ;\n    const $square = $(\"#\"+comppos[0].toString() + comppos[1].toString())\n\n    $square.addClass(currentPlayer);\n    this.game.playMove(comppos,currentPlayer);\n    this.checkifOver();\n    // debugger; \n  }\n  \n  makeMove($square) {\n    const pos = $square.data(\"pos\");\n    const currentPlayer = \"o\";\n\n    try {\n      this.game.playMove(pos,currentPlayer);\n    } catch (e) {\n      alert(\"This \" + e.msg.toLowerCase());\n      return;\n    }\n\n    // feed the move to the comptuer AI\n    $square.addClass(currentPlayer);\n    this.computer.updateComputer(pos);\n    this.computerMove(); \n    this.checkifOver();\n  }\n\n  checkifOver(){\n    if (this.game.isOver()) {\n      // cleanup click handlers.\n      this.$el.off(\"click\");\n      this.$el.addClass(\"game-over\");\n\n      const winner = this.game.winner();\n      const $figcaption = $(\"<figcaption>\");\n\n      if (winner) {\n        this.$el.addClass(`winner-${winner}`);\n        $figcaption.html(`You win, ${winner}!`);\n      } else {\n        $figcaption.html(\"It's a draw!\");\n      }\n\n      this.$el.append($figcaption);\n    }\n  }\n\n  setupBoard() {\n    const $ul = $(\"<ul>\");\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        let $li = $(\"<li>\");\n        $li.data(\"pos\", [rowIdx, colIdx]);\n        $li.attr(\"id\", rowIdx.toString()+ colIdx.toString());\n\n        $ul.append($li);\n      }\n    }\n\n    this.$el.append($ul);\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./js/ttt-view.js?");

/***/ }),

/***/ "./solution/board.js":
/*!***************************!*\
  !*** ./solution/board.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./solution/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  print() {\n    const strs = [];\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      const marks = [];\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        marks.push(\n          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : \" \"\n        );\n      }\n      strs.push(`${marks.join('|')}\\n`);\n    }\n\n    console.log(strs.join('-----\\n'));\n  }\n\n  winner() {\n    const posSeqs = [\n      // horizontals\n      [[0, 0], [0, 1], [0, 2]],\n      [[1, 0], [1, 1], [1, 2]],\n      [[2, 0], [2, 1], [2, 2]],\n      // verticals\n      [[0, 0], [1, 0], [2, 0]],\n      [[0, 1], [1, 1], [2, 1]],\n      [[0, 2], [1, 2], [2, 2]],\n      // diagonals\n      [[0, 0], [1, 1], [2, 2]],\n      [[2, 0], [1, 1], [0, 2]]\n    ];\n\n    for (let i = 0; i < posSeqs.length; i++) {\n      const winner = this.winnerHelper(posSeqs[i]);\n      if (winner != null) {\n        return winner;\n      }\n    }\n\n    return null;\n  }\n\n  winnerHelper(posSeq) {\n    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n      const targetMark = Board.marks[markIdx];\n      let winner = true;\n      for (let posIdx = 0; posIdx < 3; posIdx++) {\n        const pos = posSeq[posIdx];\n        const mark = this.grid[pos[0]][pos[1]];\n\n        if (mark != targetMark) {\n          winner = false;\n        }\n      }\n\n      if (winner) {\n        return targetMark;\n      }\n    }\n\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return (0 <= pos[0]) &&\n    (pos[0] < 3) &&\n    (0 <= pos[1]) &&\n    (pos[1] < 3);\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 3; i++) {\n      grid.push([]);\n      for (let j = 0; j < 3; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = ['x', 'o'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./solution/board.js?");

/***/ }),

/***/ "./solution/computer.js":
/*!******************************!*\
  !*** ./solution/computer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass ComputerPlayer{\n\n    constructor(){\n        this.name = \"ComputerPlayer\";\n        this.mark = \"x\";\n        this.opponentMark = \"o\";\n        this.mode = 3 // Difficulty Level 3..see notes below\n        this.board =    [   [null, null, null], \n                            [null, null, null],\n                            [null, null, null]];\n    }\n   \n\n    getMove(){\n        \n        let move = \"\"\n        //  Difficulty Levels:\n        \n        // 3..Hardest: Prioritizes: 1) Wins , 2) Defense, 3) Corners ,   \n        if (this.mode == 3){\n            if (this.checkWin() != false){\n                move = this.checkWin(); \n            } \n            else if (this.checkDefense() != false){\n                move = this.checkDefense(); \n            }  \n            else{\n                move = this.checkCornersThanRandom();     \n            }\n        };\n\n        // 2..Medium: Prioritizes: 1) Wins, 2) Defense\n        if (this.mode == 2){\n            if (this.checkWin() != false){\n                return this.checkWin(); \n            } \n            else if (this.checkDefense() != false){\n                return this.checkDefense(); \n            }  \n            else{\n                return this.moveRandom();     \n            }\n        };\n        // 1..Easy: Prioritizes: 1) Defense , 2) Random\n        if (this.mode == 1){\n            if (this.checkDefense() != false){\n                return this.checkDefense(); \n            }  \n            else{\n                return this.moveRandom();     \n            }\n        };\n        \n        this.board[move[0]][move[1]] = this.mark; \n        return move; \n    }\n\n\n    updateComputer(pos){\n        this.board[pos[0]][pos[1]] = this.opponentMark\n    }\n    \n\n    display(imported_board){\n        this.board = imported_board\n        \n        // console.log(this.board[0])\n        // console.log(this.board[1])\n        // console.log(this.board[2])\n    }\n\n    checkWin(){\n        let availablePositions = this.getAllMoves()\n        for (var i = 0 ; i < availablePositions.length ; i++){\n            let checkBoard = this.checkMove(availablePositions[i]);\n            if (this.anyWinner(this.mark,checkBoard) == true){\n                return availablePositions[i]\n            }\n        }\n        return false\n    } // TESTED\n\n\n    checkMove(pos){\n        let newBoard = this.board.map(a => Object.assign([], a));\n        let a = pos[0];\n        let b = pos[1];\n        newBoard[a][b] = this.mark;\n        return newBoard; \n    } // TESTED\n\n    checkOpponentMove(pos){\n        let newBoard = this.board.map(a => Object.assign([], a));\n        let a = pos[0];\n        let b = pos[1];\n        newBoard[a][b] = this.opponentMark;\n        return newBoard; \n    } // TESTED\n\n    getAllMoves(){\n        let availablePositions = []\n        let board = this.board\n        for (var i = 0 ; i < 3; i++){\n            for (var j = 0 ; j < 3; j++){\n                if (this.board[i][j] == null){\n                    availablePositions.push([i,j])\n                }\n            }\n        }\n        return availablePositions\n    } // TESTED\n\n    checkDefense(){\n        let availablePositions = this.getAllMoves()\n       \n        for (var i = 0 ; i < availablePositions.length ; i++){\n            let checkBoard = this.checkOpponentMove(availablePositions[i]);\n            if (this.anyWinner(this.opponentMark,checkBoard) == true){\n                return availablePositions[i]\n            }\n        }\n        return false\n    } // TESTED\n\n    checkCornersThanRandom(){\n        let available_moves = this.getAllMoves()\n              const corners = [[0,0],[2,2],[0,2],[2,0]];\n              for (var i = 0 ; i < available_moves.length ; i++){\n                for (var j = 0 ; j < available_moves.length; j ++){\n                    if(corners[i][0] == available_moves[j][0] && corners[i][1] == available_moves[j][1]){\n                    return [corners[i][0], corners[i][1]]; \n                    }\n                }\n              }\n        return this.moveRandom()\n    } // TESTED\n   \n    getRandomInt(min, max) {\n        return Math.floor(Math.random() * (max - min + 1)) + min;\n    } //TESTED\n      \n      \n    moveRandom(){\n        let availableMoves = this.getAllMoves()\n        let number = this.getRandomInt(0,availableMoves.length-1)\n        return [availableMoves[number][0], availableMoves[number][1]]\n    } // TESTED\n      \n      \n    anyWinner(mark,grid){\n      if (this.winnerDiagonalLeft(mark, grid) ==true){ \n        console.log(\"Left Diagonal Win for \" +mark)\n        return true;\n      }else if (this.winnerDiagonalRight(mark, grid)==true){\n        console.log(\"Right Diagonal Win for \" + mark)\n        return true;\n      }else if (this.winnerHorizontal(mark, grid)==true){\n        console.log(\"Horizontal win \" +mark) \n        return true;\n      }else if (this.winnerVertical(mark, grid)==true){\n        console.log(\"Vertical Win for \" +mark)\n        return true;\n      };\n      return false \n    } //tested \n\n    transposeArray(array){\n        let arrayLength = array.length\n        var newArray = [];\n        for(var i = 0; i < array.length; i++){\n            newArray.push([]);\n        };\n  \n        for(var i = 0; i < array.length; i++){\n            for(var j = 0; j < arrayLength; j++){\n                newArray[j].push(array[i][j]);\n            };\n        };\n  \n        return newArray;\n      } //tested\n  \n    winnerHorizontal(mark,grid){\n        for(var i =0; i < grid.length; i++){\n                if(grid[i].every((el)=> el == mark)){\n                return true;\n                }; \n            };\n        return false; \n    } // tested\n\n    winnerVertical(mark,grid){\n    let transposedGrid = this.transposeArray(grid)\n    for(var i =0; i < grid.length; i++){\n            if(transposedGrid[i].every((el)=> el == mark)){\n            return true;\n            }; \n        };\n    return false; \n    } //tested\n  \n    winnerDiagonalLeft(mark,grid){\n      for (var i = 0 ; i < grid.length ; i++){\n        if (grid[i][i] != mark) return false\n      }\n      return true \n    } //tested \n  \n    winnerDiagonalRight(mark,grid){\n      if (grid[0][2] != mark){\n        return false\n      }else if (grid[1][1] != mark){\n        return false\n      }else if (grid[2][0] != mark){\n        return false}\n      return true\n    } //tested\n  \n}\n\nmodule.exports = ComputerPlayer\n\n\n\n\n\n//# sourceURL=webpack:///./solution/computer.js?");

/***/ }),

/***/ "./solution/game.js":
/*!**************************!*\
  !*** ./solution/game.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./solution/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./solution/moveError.js\");\nconst ComputerPlayer = __webpack_require__(/*! ./computer */ \"./solution/computer.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = \"o\";\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos,mark) {\n    this.board.placeMark(pos, mark);\n    // this.swapTurn();\n  }\n\n  promptMove(reader, callback) {\n    const game = this;\n\n    this.board.print();\n    console.log(`Current Turn: ${this.currentPlayer}`);\n\n    reader.question('Enter rowIdx: ', rowIdxStr => {\n      const rowIdx = parseInt(rowIdxStr);\n      reader.question('Enter colIdx: ', colIdxStr => {\n        const colIdx = parseInt(colIdxStr);\n        callback([rowIdx, colIdx]);\n      });\n    });\n  }\n\n  run(reader, gameCompletionCallback) {\n    this.promptMove(reader, move => {\n      try {\n        this.playMove(move);\n      } catch (e) {\n        if (e instanceof MoveError) {\n          console.log(e.msg);\n        } else {\n          throw e;\n        }\n      }\n\n      if (this.isOver()) {\n        this.board.print();\n        if (this.winner()) {\n          console.log(`${this.winner()} has won!`);\n        } else {\n          console.log('NO ONE WINS!');\n        }\n        gameCompletionCallback();\n      } else {\n        // continue loop\n        this.run(reader, gameCompletionCallback);\n      }\n    });\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./solution/game.js?");

/***/ }),

/***/ "./solution/moveError.js":
/*!*******************************!*\
  !*** ./solution/moveError.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./solution/moveError.js?");

/***/ })

/******/ });