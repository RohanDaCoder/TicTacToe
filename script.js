let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let isMuted = false;
const scores = {
  x: 0,
  o: 0,
  draws: 0,
  resets: 0,
};
$(document).ready(function() {
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
        $('.cell').eq(index).addClass(`winner`);
      });
      $('#text').text(`Player ${currentPlayer} wins!`);
      currentPlayer === "X" ? scores.x++ : scores.o++;
      playSound(winSound);
      return true;
    }
    if (!board.includes('')) {
      gameActive = false;
      $('#text').text('Game is a draw!');
      $('.cell').addClass('draw shake');
      scores.draws++;
      playSound(drawSound);
      return false;
    }
    return null;
  }

  function getCellColor() {
    return currentPlayer === 'O' ? 'text-yellow-500' : 'text-indigo-500';
  }

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    $(clickedCell).text(currentPlayer);
    $(clickedCell).addClass(`transition-colors duration-300 ${getCellColor()}`)
    playSound(cellSound);
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    $('#text').text(`Player ${currentPlayer}'s turn`);
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
    };
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
    $('#text').text('');
    $('.cell').text('').removeClass('winner draw shake text-yellow-500 text-indigo-500');
    $('#text').text(`Player ${currentPlayer}'s turn`);
    playSound(restartSound);
    scores.resets++;
  });

  $('#mute-button').click(function() {
    isMuted = !isMuted;
    const iconSrc = isMuted ?
      '/assets/svg/muted.svg' :
      '/assets/svg/unmute.svg';
    $('#mute-icon').attr('src', iconSrc);
  });
  $('#score').click(function() {
    alert(`Player X's Score: ${scores.x}\nPlayer O's Score: ${scores.o}\nDraws: ${scores.draws}\nResets: ${scores.resets}`);
  })
});