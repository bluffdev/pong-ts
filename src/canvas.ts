import { ball, padel } from "./types";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = width;
    this.height = height;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(padelOne: padel, padelTwo: padel, ball: ball) {
    this.context.fillStyle = "green";
    this.context.fillRect(
      padelOne.x,
      padelOne.y,
      padelOne.width,
      padelOne.height
    );
    this.context.fillRect(
      padelTwo.x,
      padelTwo.y,
      padelTwo.width,
      padelTwo.height
    );

    this.context.fillStyle = "red";
    this.context.fillRect(ball.x, ball.y, ball.width, ball.height);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}
