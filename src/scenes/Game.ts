import Phaser, { GameObjects } from 'phaser';

const OFFSET = 25;
const TILESIZE = 128;

export default class Demo extends Phaser.Scene {

  wizardSprite?: Phaser.GameObjects.Sprite;
  keyPressed: boolean = false;
  keyTimeout?: number = undefined;
  map: number[][] = [];

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('wizard', 'assets/wizard.png');
    this.load.image('tile', 'assets/tile.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('door', 'assets/door.png');
    this.load.image('apple', 'assets/apple.png');
    this.load.image('start', 'assets/start.png');


  }

  update() {
    this.moveWizard();
  }

  isMoveable(x: number, y: number) {
    let i = x / TILESIZE;
    let j = (y - OFFSET) / TILESIZE;
    console.log(this.map[j][i]);
    if ([9, 1, 2].includes(this.map[j][i])) {
      return true;
    }
    return false;
  }

  moveWizard(): void {
    // check if left or right arrow is pressed
    if (this.input.keyboard.addKey("LEFT").isDown && !this.keyPressed) {
      // move the wizard left
      let nextMove = this.wizardSprite!.x - TILESIZE;
      if (nextMove >= 0 && this.isMoveable(nextMove, this.wizardSprite!.y)) {
        this.wizardSprite!.x -= TILESIZE;
      }

      this.keyPressed = true;
    }
    else if (this.input.keyboard.addKey("RIGHT").isDown && !this.keyPressed) {
      // move the wizard right
      console.log('right');
      let nextMove = this.wizardSprite!.x + TILESIZE;
      if (nextMove < this.game.config.width && this.isMoveable(nextMove, this.wizardSprite!.y)) {
        this.wizardSprite!.x += TILESIZE;
      }
      this.keyPressed = true;
    }
    else if (this.input.keyboard.addKey("UP").isDown && !this.keyPressed) {
      // move the wizard up
      let nextMove = this.wizardSprite!.y - TILESIZE;
      if (nextMove >= 0 && this.isMoveable(this.wizardSprite!.x, nextMove)) {
        this.wizardSprite!.y -= TILESIZE;
      }
      this.keyPressed = true;
    }
    else if (this.input.keyboard.addKey("DOWN").isDown && !this.keyPressed) {
      // move the wizard down
      let nextMove = this.wizardSprite!.y + TILESIZE;
      if (nextMove < ((this.game.config.height as number) - TILESIZE) && this.isMoveable(this.wizardSprite!.x, nextMove)) {
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
      clearTimeout(this.keyTimeout);
      this.keyTimeout = undefined;
    }

    if (!this.keyTimeout && this.keyPressed) {
      this.keyTimeout = setTimeout(() => {
        this.keyPressed = false;
        this.keyTimeout = undefined;
      }, 250);
    }
  }

  drawMap(map: number[][]) {
    let arrayLength = map[0].length;
    let arrayHeight = map.length;
    for (let i = 0; i < arrayHeight; i++) {
      for (let j = 0; j < arrayLength; j++) {

        if (map[i][j] == 0) continue;

        if (map[i][j] == 1) {
          // tiles
          let tileSprite = this.add.sprite(j * TILESIZE, OFFSET + i * TILESIZE, 'tile');
          tileSprite.setOrigin(0, 0);
          tileSprite.setDisplaySize(TILESIZE, TILESIZE);
        }

        if (map[i][j] == 2) {
          // start tile
          let startSprite = this.add.sprite(j * TILESIZE, OFFSET + i * TILESIZE, 'start');
          startSprite.setOrigin(0, 0);
          startSprite.setDisplaySize(TILESIZE, TILESIZE);
        }

        // if 9 draw door
        else if (map[i][j] == 9) {
          let doorSprite = this.add.sprite(j * TILESIZE, OFFSET + i * TILESIZE, 'door');
          doorSprite.setOrigin(0, 0);
          doorSprite.setDisplaySize(TILESIZE, TILESIZE);
        }
        // 3 for tree
        else if (map[i][j] == 3) {
          let treeSprite = this.add.sprite(j * TILESIZE, OFFSET + i * TILESIZE, 'tree');
          treeSprite.setOrigin(0, 0);
          treeSprite.setDisplaySize(TILESIZE, TILESIZE);
        }

      }
    }

  }


  create() {

    // Map definition
    // 0 - Unwalkable path
    // 1 - Tiles
    // 2 - Wizard, add some start stone or color?
    // 3 - for tree
    // 9 - End door portal?
    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 1, 3, 3, 3, 3, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0],
      [2, 1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 1, 3, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 3, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 3, 1, 9],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 3],
    ];
    console.log(this.map[2][1]);
    this.drawMap(this.map);

    this.wizardSprite = this.add.sprite(0, OFFSET, 'wizard');
    this.wizardSprite.flipX = true;
    this.wizardSprite.setOrigin(0, 0);
    this.wizardSprite.setDisplaySize(TILESIZE, TILESIZE);

    // position wizard
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] == 2) {
          this.wizardSprite!.x = (j * TILESIZE);
          this.wizardSprite!.y = OFFSET + (i * TILESIZE);
          break;
        }
      }
    }


    this.drawDebug(false);

  }

  drawDebug(enable = true) {
    if (!enable) return;
    // Create a graphics object to draw a rectangular box around the wizard sprite
    let graphics = this.make.graphics({ x: 0, y: 0, add: true });

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

  }
}
