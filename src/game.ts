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
  private running: boolean = true;

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

    document.addEventListener("keydown", (e: KeyboardEvent) =>
      this.handleKeyDown(e)
    );
    document.addEventListener("keyup", (e: KeyboardEvent) =>
      this.handleKeyUp(e)
    );
  }

  run() {
    this.simulateGame();
  }

  private simulateGame() {
    if (this.movePaddleOne === true) {
      this.padelOne.y += this.paddleOneDirection * 5;
    }

    if (this.movePaddleTwo === true) {
      this.padelTwo.y += this.paddleTwoDirection * 5;
    }

    this.canvas.clear();
    this.canvas.draw(this.padelOne, this.padelTwo, this.ball);

    requestAnimationFrame(() => this.simulateGame());
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown")
      this.movePaddleOne = false;
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
