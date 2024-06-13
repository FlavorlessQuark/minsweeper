import { getGameState } from "../App";
import { CellState } from "./render/gridScene";

export const randomIntFromInterval = (min:number, max: number) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export type Coord = {x:number, y:number}

export type GameState = "unset" | "win" | "lost" | "set"

export interface I_MinesweeperData {
  _grid: CellState[];
  grid: CellState[];
  w: number;
  h: number;
  mines: number;
  resetBoard: boolean;
  coins: number;
  state: GameState ;// unset
}

export const resetBoard = () => {
        const data:I_MinesweeperData = getGameState();
        data._grid.fill("empty");
        data.grid.fill("unknown");
        data.state = "unset";
        // this.generate(1,1);
    }

