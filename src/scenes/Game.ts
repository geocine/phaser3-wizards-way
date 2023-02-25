import Phaser, { GameObjects } from 'phaser';

const OFFSET = 25;
const TILESIZE = 128;

export default class Demo extends Phaser.Scene {

  wizardSprite?: Phaser.GameObjects.Sprite;
  keyPressed: boolean = false;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('wizard', 'assets/wizard.png');
    this.load.image('tile', 'assets/tile.png');

  }

  update() {
    this.moveWizard();
  }

  moveWizard(): void {
    // check if left or right arrow is pressed
    if (this.input.keyboard.addKey("LEFT").isDown && !this.keyPressed) {
      // move the wizard left
      if (this.wizardSprite!.x - TILESIZE >= 0) {
        this.wizardSprite!.x -= TILESIZE;
      }
      this.keyPressed = true;
    }
    else if (this.input.keyboard.addKey("RIGHT").isDown && !this.keyPressed) {
      // move the wizard right
      if (this.wizardSprite!.x + TILESIZE < this.game.config.width) {
        this.wizardSprite!.x += TILESIZE;
      }
      this.keyPressed = true;
    }
    else if (this.input.keyboard.addKey("UP").isDown && !this.keyPressed) {
      // move the wizard up
      if (this.wizardSprite!.y - TILESIZE >= 0) {
        this.wizardSprite!.y -= TILESIZE;
      }
      this.keyPressed = true;
    }
    else if (this.input.keyboard.addKey("DOWN").isDown && !this.keyPressed) {
      // move the wizard down
      console.log("A", this.wizardSprite!.y + TILESIZE)
      console.log("B", this.game.config.height)
      if (this.wizardSprite!.y + TILESIZE < ((this.game.config.height as number) - TILESIZE)) {
        this.wizardSprite!.y += TILESIZE;
      }
      this.keyPressed = true;
    }

    if (
      this.input.keyboard.addKey("LEFT").isUp &&
      this.input.keyboard.addKey("RIGHT").isUp &&
      this.input.keyboard.addKey("UP").isUp &&
      this.input.keyboard.addKey("DOWN").isUp && this.keyPressed
    ) {
      this.keyPressed = false;
    }
  }

  drawMap(array: number[][]) {
    let windowWidth = this.game.config.width;
    let windowHeight = this.game.config.height;
    let arrayLength = array[0].length;
    let arrayHeight = array.length;
    const tileSize = 128;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {

        if (array[i][j] == 0) continue;

        if (array[i][j] == 1) {
          // tiles
          let tileSprite = this.add.sprite(j * TILESIZE, OFFSET + i * TILESIZE, 'tile');
          tileSprite.setOrigin(0, 0);
          tileSprite.setDisplaySize(TILESIZE, TILESIZE);
        }
      }
    }

  }


  create() {

    // Map definition
    // 0 - Unwalkable path
    // 1 - Tiles
    // 2 - Wizard, add some start stone or color?
    // 9 - End door portal?
    let map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    ];
    this.drawMap(map);

    this.wizardSprite = this.add.sprite(0, OFFSET, 'wizard');
    this.wizardSprite.flipX = true;
    this.wizardSprite.setOrigin(0, 0);
    this.wizardSprite.setDisplaySize(TILESIZE, TILESIZE);

    // position wizard
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == 2) {
          this.wizardSprite!.x = (j * TILESIZE);
          this.wizardSprite!.y = OFFSET + (i * TILESIZE);
          break;
        }
      }
    }


    // Create a graphics object to draw a rectangular box around the wizard sprite
    let graphics = this.make.graphics();

    // set the line style
    graphics.lineStyle(2, 0x00ff00);

    // draw a box around the wizard sprite
    // graphics.strokeRect(
    //   0,
    //   28,
    //   TILESIZE,
    //   TILESIZE
    // );

    // set the line style
    graphics.lineStyle(2, 0x00ff00);
    let columns = 15
    let rows = 8

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        graphics.strokeRect(
          i + (i * TILESIZE),
          OFFSET + j + (j * TILESIZE),
          TILESIZE,
          TILESIZE
        );
      }
    }

    // add the graphics to the scene
    // this.add.existing(graphics);



  }
}
