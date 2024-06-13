import { MinesweepBoard } from "./minesweepBoard";
import { RenderManager } from "./renderManager";


export class GameLogic {
  renderManager: RenderManager;
  minesweepBoard: MinesweepBoard;

  constructor() {
    this.renderManager = new RenderManager();
    this.minesweepBoard = new MinesweepBoard();
  }

  private runGameFrame() {
    const inputs = this.renderManager.getInputs();
    this.minesweepBoard.update(inputs);

    // do this at the end
    this.renderManager.renderFrame();
  }
  
  getGameLoop() {
    const loop = () => {
      this.runGameFrame();
      requestAnimationFrame(loop);
    }
    return loop;
  }
}