document.addEventListener("DOMContentLoaded", function () {
    // Initialize the current player as 'X'
    let currentPlayer = 'X';

    // Get the turn text element by its ID
    const turnText = document.getElementById('turn');

    // Get all the cells in the game board
    const cells = document.querySelectorAll('.cell');

    // Create an Audio element for the cell click sound
    const cellSound = new Audio('cell.wav');

    // Create an Audio element for the restart sound
    const restartSound = new Audio('restart.wav');

    // Create an Audio element for the win sound
    const winSound = new Audio('win.wav'); // New win sound effect

    // Function to handle a player's move when a cell is clicked
    function makeMove(event) {
        const cell = event.target;
        // Check if the cell is empty
        if (!cell.textContent) {
            // Set the current player's symbol in the cell
            cell.textContent = currentPlayer;
            // Toggle to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            // Update the turn text
            turnText.textContent = `It's ${currentPlayer}'s turn`;
            // Disable further clicks on this cell
            cell.style.pointerEvents = 'none';
            // Check for a winner or a draw
            checkWinner();
            // Play the cell click sound directly
            cellSound.play();
        }
    }

    // Function to check if there is a winner or a draw
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        // Check each winning combination
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                // Display the winning message
                turnText.textContent = `Player ${cells[a].textContent} wins!`;
                // Highlight the winning cells
                cells[a].style.backgroundColor = 'lightgreen';
                cells[b].style.backgroundColor = 'lightgreen';
                cells[c].style.backgroundColor = 'lightgreen';
                // Disable the board
                disableBoard();
                // Play the win sound directly
                winSound.play();
                return;
            }
        }

        // Check if it's a draw
        if ([...cells].every(cell => cell.textContent)) {
            turnText.textContent = "It's a draw!";
        }
    }

    // Function to disable the board after a win or draw
    function disableBoard() {
        cells.forEach(cell => cell.style.pointerEvents = 'none');
    }

    // Function to restart the game
    function restartGame() {
        cells.forEach(cell => {
            // Clear the cell content
            cell.textContent = '';
            // Reset cell background color
            cell.style.backgroundColor = '#7289da';
            // Enable cell clicks
            cell.style.pointerEvents = 'auto';
        });

        // Reset the current player to 'X'
        currentPlayer = 'X';
        // Update the turn text
        turnText.textContent = `It's ${currentPlayer}'s turn`;
        // Play the restart sound directly
        restartSound.play();
    }

    // Add click event listeners to each cell for player moves
    cells.forEach(cell => cell.addEventListener('click', makeMove));

    // Add click event listener for the restart button
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);
});
