var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 320 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player;
var player2;
var stars;
var bombs;
var computers
var platforms;
var cursors;
var player2Controls;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "../images/hyperbackground_pixel_2.png");
  this.load.image("ground", "../images/platform.png");
  this.load.image("star", "../images/coffee1.png");
  this.load.image("bomb", "../images/bug123.png");
  this.load.image("computer", "../images/computer_js_38.png");
  this.load.spritesheet("dude", "../images/dude.png",
    {
      frameWidth: 32,
      frameHeight: 48,
    });
  this.load.spritesheet("pikachu", "../images/pikachu_sprite1.png",
    {
      frameWidth: 82,
      frameHeight: 75,
    });
    this.load.spritesheet("ariana", "../images/ariana_grande_sprite3.png",
    {
      frameWidth: 156,
      frameHeight: 206,
    });
  this.load.audio("coffee_sound", "../sounds/coffee_drink2.mp3");
  this.load.audio("windows_sound", "../sounds/windows_sound.mp3");
  console.log(this);
  console.log(game);
}

function create() {
  //  A simple background for our game
  this.add.image(600, 300, "sky");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(700, 740, "ground").setScale(4).refreshBody();

  //  Now let's create some ledges
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  // The player and its settings
  player = this.physics.add.sprite(700, 450, "pikachu").setScale(1);

  //  Player physics properties. Give the little guy a slight bounce.
  
  player.setCollideWorldBounds(true);

  player2 = this.physics.add.sprite(100, 450, "ariana").setScale(1);

  
  player2.setCollideWorldBounds(true);

  //  Pikachi animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("pikachu", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "pikachu", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("pikachu", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
// Ariana animations
  this.anims.create({
    key: "left_a",
    frames: this.anims.generateFrameNumbers("ariana", { start: 13, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn_a",
    frames: [{ key: "ariana", frame: 6 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right_a",
    frames: this.anims.generateFrameNumbers("ariana", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });


  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  player2Controls = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });
  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  stars = this.physics.add.group({
    key: "star",
    repeat: 1,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  bombs = this.physics.add.group();

  computers = this.physics.add.group();

  //  The score
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player2, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(computers, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);

  this.physics.add.collider(player, computers, hitComputer, null, this);

  this.physics.add.overlap(player2, stars, collectStar, null, this);

  this.physics.add.collider(player2, bombs, hitBomb, null, this);

  this.physics.add.collider(player2, computers, hitComputer, null, this);
}

function update() {
  if (gameOver) {
    return;
  }
  //move to the left with speed -160
  if (cursors.left.isDown) {
    player.setVelocityX(-220);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(220);

    player.anims.play("right", true);
  } else {
    // if you dont press left or right
    player.setVelocityX(0);

    player.anims.play("turn");
  }
  // so the character can jump, but needs to touch the ground
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-500);
  }
  // to run fast (sprint) to the left
  if (cursors.down.isDown && player.body.touching.down && cursors.left.isDown) {
    player.setVelocityX(-330);
  }
  // to run fast (sprint) to the right
  if (
    cursors.down.isDown &&
    player.body.touching.down &&
    cursors.right.isDown
  ) {
    player.setVelocityX(330);
  }
  //slow fall, cool
  if (cursors.down.isDown && player.body.touching.none) {
    player.setVelocityY(50);
  }
  // player2 controls

  if (player2Controls.left.isDown) {
    player2.setVelocityX(-220);

    player2.anims.play("left_a", true);
  } else if (player2Controls.right.isDown) {
    player2.setVelocityX(220);

    player2.anims.play("right_a", true);
  } else {
    player2.setVelocityX(0);

    player2.anims.play("turn_a");
  }

  if (player2Controls.up.isDown && player2.body.touching.down) {
    player2.setVelocityY(-330);
  }
  if (
    player2Controls.down.isDown &&
    player2.body.touching.down &&
    player2Controls.left.isDown
  ) {
    player2.setVelocityX(-330);
  }

  if (
    player2Controls.down.isDown &&
    player2.body.touching.down &&
    player2Controls.right.isDown
  ) {
    player2.setVelocityX(330);
  }
  if (player2Controls.down.isDown && player2.body.touching.none) {
    player2.setVelocityY(50);
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);

  coffee_sound = this.sound.add('coffee_sound');
  coffee_sound.play()


  //  Add and update the score
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var computer = computers.create(x, 16, "computer");
    computer.setBounce(1);
    computer.setCollideWorldBounds(true);
    computer.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

function hitComputer(player, computer) {
  computer.disableBody(true, true);
  windows_sound = this.sound.add('windows_sound');
  windows_sound.play()

  if (computers.countActive(true) === 0) {

    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    });
  }





  //     //  A new batch of stars to collect
  //     stars.children.iterate(function (child) {
  //       child.enableBody(true, child.x, 0, true, true)






}


function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  player2.setTint(0xff0000);

  player2.anims.play("turn");

  gameOver = true;
}
