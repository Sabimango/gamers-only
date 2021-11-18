import Pong from "./Pong.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [ Pong ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
    },
  },
};

new Phaser.Game(config);
