import Game from "./game";

(function start() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const sizeFactor = (screenWidth + screenHeight) / 15;
  const widthScalor = 5;
  const heightScalor = 3;

  const game = new Game(sizeFactor * widthScalor, sizeFactor * heightScalor);
  game.run();
})();
