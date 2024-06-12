import { CellState } from "./minesweepRenderer";

export const randomIntFromInterval = (min:number, max: number) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export type Coord = {x:number, y:number}



export interface I_MinesweeperData {
    _grid: CellState[],
    grid: CellState[],
    w: number,
    h: number,
    mines: number,
    coins: number
}
