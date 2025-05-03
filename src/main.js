// Import Phaser from node_modules
import Phaser from 'phaser';

// Import our scene
import MainScene from './scenes/MainScene';  // NEW: Import the MainScene

// Game configuration
const config = {
  // Type can be Phaser.AUTO, Phaser.CANVAS, or Phaser.WEBGL
  // AUTO lets Phaser choose the best renderer for the device
  type: Phaser.AUTO,

  // Game canvas width and height
  width: 800,
  height: 600,

  // Background color of the game canvas (RGB format)
  backgroundColor: '#2d2d2d',

  // DOM element ID to place the game canvas in
  parent: 'game-container',

  // Scale manager configuration
  scale: {
    // Center the game canvas both horizontally and vertically
    autoCenter: Phaser.Scale.CENTER_BOTH,

    // Scale mode - can be NONE, FIT, RESIZE, etc.
    mode: Phaser.Scale.FIT
  },

  // Physics configuration
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // No gravity by default (top-down game)
      debug: true        // Set to false in production to hide physics debug info
    }
  },

  // Pixel art settings (prevents blurring of pixel art when scaled)
  pixelArt: true,

  // Anti-aliasing (set to false for crisp pixel art)
  antialias: false,

  // Scene(s) to include
  scene: [MainScene]  // CHANGED: Now includes MainScene
};

// Create the game instance (with empty scene array for now)
new Phaser.Game(config);