const Gameboard = (() => {
    let board = [1,2,3,4,5,6,7,8,9]

    function display() {
        myContainer = document.querySelector('#container')
        myContainer.innerHTML = ''        
        for (i in board) {
            // console.log(board[i])
            let tempDiv = document.createElement('div')
            tempDiv.classList.add('location')
            tempDiv.innerHTML = board[i]
            myContainer.appendChild(tempDiv)
        }
    }

    function placeMarker(player, location) {
        return board.splice(location - 1, 1, player.marker)
    }

    return {
        board,
        display,
        placeMarker
    }
})();

const createPlayer = (name, marker) => {
    return {
        name,
        marker
    }
}

const PlayGame = (player1, player2) => {
    function startGame() {
        currentGame = Gameboard
        currentTurn = 0
        while (currentTurn < 9) {
            if (currentTurn % 2 == 0) {
                takeTurn(player1)
            } else {
                takeTurn(player2)
            }
            currentTurn++
            console.log(`CURRENT TURN IS ${currentTurn}`)      
        }
    }

    function takeTurn(player) {
        console.log(player.marker)
    }

    return {
        startGame,
        takeTurn
    }
}

// someshit = document.querySelector('body')
// console.log(someshit)

p1 = createPlayer("jeff", "X")
p2 = createPlayer("timmy", "O")

let new_game = PlayGame(p1,p2)
//new_game.startGame()

let board = Gameboard
board.display()
// console.log(board.board)
board.placeMarker(p1, 9)
console.log(board.placeMarker(p2, 7))

board.display()
// console.log(board.board)
console.log('###########################')
// console.log(board.board)
// board.display()
// console.log(board.board)
// board.display()
// console.log(board.board)

// win arrays can be stored in a "check win" function
// 