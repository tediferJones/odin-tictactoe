
const Gameboard = (() => {
    let board = [1,2,3,4,5,6,7,8,9]

    function placeMarker(player, location) {
        // console.log(Number(location))
        if (['1','2','3','4','5','6','7','8','9'].includes(location)) {
            player.spotsTaken.push(board.splice(location - 1, 1, player.marker)[0])
        }
    }

    return {
        board,
        placeMarker,
    }
})();

const createPlayer = (name, marker) => {
    spotsTaken = []
    return {
        name,
        marker,
        spotsTaken
    }
}

const PlayGame = (player1, player2) => {
    let currentBoard = Gameboard
    let currentPlayer = player1
    let winner = null
    // let currentTurn = 0

    function runGame(location) {
        if (winner === null) {
            currentBoard.placeMarker(currentPlayer, location)
            winCheck()
            switchTurns()
            display()
        } 
        if (winner != null) {
            console.log(`WINNER IS ${winner.name}`)
            // maybe append a div with little winner announcement here
        }
    }

    function switchTurns() {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else if (currentPlayer === player2) {
            currentPlayer = player1
        }
    }

    function winCheck() {
        const winners = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

        for (aWin in winners) {
            let checker = (playerArray, winArray) => winArray.every(value => playerArray.includes(value))

            if (checker(currentPlayer.spotsTaken, winners[aWin])) {
                winner = currentPlayer
            }
        }
    }

    function display() {
        myContainer = document.querySelector('#container')
        myContainer.innerHTML = ''        
        for (i in currentBoard.board) {
            let tempDiv = document.createElement('div')
            tempDiv.classList.add('location')
            tempDiv.innerHTML = currentBoard.board[i]
            tempDiv.addEventListener('click', () => {
                runGame(tempDiv.innerHTML)
            })
            myContainer.appendChild(tempDiv)
        }
    }

    return {
        display
    }
}

p1 = createPlayer("jeff", "X")
p2 = createPlayer("timmy", "O")

let new_game = PlayGame(p1,p2)
new_game.display()

// win arrays can be stored in a "check win" function
// check win function needs to reference the people playing the game
// thus the function should live in the PlayGame object