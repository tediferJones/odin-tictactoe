
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
    let currentTurn = 0

    function runGame(location) {
        if (winner === null && currentTurn < 9) {
            currentBoard.placeMarker(currentPlayer, location)
            winCheck()
            switchTurns()
            display()
            currentTurn++
            console.log(currentTurn)
        }

        if (winner != null || currentTurn === 9) {
            announceWinner = document.createElement('div')
            announceWinner.classList.add('announceWinner')
            if (winner != null) {
                // console.log("dooky")
                announceWinner.innerHTML = `The winner is ${winner.name}`
            } else if (currentTurn === 9) {
                // console.log('ITS A TIE')
                announceWinner.innerHTML = `It's a Tie!`
            }
            document.querySelector('#winMessage').innerHTML = ''
            document.querySelector('#winMessage').appendChild(announceWinner)
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

const addPlayer = document.createElement('button')
addPlayer.classList.add("submitBtn")
addPlayer.innerHTML = 'Add Player'
addPlayer.addEventListener('click', () => {
    submitter()
})
document.querySelector('#formContainer').appendChild(addPlayer)

function submitter() {
    let player1Name = document.querySelector('form').player1Name.value
    let player2Name = document.querySelector('form').player2Name.value
    let player1Marker = document.querySelector('form').player1Marker.value

    let options = ['X', 'O']
    options.splice(options.indexOf(player1Marker), 1)
    // console.log(options)
    let player2Marker = options[0]
    // console.log(player1Name, player1Marker, player2Name, player2Marker)
    PlayGame(createPlayer(player1Name, player1Marker), createPlayer(player2Name, player2Marker)).display()

}

// submitter()

// p1 = createPlayer("jeff", "X")
// p2 = createPlayer("timmy", "O")

// let new_game = PlayGame(p1,p2)
// new_game.display()

// PlayGame(createPlayer("jeff", "X"), createPlayer('timmy', 'O')).display()

// clean up UI
// [ DONE ] make form for user to make their own player
// make start/reset function (display function effectively starts the game, to reset, set board equal to default)
// make computer function to play game
