import './style/style.scss';

import Game from './scripts/Game';

window.onload = () => {
  const game = new Game();
  game.startGame();
};
