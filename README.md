# RickTacToe (Unbeatable)

##### As an inferior Morty, you don't stand a chance against the far superior Rick, but you sure can try anyway.

#### [play it live here!](https://thelastsultan.github.io/RickTacToeJS/) 

Rick Tac Toe is written with Javascript, JQuery, and Webpack. At difficulty level 3, the AI to make it unbeatable is done by prioritizing the following moves.
1. Check for winning move 
2. Check for defensive Block
3. Check for Opposing Corner
4. Play random if no priroity

```javascript
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
}
```
Of course, part of what makes Rick unbeatable in Rick-Tac-Toe is that he always goes first :) 

