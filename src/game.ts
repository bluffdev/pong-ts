import Canvas from "./canvas";
import { padel, ball } from "./types";

export default class Game {
  private canvas: Canvas;
  private padelOne: padel;
  private padelTwo: padel;
  private ball: ball;
  private playerOneScore: number = 0;
  private playerTwoScore: number = 0;
  private movePaddleOneUp: boolean = false;
  private movePaddleOneDown: boolean = false;
  private movePaddleTwoUp: boolean = false;
  private movePaddleTwoDown: boolean = false;
  private lastUpdate: number = 0;
  private deltaTime: number = 0;
  private isRunning: boolean = false;

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
      velocity: {
        x: 6.5,
        y: 0
      }
    };

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      e.preventDefault(); 
      this.handleKeyDown(e)
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      e.preventDefault();
      this.handleKeyUp(e);
    });

    this.canvas.draw(this.padelOne, this.padelTwo, this.ball, this.playerOneScore, this.playerTwoScore);
  }

  run() {
    this.padelOne.acceleration = 0;
    this.padelTwo.acceleration = 0;

    if (this.movePaddleOneUp) {
      this.padelOne.acceleration -= 3500;
    }

    if (this.movePaddleOneDown) {
      this.padelOne.acceleration += 3500;
    }

    if (this.movePaddleTwoUp) {
      this.padelTwo.acceleration -= 3500;
    }

    if (this.movePaddleTwoDown) {
      this.padelTwo.acceleration += 3500;
    }

    this.padelOne.acceleration -= this.padelOne.velocity * 5;
    this.padelOne.y += this.padelOne.velocity * this.deltaTime + this.padelOne.acceleration * this.deltaTime ** 2 * 0.5;
    this.padelOne.velocity += this.padelOne.acceleration * this.deltaTime;

    if (this.padelOne.y <= 0) {
      this.padelOne.y = 0;
    } else if (this.padelOne.y + this.padelOne.height >= this.canvas.getHeight()) {
      this.padelOne.y = this.canvas.getHeight() - this.padelOne.height;
    }

    this.padelTwo.acceleration -= this.padelTwo.velocity * 5;
    this.padelTwo.y += this.padelTwo.velocity * this.deltaTime + this.padelTwo.acceleration * this.deltaTime ** 2 * 0.5;
    this.padelTwo.velocity += this.padelTwo.acceleration * this.deltaTime;

    if (this.padelTwo.y <= 0) {
      this.padelTwo.y = 0;
    } else if (this.padelTwo.y + this.padelOne.height >= this.canvas.getHeight()) {
      this.padelTwo.y = this.canvas.getHeight() - this.padelTwo.height;
    }

    this.ball.x -= this.ball.velocity.x;
    this.ball.y += this.ball.velocity.y;

    if (this.ball.y < 0) {
      this.ball.y = 0;
      this.ball.velocity.y *= -1;
    }

    if (this.ball.y + this.ball.height > this.canvas.getHeight()) {
      this.ball.y = this.canvas.getHeight() - this.ball.height;
      this.ball.velocity.y *= -1;
    }

    if (
      (this.ball.x <= this.padelOne.x + this.padelOne.width) &&
      (this.ball.y + this.ball.height > this.padelOne.y) && 
      (this.ball.y < this.padelOne.y + this.padelOne.height) &&
      (this.ball.x > 0)
    ) {
      this.ball.x = this.padelOne.x + this.padelOne.width;
      this.ball.velocity.x *= -1;
      this.ball.velocity.y = this.padelOne.velocity * 0.005;
    }

    if (
      (this.ball.x + this.ball.width >= this.padelTwo.x) &&
      (this.ball.y + this.ball.height > this.padelTwo.y) &&
      (this.ball.y < this.padelTwo.y + this.padelTwo.height) &&
      (this.ball.x + this.ball.width < this.canvas.getWidth())
    ) {
      this.ball.x = this.padelTwo.x - this.ball.width;
      this.ball.velocity.x *= -1;
      this.ball.velocity.y = this.padelTwo.velocity * 0.005;
    }

    if (this.ball.x < 0 || this.ball.x + this.ball.width > this.canvas.getWidth()) {
      if (this.ball.x < 0) {
        this.playerTwoScore += 1;
      } else {
        this.playerOneScore += 1;
      }

      this.ball.x = (this.canvas.getWidth() - this.canvas.getWidth() / 50) / 2;
      this.ball.y = (this.canvas.getHeight() - this.canvas.getWidth() / 50) / 2;

      let horizontal = Math.random();

      this.ball.velocity.x = horizontal >= 0.5 ? 5 : -5;
      this.ball.velocity.y = 0;
    }

    this.canvas.clear();
    this.canvas.draw(this.padelOne, this.padelTwo, this.ball, this.playerOneScore, this.playerTwoScore);  

    let now = Date.now();
    this.deltaTime = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;

    if (this.isRunning) {
      requestAnimationFrame(() => this.run());
    }
  }

  reset() {
    this.padelOne.y = (this.canvas.getHeight()- this.canvas.getHeight() / 5) / 2;
    this.padelOne.velocity = 0,
    this.padelOne.acceleration = 0;

    this.padelTwo.y = (this.canvas.getHeight() - this.canvas.getHeight() / 5) / 2;
    this.padelTwo.velocity = 0,
    this.padelTwo.acceleration = 0;

    this.ball.x = (this.canvas.getWidth() - this.canvas.getWidth() / 50) / 2;
    this.ball.y = (this.canvas.getHeight() - this.canvas.getWidth() / 50) / 2;
    this.ball.velocity.x = 5;
    this.ball.velocity.y = 0;

    this.playerOneScore = 0;
    this.playerTwoScore = 0;

    this.canvas.draw(this.padelOne, this.padelTwo, this.ball, this.playerOneScore, this.playerTwoScore);
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.code === "ArrowUp") this.movePaddleTwoUp = false;
    if (e.code === "ArraowDown" || e.key === "ArrowDown") this.movePaddleTwoDown = false;
    if (e.code === "KeyW" || e.key === "KeyW") this.movePaddleOneUp = false;
    if (e.key === "KeyS" || e.code === "KeyS") this.movePaddleOneDown = false;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.code === "ArrowUp") this.movePaddleTwoUp = true;
    if (e.key === "ArrowDown" || e.code === "ArrowDown") this.movePaddleTwoDown = true;
    if (e.key === "KeyW" || e.code === "KeyW") this.movePaddleOneUp = true;
    if (e.key === "KeyS" || e.code === "KeyS") this.movePaddleOneDown = true;
  }

  setIsRunning(val: boolean) {
    this.isRunning = val;
  }
}
