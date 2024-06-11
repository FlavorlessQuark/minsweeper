import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { MinesweepRenderer } from "./minesweepRenderer";

class RenderManager {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: OrthographicCamera;
  private minesweepRenderer: MinesweepRenderer;
  
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
    document.body.appendChild(this.renderer.domElement);


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
        gridDimensions: [2, 2],
        gridState: [0, 1, 0, 1],
      });

      const geometry = new BoxGeometry( 1, 1, 1 ); 
      const material = new MeshBasicMaterial( {color: 0x00ff00} ); 
      const cube = new Mesh( geometry, material );
      cube.translateZ(-6);
      this.scene.add(cube);

      // console.log(this.scene);
      this.renderer.render(this.scene, this.camera);

      this.scene.remove(cube);
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