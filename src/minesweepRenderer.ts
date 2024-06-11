import { BufferGeometry, Float32BufferAttribute, Group, Matrix4, Mesh, MeshBasicMaterial, Scene, Vector3 } from "three";

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
  group: Group;
  geometry: BufferGeometry;
  material: MeshBasicMaterial;

  constructor(scene: Scene) {
    this.group = new Group();
    this.group.name = "minesweep renderer";
    scene.add(this.group);

    // initialize square geometry
    this.geometry = new BufferGeometry();
    const vertices = [
      -1, -1, 0,
      1, -1, 0,
      1, 1, 0,
      -1, 1, 0
    ];
    // temp debugging so can distinguish cells
    vertices.forEach((_, index) => {
      vertices[index] *= 0.9;
    })
    console.log("vertices", vertices);
    const indices = [
      0, 1, 2, // first triangle
      2, 3, 0 // second triangle
    ];
    this.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    this.geometry.setIndex(indices);
    this.material = new MeshBasicMaterial( {color: 0x0000ff} );
    console.log("geometry:", this.geometry);
  }

  private killTheChildren() {
    for (const child of this.group.children) {
      this.group.remove(child);
    }
  }

  public renderGameState(state: MinesweepRenderState): void {
    this.killTheChildren(); // very important, they are annoying

    const maxDimension = Math.max(state.gridDimensions[0], state.gridDimensions[1]);
    const scaleFactor = 1 / (maxDimension * 1);

    const makeTransformForCell = (xCoordinate: number, yCoordinate: number): Matrix4 => {
      const transform = new Matrix4();
      // transform.makeTranslation(new Vector3(-state.gridDimensions[0] / 2, -state.gridDimensions[1] / 2));
      transform.scale(new Vector3(scaleFactor, scaleFactor, 1));
      transform.multiply(new Matrix4().makeTranslation(new Vector3(0, 0, -2)));
      return transform;
    }


    state.gridState.forEach((cellState, index) => {
      const xCoordinate = index % state.gridDimensions[0];
      const yCoordinate = Math.floor(index / state.gridDimensions[0]);
      // console.log(xCoordinate, yCoordinate);

      const transform = makeTransformForCell(xCoordinate, yCoordinate);
      const material = new MeshBasicMaterial( {color: 0x00ffff * xCoordinate} );
      const mesh = new Mesh(this.geometry, material);
      mesh.applyMatrix4(transform);
      this.group.add(mesh);
    });
  }

  public getLastFrameActions(): MinesweepAction[] {
    return [];
  }
}