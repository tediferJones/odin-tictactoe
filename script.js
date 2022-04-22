
const Gameboard = (() => {
    let board = [1,2,3,4,5,6,7,8,9]
    return { board }
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
    let currentPlayer = [player1, player2][Math.floor(Math.random() * 2)]
    let winner = null
    let currentTurn = 0
    addResetBtn()
    display()

    function runGame(location) {
        if (winner === null && currentTurn < 9) {
            placeMarker001(currentPlayer, location)
            winCheck()
            switchTurns()
            display()
            currentTurn++
        }

        if (winner != null || currentTurn === 9) {
            announceWinner = document.createElement('div')
            announceWinner.classList.add('announceWinner')
            if (winner != null) {
                announceWinner.innerHTML = `The winner is ${winner.name}`
            } else if (currentTurn === 9) {
                announceWinner.innerHTML = `It's a Tie!`
            }
            document.querySelector('#winMessage').innerHTML = ''
            document.querySelector('#winMessage').appendChild(announceWinner)
        }
    }

    function placeMarker001(player, location) {
        if (['1','2','3','4','5','6','7','8','9'].includes(location)) {
            player.spotsTaken.push(currentBoard.board.splice(location - 1, 1, player.marker)[0])
        } else if (['X','O'].includes(location)) {
            switchTurns()
            currentTurn--
        }
    }

    function winCheck() {
        const winners = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
        for (let aWin in winners) {
            let checker = (playerArray, winArray) => winArray.every(value => playerArray.includes(value))
            if (checker(currentPlayer.spotsTaken, winners[aWin])) {
                winner = currentPlayer
            }
        }
    }

    function switchTurns() {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else if (currentPlayer === player2) {
            currentPlayer = player1
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
        document.querySelector('#currentPlayer').innerHTML = `It's ${currentPlayer.name}'s turn`
    }

    function addResetBtn() {
        const resetBtn = document.createElement('button')
        resetBtn.classList.add('resetBtn')
        resetBtn.innerHTML = 'RESET'
        resetBtn.addEventListener('click', () => {
            currentBoard.board = [1,2,3,4,5,6,7,8,9]
            player1.spotsTaken = []
            player2.spotsTaken = []
            currentTurn = 0
            winner = null
            document.querySelector('#winMessage').innerHTML = ''
            display()
        })
        document.querySelector('body').appendChild(resetBtn)
    }
}

const addPlayer = document.createElement('button')
addPlayer.classList.add("submitBtn")
addPlayer.innerHTML = 'Start Game'
addPlayer.addEventListener('click', () => {
    let player1Name = document.querySelector('form').player1Name.value
    let player1Marker = document.querySelector('form').player1Marker.value

    let player2Name = document.querySelector('form').player2Name.value
    let options = ['X', 'O']
    options.splice(options.indexOf(player1Marker), 1)
    let player2Marker = options[0]

    // console.log(document.querySelector('form').player1IsComputer.value)
    
    // adding hidden class to #container didnt work so, this is a work around
    document.querySelector('#container').style.backgroundColor = 'black'
    document.querySelector('#formContainer').style.display = 'none'
    PlayGame(createPlayer(player1Name, player1Marker), createPlayer(player2Name, player2Marker))
})
document.querySelector('#formContainer').appendChild(addPlayer)

// clean up UI
// [ DONE ] make form for user to make their own players
// [ DONE ] make start/reset function (display function effectively starts the game, to reset, set board equal to default and reset player spotsTaken arr)
// make computer function to play game
