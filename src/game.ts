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
  private lastUpdate: number = 0;
  private deltaTime: number = 0;
  // private running: boolean = true;

  constructor(gameWidth: number, gameHeight: number) {
    this.canvas = new Canvas(gameWidth, gameHeight);
    this.padelOne = {
      width: gameWidth / 50,
      height: gameHeight / 5,
      x: 0,
      y: (gameHeight - gameHeight / 5) / 2,
      velocity: 0,
      acceleration: 0,
    };
    this.padelTwo = {
      width: gameWidth / 50,
      height: gameHeight / 5,
      x: gameWidth - gameWidth / 50,
      y: (gameHeight - gameHeight / 5) / 2,
      velocity: 0,
      acceleration: 0,
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
    this.padelOne.acceleration = 0;
    this.padelTwo.acceleration = 0;

    if (this.movePaddleOne) {
      this.padelOne.acceleration += this.paddleOneDirection * 3000;
    }

    if (this.movePaddleTwo) {
      this.padelTwo.acceleration += this.paddleTwoDirection * 3000;
    }

    this.padelOne.acceleration -= this.padelOne.velocity * 5;
    this.padelTwo.acceleration -= this.padelTwo.velocity * 5;

    this.padelOne.y += this.padelOne.velocity * this.deltaTime + this.padelOne.acceleration * this.deltaTime ** 2 * 0.5;
    this.padelTwo.y += this.padelTwo.velocity * this.deltaTime + this.padelTwo.acceleration * this.deltaTime ** 2 * 0.5;

    this.padelOne.velocity += this.padelOne.acceleration * this.deltaTime;
    this.padelTwo.velocity += this.padelTwo.acceleration * this.deltaTime;

    this.canvas.clear();
    this.canvas.draw(this.padelOne, this.padelTwo, this.ball);

    let now = Date.now();
    this.deltaTime = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;

    requestAnimationFrame(() => this.simulateGame());
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown")
      this.movePaddleTwo = false;
    if (e.code === "KeyW" || e.code === "KeyS") this.movePaddleOne = false;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      this.movePaddleTwo = true;
      this.paddleTwoDirection = e.code === "ArrowUp" ? -1 : 1;
    }
    if (e.code === "KeyW" || e.code === "KeyS") {
      this.movePaddleOne = true;
      this.paddleOneDirection = e.code === "KeyW" ? -1 : 1;
    }
  }
}
