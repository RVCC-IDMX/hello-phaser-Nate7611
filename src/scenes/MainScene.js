import Phaser from 'phaser';

/**
 * MainScene - The primary scene for our game
 * This class handles all the main game logic, rendering, and interactions
 */
export default class MainScene extends Phaser.Scene {
  constructor() {
    // Scene key - used to start or reference this scene
    super('MainScene');

    // Initialize any properties here
    this.score = 0;
  }

  /**
   * Preload - Called before the scene is created
   * Use this to load assets (images, sounds, etc.)
   */
  preload() {
    // Load the Phaser logo image
    this.load.image('logo', 'assets/images/phaser-logo-200x150.png');

    // Load a sound effect for clicking
    this.load.audio('click', 'assets/sounds/mixkit-sci-fi-click-900.wav');
  }

  /**
   * Create - Called once after preload is complete
   * Use this to create game objects and set up the scene
   */
  create() {
    // Add a title
    this.add.text(400, 100, 'Hello Phaser!', {
      font: '64px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Add background details or instructions
    this.add.text(400, 180, 'My First Phaser Game', {
      font: '24px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Add the Phaser logo image to the center of the screen
    const logo = this.add.image(400, 300, 'logo');

    // Make the logo interactive
    logo.setInteractive();

    this.logo = logo;
    this.isHovering = false;
    this.pointer = this.input.activePointer;
    this.timeSinceTeleport = 0;
    this.teleportInterval = 1500;

    // Add click handler
    logo.on('pointerdown', () => {
      console.log('Logo clicked!');

      // Play sound when clicked
      this.sound.play('click');

      // Update score
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    });

    // Add hover effects
    logo.on('pointerover', () => {
      logo.setScale(1.1);  // Make logo slightly bigger on hover
      this.isHovering = true;
    });

    logo.on('pointerout', () => {
      logo.setScale(1.0);  // Return to normal size when not hovering
      this.isHovering = false;
    });

    // Add a score display
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '32px Arial',
      fill: '#ffffff'
    });

    // Add instructions
    this.add.text(400, 500, 'Click the logo to increase your score!', {
      font: '18px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);
  }

  /**
   * Update - Called every frame
   * Use this for gameplay logic, movement, etc.
   * @param {number} time - Current time
   * @param {number} delta - Time since last frame
   */
  update(time, delta) {
    // The time parameter is the total elapsed time in milliseconds
    // The delta parameter is the time elapsed since the last frame

    // This is where you'd put code that needs to run every frame
    // For example, checking for collisions, movement, etc.

    // For now, we'll leave it empty or add basic debugging
    // console.log('Update called', time, delta);

    if (this.logo && this.pointer) {
      this.logo.rotation += Phaser.Math.DegToRad(90) * (delta / 1000);

      const pointerX = this.pointer.worldX;
      const pointerY = this.pointer.worldY;
      const dx = this.logo.x - pointerX;
      const dy = this.logo.y - pointerY;
      const distance = Math.hypot(dx, dy);

      if (distance < 400) {
        const moveSpeed = 200 * (this.score / 20 || 1);
        const moveStep = (moveSpeed * delta) / 1000;

        this.logo.x += (dx / distance) * moveStep;
        this.logo.y += (dy / distance) * moveStep;
      }

      const minScale = 0.2;
      const scale = Phaser.Math.Clamp(1 - this.score * 0.005, minScale, 1);
      this.logo.setScale(scale);

      const halfWidth = (this.logo.width * scale) / 2;
      const halfHeight = (this.logo.height * scale) / 2;
      const maxX = this.sys.game.config.width - halfWidth;
      const maxY = this.sys.game.config.height - halfHeight;

      this.logo.x = Phaser.Math.Clamp(this.logo.x, halfWidth, maxX);
      this.logo.y = Phaser.Math.Clamp(this.logo.y, halfHeight, maxY);

      this.timeSinceTeleport += delta;
      if (this.timeSinceTeleport >= this.teleportInterval) {
        this.timeSinceTeleport = 0;

        const newX = Phaser.Math.Between(halfWidth, maxX);
        const newY = Phaser.Math.Between(halfHeight, maxY);
        this.logo.setPosition(newX, newY);
      }
    }
  }
}