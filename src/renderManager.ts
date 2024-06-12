import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { MinesweepRenderer } from "./minesweepRenderer";
import { FrameInputCollector } from "./input";

class RenderManager {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: OrthographicCamera;
  private minesweepRenderer: MinesweepRenderer;
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
    this.inputCollector = new FrameInputCollector(canvas);
  }

  getRenderLoop() {
    // TODO: for some reason if the loop is just the method
    // `this` ends up being undefined...
    const loop = () => {
      const inputs = this.inputCollector.poll();
      const minesweepActions = this.minesweepRenderer.getMinesweepActions(inputs, this.camera);


      this.minesweepRenderer.renderGameState({
        gridDimensions: [4, 4],
        gridState: [1, 2, 3, 4, 5, 6, 7, 8, "empty", "mine", "flag", "unknown", 1, 2, 3, 4],
      });
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(loop);
    }
    return loop;
  }
}

let renderManagerInstance: RenderManager | undefined;

// initialize singleton render manager
export function getRenderManager(): RenderManager {
  if (renderManagerInstance === undefined) {
    renderManagerInstance = new RenderManager();
  }
  return renderManagerInstance;
}