$(document).ready(function() {
  let currentPlayer = 'X';
  let gameActive = true;
  let board = ['', '', '', '', '', '', '', '', ''];
  let isMuted = false;

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

  const winSound = document.getElementById('win-sound');
  const restartSound = document.getElementById('restart-sound');
  const cellSound = document.getElementById('cell-sound');
  const drawSound = document.getElementById('draw-sound');

  function playSound(sound) {
    if (!isMuted) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  function checkWin() {
    let roundWon = false;
    let winningCondition = null;
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        winningCondition = winCondition;
        break;
      }
    }
    if (roundWon) {
      gameActive = false;
      winningCondition.forEach(index => {
        $('.cell').eq(index).addClass('winner');
      });
      $('#message').text(`Player ${currentPlayer} wins!`);
      playSound(winSound);
      return true;
    }
    if (!board.includes('')) {
      gameActive = false;
      $('#message').text('Game is a draw!');
      $('.cell').addClass('draw shake');
      playSound(drawSound);
      return false;
    }
    return null;
  }

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    $(clickedCell).text(currentPlayer);
    playSound(cellSound);
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    $('#turn').text(`Player ${currentPlayer}'s turn`);
  }

  function handleResultValidation() {
    let win = checkWin();
    if (win === null) {
      handlePlayerChange();
    }
  }

  $('.cell').click(function() {
    const clickedCellIndex = $(this).index();
    if (board[clickedCellIndex] !== '' || !gameActive) {
      return;
    }
    handleCellPlayed(this, clickedCellIndex);
    handleResultValidation();
  });

  $('#reset').click(function() {
    if (board.every(cell => cell === '')) {
      return;
    }
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    $('.cell').text('').removeClass('winner draw shake');
    $('#message').text('');
    $('#turn').text(`Player ${currentPlayer}'s turn`);
    playSound(restartSound);
  });

  $('#mute-button').click(function() {
    isMuted = !isMuted;
    const iconSrc = isMuted ?
      'https://github.com/RohanDaCoder/TicTacToe/raw/main/assets/svg/muted.svg' :
      'https://github.com/RohanDaCoder/TicTacToe/raw/main/assets/svg/unmute.svg';
    $('#mute-icon').attr('src', iconSrc);
  });
});