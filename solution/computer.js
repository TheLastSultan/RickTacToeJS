
class ComputerPlayer{

    constructor(){
        this.name = "ComputerPlayer";
        this.mark = "x";
        this.opponentMark = "o";
        this.mode = 3 // Difficulty Level 3..see notes below
        this.board =    [   [null, null, null], 
                            [null, null, null],
                            [null, null, null]];
    }
   

    getMove(){
        
        let move = ""
        //  Difficulty Levels:
        
        // 3..Hardest: Prioritizes: 1) Wins , 2) Defense, 3) Corners ,   
        if (this.mode == 3){
            if (this.checkWin() != false){
                move = this.checkWin(); 
            } 
            else if (this.checkDefense() != false){
                move = this.checkDefense(); 
            }  
            else{
                move = this.checkCornersThanRandom();     
            }
        };

        // 2..Medium: Prioritizes: 1) Wins, 2) Defense
        if (this.mode == 2){
            if (this.checkWin() != false){
                return this.checkWin(); 
            } 
            else if (this.checkDefense() != false){
                return this.checkDefense(); 
            }  
            else{
                return this.moveRandom();     
            }
        };
        // 1..Easy: Prioritizes: 1) Defense , 2) Random
        if (this.mode == 1){
            if (this.checkDefense() != false){
                return this.checkDefense(); 
            }  
            else{
                return this.moveRandom();     
            }
        };
        
        this.board[move[0]][move[1]] = this.mark; 
        return move; 
    }


    updateComputer(pos){
        this.board[pos[0]][pos[1]] = this.opponentMark
    }
    

    display(imported_board){
        this.board = imported_board
        
        // console.log(this.board[0])
        // console.log(this.board[1])
        // console.log(this.board[2])
    }

    checkWin(){
        let availablePositions = this.getAllMoves()
        for (var i = 0 ; i < availablePositions.length ; i++){
            let checkBoard = this.checkMove(availablePositions[i]);
            if (this.anyWinner(this.mark,checkBoard) == true){
                return availablePositions[i]
            }
        }
        return false
    } // TESTED


    checkMove(pos){
        let newBoard = this.board.map(a => Object.assign([], a));
        let a = pos[0];
        let b = pos[1];
        newBoard[a][b] = this.mark;
        return newBoard; 
    } // TESTED

    checkOpponentMove(pos){
        let newBoard = this.board.map(a => Object.assign([], a));
        let a = pos[0];
        let b = pos[1];
        newBoard[a][b] = this.opponentMark;
        return newBoard; 
    } // TESTED

    getAllMoves(){
        let availablePositions = []
        let board = this.board
        for (var i = 0 ; i < 3; i++){
            for (var j = 0 ; j < 3; j++){
                if (this.board[i][j] == null){
                    availablePositions.push([i,j])
                }
            }
        }
        return availablePositions
    } // TESTED

    checkDefense(){
        let availablePositions = this.getAllMoves()
       
        for (var i = 0 ; i < availablePositions.length ; i++){
            let checkBoard = this.checkOpponentMove(availablePositions[i]);
            if (this.anyWinner(this.opponentMark,checkBoard) == true){
                return availablePositions[i]
            }
        }
        return false
    } // TESTED

    checkCornersThanRandom(){
        let available_moves = this.getAllMoves()
              const corners = [[0,0],[2,2],[0,2],[2,0]];
              for (var i = 0 ; i < available_moves.length ; i++){
                for (var j = 0 ; j < available_moves.length; j ++){
                    if(corners[i][0] == available_moves[j][0] && corners[i][1] == available_moves[j][1]){
                    return [corners[i][0], corners[i][1]]; 
                    }
                }
              }
        return this.moveRandom()
    } // TESTED
   
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } //TESTED
      
      
    moveRandom(){
        let availableMoves = this.getAllMoves()
        let number = this.getRandomInt(0,availableMoves.length-1)
        return [availableMoves[number][0], availableMoves[number][1]]
    } // TESTED
      
      
    anyWinner(mark,grid){
      if (this.winnerDiagonalLeft(mark, grid) ==true){ 
        console.log("Left Diagonal Win for " +mark)
        return true;
      }else if (this.winnerDiagonalRight(mark, grid)==true){
        console.log("Right Diagonal Win for " + mark)
        return true;
      }else if (this.winnerHorizontal(mark, grid)==true){
        console.log("Horizontal win " +mark) 
        return true;
      }else if (this.winnerVertical(mark, grid)==true){
        console.log("Vertical Win for " +mark)
        return true;
      };
      return false 
    } //tested 

    transposeArray(array){
        let arrayLength = array.length
        var newArray = [];
        for(var i = 0; i < array.length; i++){
            newArray.push([]);
        };
  
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < arrayLength; j++){
                newArray[j].push(array[i][j]);
            };
        };
  
        return newArray;
      } //tested
  
    winnerHorizontal(mark,grid){
        for(var i =0; i < grid.length; i++){
                if(grid[i].every((el)=> el == mark)){
                return true;
                }; 
            };
        return false; 
    } // tested

    winnerVertical(mark,grid){
    let transposedGrid = this.transposeArray(grid)
    for(var i =0; i < grid.length; i++){
            if(transposedGrid[i].every((el)=> el == mark)){
            return true;
            }; 
        };
    return false; 
    } //tested
  
    winnerDiagonalLeft(mark,grid){
      for (var i = 0 ; i < grid.length ; i++){
        if (grid[i][i] != mark) return false
      }
      return true 
    } //tested 
  
    winnerDiagonalRight(mark,grid){
      if (grid[0][2] != mark){
        return false
      }else if (grid[1][1] != mark){
        return false
      }else if (grid[2][0] != mark){
        return false}
      return true
    } //tested
  
}

module.exports = ComputerPlayer



