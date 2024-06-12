import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { MinesweepRenderer } from "./minesweepRenderer";

import { MinesweepBoard } from "./core";
import { I_MinesweeperData } from "./utils";

export class RenderManager {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: OrthographicCamera;
  private minesweepRenderer: MinesweepRenderer;
  private data: I_MinesweeperData;

  constructor(data : I_MinesweeperData
) {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
      throw "Canvas not inialized";
    }
    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: canvas,
    });
    console.log("renderer", this.renderer);

    this.data = data;
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

    this.minesweepRenderer = new MinesweepRenderer(this.scene);
  }

  getRenderLoop() {
    // TODO: for some reason if the loop is just the method
    // `this` ends up being undefined...
    const loop = () => {
      this.minesweepRenderer.renderGameState({
        gridDimensions: [this.data.w, this.data.h],
        gridState: this.data.grid,
      });

      this.renderer.render(this.scene, this.camera);

      // this.scene.remove(cube);
      requestAnimationFrame(loop);
    }
    return loop;
  }
}

// let renderManagerInstance: RenderManager | undefined;

// initialize singleton render manager
// export function getRenderManager(): RenderManager {
//   if (renderManagerInstance === undefined) {
//     renderManagerInstance = new RenderManager();
//   }
//   return renderManagerInstance;
// }
