import {
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";

class RenderManager {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: OrthographicCamera;
  
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
  }

  getRenderLoop() {
    // TODO: for some reason if the loop is just the method
    // `this` ends up being undefined...
    const loop = () => {
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