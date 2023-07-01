import random

class Food:
    def __init__(self, board_width, board_height):
        self.position = self.generate_position(board_width, board_height)

    def generate_position(self, board_width, board_height):
        # Generate a random position for the food within the game board boundaries
