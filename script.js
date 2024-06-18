$(document).ready(function() {
  // Initialize game variables
  let currentPlayer = 'X';
  let gameActive = true;
  let board = ['', '', '', '', '', '', '', '', ''];

  // Define winning conditions for Tic Tac Toe
  const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

  // Audio elements for sound effects
  const winSound = document.getElementById('win-sound');
  const restartSound = document.getElementById('restart-sound');
  const cellSound = document.getElementById('cell-sound');
  const drawSound = document.getElementById('draw-sound');

  // Function to play sound effects
  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }

  // Function to check if a player has won
  function checkWin() {
    let roundWon = false;
    let winningCondition = null;

    // Iterate through each winning condition
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];

      // Check if all three cells in a winning condition are the same and not empty
      if (a === '' || b === '' || c === '') {
        continue; // Skip to the next condition if any cell is empty
      }
      if (a === b && b === c) {
        roundWon = true;
        winningCondition = winCondition;
        break; // Found a winning condition, exit loop
      }
    }

    // Handle win condition
    if (roundWon) {
      gameActive = false;
      // Add 'winner' class to winning cells
      winningCondition.forEach(index => {
        $('.cell').eq(index).addClass('winner');
      });
      $('#message').text(`Player ${currentPlayer} wins!`);
      playSound(winSound);
      return true;
    }

    // Handle draw condition
    if (!board.includes('')) {
      gameActive = false;
      // Add 'draw' class to all cells
      $('.cell').addClass('draw');
      $('#message').text('Game is a draw!');
      $('#game-board').addClass('shake');
      playSound(drawSound);
      return false;
    }

    return null; // Game is still active
  }

  // Function to handle a cell being clicked
  function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    $(clickedCell).text(currentPlayer); // Display current player's symbol in the cell
    playSound(cellSound);
  }

  // Function to switch players after each turn
  function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    $('#turn').text(`Player ${currentPlayer}'s turn`);
  }

  // Function to validate game result after each turn
  function handleResultValidation() {
    let win = checkWin();
    if (win === null) {
      handlePlayerChange();
    }
  }

  // Event listener for when a cell is clicked
  $('.cell').click(function() {
    const clickedCellIndex = $(this).index();
    if (board[clickedCellIndex] !== '' || !gameActive) {
      return; // If cell is already played or game is over, do nothing
    }
    handleCellPlayed(this, clickedCellIndex); // Handle the cell that was clicked
    handleResultValidation(); // Validate the result after each move
  });

  // Event listener for reset button
  $('#reset').click(function() {
    // Reset game variables and UI
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    $('#turn').text(`Player ${currentPlayer}'s turn`);
    $('#message').text('');
    $('.cell').text('').removeClass('winner draw'); // Remove 'winner' and 'draw' classes from cells
    $('#game-board').removeClass('shake');
    playSound(restartSound);
  });
});