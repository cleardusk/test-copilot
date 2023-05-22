import pygame
import random

# Initialize Pygame
pygame.init()

# Set up the game window
window_width = 500
window_height = 500
window = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption("Snake Game")

# Set up the game clock
clock = pygame.time.Clock()

# Set up the colors
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)

# Set up the font
font = pygame.font.SysFont(None, 25)

# Set up the snake
snake_block_size = 10
snake_speed = 15
snake_list = []
snake_length = 1
snake_x = window_width / 2
snake_y = window_height / 2
snake_x_change = 0
snake_y_change = 0

# Set up the obstacles
obstacle_block_size = 10
obstacle_list = []
for i in range(10):
    obstacle_x = round(random.randrange(0, window_width - obstacle_block_size) / 10.0) * 10.0
    obstacle_y = round(random.randrange(0, window_height - obstacle_block_size) / 10.0) * 10.0
    obstacle_list.append([obstacle_x, obstacle_y])


# Set up the food
food_block_size = 10
food_x = round(random.randrange(0, window_width - food_block_size) / 10.0) * 10.0
food_y = round(random.randrange(0, window_height - food_block_size) / 10.0) * 10.0

# Define the function to draw the snake
def draw_snake(snake_block_size, snake_list):
    snake_color = (0, 255, 0)  # green color
    for x in snake_list:
        pygame.draw.rect(window, snake_color, [x[0], x[1], snake_block_size, snake_block_size])

# Define the main game loop
def game_loop():
    # Set up the snake variables
    global snake_x, snake_y, snake_x_change, snake_y_change, snake_list, snake_length, food_x, food_y

    # Set up the game over flag
    game_over = False

    # Start the game loop
    while not game_over:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    snake_x_change = -snake_block_size
                    snake_y_change = 0
                elif event.key == pygame.K_RIGHT:
                    snake_x_change = snake_block_size
                    snake_y_change = 0
                elif event.key == pygame.K_UP:
                    snake_y_change = -snake_block_size
                    snake_x_change = 0
                elif event.key == pygame.K_DOWN:
                    snake_y_change = snake_block_size
                    snake_x_change = 0
                elif event.key == pygame.K_q:
                    print("Your score is:", snake_length)
                    game_over = True

        # Move the snake
        snake_x += snake_x_change
        snake_y += snake_y_change

        # Check for collisions with the walls
        if snake_x < 0:
            snake_x = window_width - snake_block_size
        elif snake_x >= window_width:
            snake_x = 0
        elif snake_y < 0:
            snake_y = window_height - snake_block_size
        elif snake_y >= window_height:
            snake_y = 0
        # if snake_x < 0 or snake_x >= window_width or snake_y < 0 or snake_y >= window_height:
            # game_over = True

        # Check for collisions with the food
        if snake_x == food_x and snake_y == food_y:
            food_x = round(random.randrange(0, window_width - food_block_size) / 10.0) * 10.0
            food_y = round(random.randrange(0, window_height - food_block_size) / 10.0) * 10.0
            snake_length += 1

        # Update the snake list
        snake_head = []
        snake_head.append(snake_x)
        snake_head.append(snake_y)
        snake_list.append(snake_head)
        if len(snake_list) > snake_length:
            del snake_list[0]

        for block in snake_list[:-1]:
            if block == snake_head:
                game_over = True

        # Check for collisions with the snake's own body
        for segment in snake_list[:-1]:
            if segment == snake_head:
                game_over = True

        # Check for collisions with the obstacles
        for obstacle in obstacle_list:
            if snake_x == obstacle[0] and snake_y == obstacle[1]:
                print("Your score is:", snake_length)
                game_over = True

        # Draw the game objects
        window.fill(white)

        # Draw the food
        food_color = (255, 0, 0)
        food_radius = food_block_size // 2
        food_pos = (int(food_x + food_radius), int(food_y + food_radius))
        pygame.draw.circle(window, food_color, food_pos, food_radius)
        # pygame.draw.rect(window, red, [food_x, food_y, food_block_size, food_block_size])

        # Draw the obstacles
        for obstacle in obstacle_list:
            obstacle_color = (128, 128, 128)  # gray color
            pygame.draw.rect(window, obstacle_color, [obstacle[0], obstacle[1], obstacle_block_size, obstacle_block_size])

        draw_snake(snake_block_size, snake_list)
        score_text = font.render("Score: " + str(snake_length - 1), True, black)
        window.blit(score_text, [0, 0])
        pygame.display.update()

        # Set the game clock
        clock.tick(snake_speed)

    # Quit Pygame
    pygame.quit()

# Start the game loop
game_loop()