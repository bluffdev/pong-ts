import Canvas from "./canvas";
import { padel, ball } from "./types";

export default class Game {
  private canvas: Canvas;
  private padelOne: padel;
  private padelTwo: padel;
  private ball: ball;
  private movePaddleOne: boolean = false;
  private paddleOneDirection: number = 1;
  private movePaddleTwo: boolean = false;
  private paddleTwoDirection: number = 1;

  constructor(gameWidth: number, gameHeight: number) {
    this.canvas = new Canvas(gameWidth, gameHeight);
    this.padelOne = {
      width: gameWidth / 50,
      height: gameHeight / 5,
      x: 0,
      y: (gameHeight - gameHeight / 5) / 2,
    };
    this.padelTwo = {
      width: gameWidth / 50,
      height: gameHeight / 5,
      x: gameWidth - gameWidth / 50,
      y: (gameHeight - gameHeight / 5) / 2,
    };
    this.ball = {
      width: gameWidth / 50,
      height: gameWidth / 50,
      x: (gameWidth - gameWidth / 50) / 2,
      y: (gameHeight - gameWidth / 50) / 2,
    };

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  run() {
    // let running = true;
    // while (running) {
    // timer
    // game logic
    // render
    // }
    this.canvas.draw(this.padelOne, this.padelTwo, this.ball);
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowUp") this.movePaddleOne = false;
    if (e.code === "KeyW" || e.code === "KeyS") this.movePaddleTwo = false;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      this.movePaddleOne = true;
      this.paddleOneDirection = e.code === "ArrowUp" ? -1 : 1;
    }
    if (e.code === "KeyW" || e.code === "KeyS") {
      this.movePaddleTwo = true;
      this.paddleTwoDirection = e.code === "KeyW" ? -1 : 1;
    }
  }
}
