import Phaser, { GameObjects } from 'phaser';

export default class Demo extends Phaser.Scene {

  wizardSprite?: Phaser.GameObjects.Sprite;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('wizard', 'assets/wizard.png');
  }

  update() {
  }

  create() {

    let offset = 25;

    this.wizardSprite = this.add.sprite(0, offset, 'wizard');
    this.wizardSprite.flipX = true;
    this.wizardSprite.setScale(0.25, 0.25);
    // get the bounds of the wizardSprite
    let bounds = this.wizardSprite.getBounds();
    // center the wizardSprite
    this.wizardSprite.setPosition(bounds.width / 2, offset + (bounds.height / 2));

    // Create a graphics object to draw a rectangular box around the wizard sprite
    let graphics = this.make.graphics();

    // set the line style
    graphics.lineStyle(2, 0x00ff00);

    // draw a box around the wizard sprite
    // graphics.strokeRect(
    //   0,
    //   28,
    //   bounds.width,
    //   bounds.height
    // );

    // set the line style
    graphics.lineStyle(2, 0x00ff00);
    let columns = 15
    let rows = 8

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        graphics.strokeRect(
          i + (i * bounds.width),
          offset + j + (j * bounds.height),
          bounds.width,
          bounds.height
        );
      }
    }

    // add the graphics to the scene
    this.add.existing(graphics);

  }
}
