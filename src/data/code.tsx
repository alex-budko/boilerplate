export const code = [
  {
    title: "HTML",
    code: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Simple Snake Game</title>
          <link rel="stylesheet" type="text/css" href="styles.css">
        </head>
        <body>
          <canvas id="game-board"></canvas>
          <script src="snake.js"></script>
        </body>
        </html>
      `,
  },
  {
    title: "CSS",
    code: `
        body {
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
  
        #game-board {
          height: 320px;
          width: 320px;
          border: 1px solid #fff;
        }
      `,
  },
  {
    title: "JavaScript",
    code: `
        var canvas = document.getElementById('game-board');
        var context = canvas.getContext('2d');
  
        var box = 32;
        var snake = [];
        snake[0] = {
          x: box * 5,
          y: box * 5
        };
  
        function draw() {
          for(let i = 0; i < snake.length; i++) {
            context.fillStyle = (i == 0) ? 'green' : 'white';
            context.fillRect(snake[i].x, snake[i].y, box, box);
  
            context.strokeStyle = 'red';
            context.strokeRect(snake[i].x, snake[i].y, box, box);
          }
        }
  
        var game = setInterval(draw, 100);
      `,
  },
];
