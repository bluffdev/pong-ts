export type padel = {
  width: number;
  height: number;
  x: number;
  y: number;
  velocity: number;
  acceleration: number;
};

export type ball = {
  width: number;
  height: number;
  x: number;
  y: number;
  velocity: {
    x: number,
    y: number
  }
};
