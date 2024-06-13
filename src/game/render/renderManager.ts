import {
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { MinesweepAction, GridScene } from "./gridScene";
import { FrameInputCollector } from "../input";

import { getGameState } from "../../App";

export class RenderManager {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: OrthographicCamera;
  private sceneManager: GridScene;
  private inputCollector: FrameInputCollector;

  constructor() {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
      throw "Canvas not inialized";
    }
    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: canvas,
    });
    console.log("renderer", this.renderer);

    this.scene = new Scene();

    // Create a basic perspective camera
    this.camera = new OrthographicCamera();

    // Configure renderer clear color
    this.renderer.setClearColor("#aaddff");

    // Configure renderer size
    this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    this.renderer.setDrawingBufferSize(
      canvas.offsetWidth,
      canvas.offsetHeight,
      2,
    );

    this.sceneManager = new GridScene(this.scene);
    this.inputCollector = new FrameInputCollector(canvas);
  }

  getActions(): MinesweepAction[] {
    const inputs = this.inputCollector.poll();
    const minesweepActions = this.sceneManager.InputsToActions(inputs, this.camera);
    return minesweepActions;
  }

  renderFrame() {
    const gameState = getGameState();
    this.sceneManager.renderGameState({
      gridDimensions: [gameState.w, gameState.h],
      gridState: gameState.grid,
    });
    this.renderer.render(this.scene, this.camera);
  }

}
