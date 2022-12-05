import Game from "./game";

(function start() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const sizeFactor = (screenWidth + screenHeight) / 15;
  const widthScalor = 5;
  const heightScalor = 3;

  const game = new Game(sizeFactor * widthScalor, sizeFactor * heightScalor);

  const startButton = document.getElementById('start') as HTMLButtonElement;
  const resetButton = document.getElementById('reset') as HTMLButtonElement;

  let isRunning = false;

  startButton.addEventListener('click', (e: Event) => {
    e.preventDefault();
    if (!isRunning) {
      game.setIsRunning(true);
      game.run();
      isRunning = true;
    }
  });

  resetButton.addEventListener('click', (e: Event) => {
    e.preventDefault();
    if (isRunning) {
      game.setIsRunning(false);
      game.reset();
      isRunning = false;
    }
  })
})();
