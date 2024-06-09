import { Scene } from "three";

export type CellState = "mine" | "flag" | "empty" | "unknown" | number;

export interface MinesweepRenderState {
  gridDimensions: [number, number]; // [x, y]
  // gridState.length == gridDimensions[0] * gridDimensions[1]
  // gridState(x, y) is gridState[x + y * gridDimensions[0]]
  gridState: CellState[]; 
}

export interface MinesweepAction {
  coordinate: [number, number];
  type: "rightClick" | "leftClick";
}

export class MinesweepRenderer {
  constructor(scene: Scene) {
  }

  public renderGameState(state: MinesweepRenderState): void {
  }

  public getLastFrameActions(): MinesweepAction[] {
    return [];
  }
}