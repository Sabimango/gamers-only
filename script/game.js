var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
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
var computers;
var platforms;
var cursors;
var player2Controls;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "../images/hyperbackground_pixel_2.png");
  this.load.image("ground", "../images/platform_ground.png");
  this.load.image("star", "../images/coffee1.png");
  this.load.image("bomb", "../images/bug123.png");
  this.load.image("platform_big", "../images/platform_big.png");
  this.load.image("platform_medium", "../images/platform_medium.png");
  this.load.image("computer", "../images/computer_js_38.png");
  this.load.spritesheet("dude", "../images/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("pikachu", "../images/pikachu_sprite1.png", {
    frameWidth: 82,
    frameHeight: 75,
  });
  this.load.spritesheet("ariana", "../images/ariana_grande_sprite_brown_red.png", {
    frameWidth: 156,
    frameHeight: 197,
  });
  this.load.audio("coffee_sound", "../sounds/coffee_drink2.mp3");
  this.load.audio("computersound", "../sounds/computersound.mp3");
  this.load.audio("thankunext", "../sounds/thankunext.mp3");
  this.load.audio("gameoversound", "../sounds/gameoversound.mp3");
  console.log(this);
  console.log(game);
}

function create() {
  //  A simple background for our game
  this.add.image(600, 330, "sky");
  thankunext = this.sound.add("thankunext");
  thankunext.play();

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(700, 700, "ground").setScale(1).refreshBody();

  //  Now let's create some ledges
  platforms.create(600, 480, "platform_big").setScale(1);
  platforms.create(140, 300, "platform_medium");
  platforms.create(1060, 300, "platform_medium");
  platforms.create(600, 170, "platform_medium");

  // The player and its settings
  player = this.physics.add.sprite(700, 600, "pikachu").setScale(0.8);

  //  Player physics properties. Give the little guy a slight bounce.

  // player.setCollideWorldBounds(true);

  player2 = this.physics.add.sprite(480, 570, "ariana").setScale(0.6);

  // player2.setCollideWorldBounds(true);

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
    repeat: 6,
    setXY: { x: 50, y: 0, stepX: 185 },
    setScale: { x: 1.2, y: 1.2 },
  });

  stars.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
  });

  bombs = this.physics.add.group();

  computers = this.physics.add.group();

  //  The score
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#FFF",
    backgroundColor: "#000000",
    fontFamily: "Arial",

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
    player.setVelocityX(-280);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(280);

    player.anims.play("right", true);
  } else {
    // if you dont press left or right
    player.setVelocityX(0);

    player.anims.play("turn");
  }
  // so the character can jump, but needs to touch the ground
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-600);
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
    player2.setVelocityX(-280);

    player2.anims.play("left_a", true);
  } else if (player2Controls.right.isDown) {
    player2.setVelocityX(280);

    player2.anims.play("right_a", true);
  } else {
    player2.setVelocityX(0);

    player2.anims.play("turn_a");
  }

  if (player2Controls.up.isDown && player2.body.touching.down) {
    player2.setVelocityY(-600);
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
  if (cursors.right.isDown && player.x > this.physics.world.bounds.width) {
    player.x = -1;
  }
  if (cursors.left.isDown && player.x < 0) {
    player.x = this.physics.world.bounds.width;
  }

  if (
    player2Controls.right.isDown &&
    player2.x > this.physics.world.bounds.width
  ) {
    player2.x = -1;
  }
  if (player2Controls.left.isDown && player2.x < 0) {
    player2.x = this.physics.world.bounds.width;
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);

  coffee_sound = this.sound.add("coffee_sound");
  coffee_sound.play();

  //  Add and update the score
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var computer = computers.create(1050, 16, "computer");
    computer.setBounce(1);
    computer.setCollideWorldBounds(true);
    computer.setVelocity(Phaser.Math.Between(-200, 200), 20);
    computer.setScale(1.2, 1.2);
  }
}

function hitComputer(player, computer) {
  computer.disableBody(true, true);
  computersound = this.sound.add("computersound");
  computersound.play();
  score += 50;
  scoreText.setText("Score: " + score);
  var bomb = bombs.create(20, 16, "bomb");
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  if (computers.countActive(true) === 0) {
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();
  // this.registry.destroy();
  // this.events.off();
  // this.scene.restart();

  thankunext.stop();

  gameoversound = this.sound.add("gameoversound");
  gameoversound.play();

  player.setTint(0xff0000);

  player.anims.play("turn");

  player2.setTint(0xff0000);

  player2.anims.play("turn_a");

  gameOver = true;
  helloButton = this.add.text(410, 150, "Game Over", {
    fontSize: "72px",
    fill: "#FFF",
    fontFamily: "Arial",
    backgroundColor: "#000000",
  });

  helloButton1 = this.add.text(350, 350, "Click to Restart", {
    fontSize: "72px",
    fill: "#FFF",
    fontFamily: "Arial",
    backgroundColor: "#000000",
  });

  helloButton1 = this.add.text(220, 550, "Tip: Computers spawn in the right corner and bugs spawn in left corner :)", {
    fontSize: "25px",
    fill: "#FFF",
    fontFamily: "Arial",
    backgroundColor: "#000000",
  });

  this.input.once(
    "pointerdown",
    function (event) {
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      this.scene.restart();
      this.physics.start();
      gameOver = false; // restart current scene
    },
    this
  );
}
