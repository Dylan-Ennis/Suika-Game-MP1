# Suika-Game-MP1

## The name of my game is Suika game and it is an attempt at copying an already existing game with the same name.

## Description

- This is a game similar to Tetris where things fall from the top of the screen within a box. Instead of blocks the objects are fruit and when they collide with another fruit of the same color/type they turn into the next fruit untill you make it through the entire list of fruit or just get more and more points to your liking. 

## Rules

- There is a line at the top of the box and just like in Tetris, if you pass that line you lose and have to restart your game while losing your points.

- There are 11 fruits to get through and the final fruit is a watermelon (subject to change).

- Each fruit is worth different points and points are gained when the fruit appears after being combined. 

- You click to drop fruit from then top and line them up with other fruit to combine them, but the next fruit you get to drop is random from a set pool of the first 5 fruits.

- The point of the game is to get as many points as possible and reach the watermelon fruit at the end.

## Frame Work

- I would like to start out by making the styling of everything first if I can, so this would include the pictures I am using for fruit, the walls of my box, the scoreboard, background color, and object colors.

- Once the styling is done I would like to add physics of fruits falling and combining when colliding, and possibly bouncing up when they are pushed by other fruits growing in size below them. 

- After I achieve how they move I would then apply math to add points for which fruits are combined and the scoreboard would update with the total number of points achieved during the game. 

- I would also then need to add a line at the top of the box to determine when the game ends by a function that recognizes when a fruit passes that line. Maybe something like an observer.

