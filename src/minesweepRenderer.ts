import { Scene } from "three";

export interface MinesweepRenderState {
  
}

export interface MinesweepAction {
  coordinate: [number, number];
  type: "rightClick" | "leftClick";
}

export class MinesweepRenderer {
  constructor(scene: Scene) {
  }

  public updateGridSize(x: number, y: number) {
  }

  public renderGameState(state: MinesweepRenderState): void {
  }

  public getLastFrameActions(): MinesweepAction[] {
    return [];
  }
}