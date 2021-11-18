
let center, text, ball, player1, player2, player1Controls, player2Controls, startGame;
let pointPlayer1 = 0;
let pointPlayer2 = 0;


class Pong extends Phaser.Scene {

  preload() {
    // what assets does the game need
    this.load.image("ball", "./ball.png");
    this.load.image("player", "./player.png");
  }

  create() {
    center = {
      x:this.physics.world.bounds.width / 2,
      y:this.physics.world.bounds.height / 2
    }

    ball = this.physics.add.sprite(center.x, center.y, "ball");
    ball.setCollideWorldBounds(true)
    ball.setBounce(1);
    
    player1 = this.physics.add.sprite(10, center.y, 'player')
    player1.setScale(0.5)
    player1.setCollideWorldBounds(true);
    player1.setImmovable(true);
    player1Controls = this.input.keyboard.createCursorKeys() 

    player2 = this.physics.add.sprite(center.x * 2 - 10, center.y, "player");
    player2.setScale(0.5);
    player2.setCollideWorldBounds(true);
    player2.setImmovable(true);
    
    player2Controls = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
    });

    text = this.add.text(center.x, 10, pointPlayer2 + ' - ' + pointPlayer1, {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: 50
    });
    text.setOrigin(0.5, 0);
    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;
    

  }

  update() {
    if (player1Controls.space.isDown) {
      startGame = true;
      ball.setVelocityX(-100);
    }

    if (startGame) {
      this.physics.add.collider(player1, ball, bounce, null, this);
      this.physics.add.collider(player2, ball, bounce, null, this);
      point(this.physics.world);
      if (player1Controls.up.isDown) {
        player1.setVelocity(0, -200);
      }
      if (player1Controls.down.isDown) {
        player1.setVelocity(0, 200);
      }
      if (player2Controls.up.isDown) {
        player2.setVelocity(0, -200);
      }
      if (player2Controls.down.isDown) {
        player2.setVelocity(0, 200);
      }
    }

    console.log("update");
  }
}
function point(world) {
  if (ball.x < 0) {
    pointPlayer1 = pointPlayer1 + 1
    resetGame();
  }
  if (ball.x > center.x * 2) {
    pointPlayer2 = pointPlayer2 + 1;
    resetGame()
  }
}

function resetGame() {
  ball.setVelocity(0)
  text.setText(pointPlayer2 + " - " + pointPlayer1);
  ball.setPosition(center.x, center.y)
  player1.setVelocity(0)
  player2.setVelocity(0)
  player1.setPosition(10, center.y);
  player2.setPosition(center.x * 2 - 10, center.y);
  startGame = false
}

function bounce(player, ball) {
  if (ball.body.velocity.x < 500) {
    ball.setVelocityX(ball.body.velocity.x * 1.2);
  }
  if (ball.y < player.y) {
    ball.setVelocityY(ball.body.velocity.y + 70);
  } else {
    ball.setVelocityY(ball.body.velocity.y - 70);
  }
}
export default Pong;

