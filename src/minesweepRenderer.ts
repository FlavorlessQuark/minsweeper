import { BoxGeometry, BufferGeometry, Camera, Float32BufferAttribute, Group, Material, Matrix4, Mesh, MeshBasicMaterial, Object3D, Raycaster, Scene, Texture, TextureLoader, Vector2, Vector3 } from "three";
import { Inputs } from "./input";

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

export interface GeometryWithMaterial {
  geometry: BufferGeometry;
  material: Material;
}

export class MinesweepRenderer {
  group: Group;
  cellGeometries: Map<CellState, GeometryWithMaterial> = new Map();


  constructor(scene: Scene) {
    this.group = new Group();
    this.group.name = "minesweep renderer";
    scene.add(this.group);

    // initialize square geometry
    const vertices = [
      -1, -1, 0,
      1, -1, 0,
      1, 1, 0,
      -1, 1, 0
    ];
    const indices = [
      0, 1, 2, // first triangle
      2, 3, 0 // second triangle
    ];

    const texture = new TextureLoader().load(require("./assets/retroPack.png"));
    const material = new MeshBasicMaterial( { map: texture } );
    const makeGeometryWithMaterial = (x: number, y: number) => {
      const uvs = [
        x/8, y/8,
        x/8 + 1/8, y/8,
        x/8 + 1/8, y/8 + 1/8,
        x/8, y/8 + 1/8,
      ];

      const geometry = new BufferGeometry();
      geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      return {
        geometry: geometry,
        material: material,
      };
    };

    this.cellGeometries.set("empty", makeGeometryWithMaterial(0, 7));
    this.cellGeometries.set(1, makeGeometryWithMaterial(1, 7));
    this.cellGeometries.set(2, makeGeometryWithMaterial(2, 7));
    this.cellGeometries.set(3, makeGeometryWithMaterial(3, 7));
    this.cellGeometries.set(4, makeGeometryWithMaterial(4, 7));
    this.cellGeometries.set(5, makeGeometryWithMaterial(5, 7));
    this.cellGeometries.set(6, makeGeometryWithMaterial(6, 7));
    this.cellGeometries.set(7, makeGeometryWithMaterial(7, 7));
    this.cellGeometries.set(8, makeGeometryWithMaterial(0, 6));
    this.cellGeometries.set("unknown", makeGeometryWithMaterial(1, 6));
    this.cellGeometries.set("flag", makeGeometryWithMaterial(2, 6));
    this.cellGeometries.set("mine", makeGeometryWithMaterial(3, 6));
  }

  private killTheChildren() {
    const childrenToRemove: Object3D[] = [];
    for (const child of this.group.children) {
      childrenToRemove.push(child);
    }
    childrenToRemove.forEach((child) => {
      this.group.remove(child);
    });
  }

  public renderGameState(state: MinesweepRenderState): void {
    this.killTheChildren(); // very important, they are annoying

    const maxDimension = Math.max(state.gridDimensions[0], state.gridDimensions[1]);
    const scaleFactor = 1 / (maxDimension * 1);

    const makeTransformForCell = (xCoordinate: number, yCoordinate: number): Matrix4 => {
      const transform = new Matrix4();
      transform.makeTranslation(new Vector3(
        (-state.gridDimensions[0] / 2 + xCoordinate + 0.5) * scaleFactor * 2,
        (-state.gridDimensions[1] / 2 + yCoordinate + 0.5) * scaleFactor * 2));
      transform.scale(new Vector3(scaleFactor, scaleFactor, 1));
      transform.multiply(new Matrix4().makeTranslation(new Vector3(0, 0, -2)));
      return transform;
    }


    state.gridState.forEach((cellState, index) => {
      const xCoordinate = index % state.gridDimensions[0];
      const yCoordinate = Math.floor(index / state.gridDimensions[0]);

      const transform = makeTransformForCell(xCoordinate, yCoordinate);

      const geometryWithMaterial = this.cellGeometries.get(cellState);
      if (geometryWithMaterial == undefined) {
        console.log("unsupported cellState:", cellState);
        return;
      }

      const mesh = new Mesh(geometryWithMaterial.geometry, geometryWithMaterial.material);
      mesh.applyMatrix4(transform);
      mesh.name = `${xCoordinate}:${yCoordinate}`;
      this.group.add(mesh);
    });
  }

  /**
   * converts raw inputs into MinesweepActions by raycasting the x,y
   * location to a minesweeper cell
   */
  public getMinesweepActions(rawInputs: Inputs, camera: Camera): MinesweepAction[] {
    const minesweepActions: MinesweepAction[] = [];
    for (const mouseClick of rawInputs.mouseClicks) {
      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(mouseClick.x, mouseClick.y), camera);
      const intersects = raycaster.intersectObjects(this.group.children);
      if (intersects.length) {
        const objectName = intersects[0].object.name;
        const [xStr, yStr] = objectName.split(":");
        minesweepActions.push({
          coordinate: [Number(xStr), Number(yStr)],
          type: "leftClick",
        });
      }
    }
    return minesweepActions;
  }
}