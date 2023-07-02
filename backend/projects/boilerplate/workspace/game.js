// Create a new instance of the Game class
const game = new Game();

// Add event listeners to handle user input
document.addEventListener('keydown', (event) => {
    game.handle_input(event);
});

// Start the game
game.start();
