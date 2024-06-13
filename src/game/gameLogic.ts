import { getGameState } from "../App";
import { MinesweepBoard } from "./minesweepBoard";
import { RenderManager } from "./render/renderManager";
import { I_MinesweeperData } from "./utils";


export class GameLogic {
  renderManager: RenderManager;
  minesweepBoard: MinesweepBoard;

  constructor() {
    this.renderManager = new RenderManager();
    this.minesweepBoard = new MinesweepBoard();
  }

//   private runLogic() {
//     const state:I_MinesweeperData = getGameState()

//     if (state.state == "unset" )
//   }

  getGameLoop() {
    const loop = () => {
    //   this.runGameFrame();
        const inputs = this.renderManager.getActions();
        this.minesweepBoard.update(inputs);

        // do this at the end
        this.renderManager.renderFrame();
      requestAnimationFrame(loop);
    }
    return loop;
  }
}
