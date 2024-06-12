import { MinesweepAction } from "./minesweepRenderer"

export interface Inputs {
    mouseClicks: { x: number, y: number }[];
}

export class FrameInputCollector {
    inputs: Inputs = { mouseClicks: [] };
    // raw inputs go into `tempInputs` and get moved to `inputs`
    // every `update()`
    tempInputs: Inputs = { mouseClicks: [] };

    constructor(canvas: HTMLElement) {
        canvas.addEventListener("click", (event: MouseEvent) => {
            const x = (event.x / canvas.clientWidth) * 2 - 1;
            const y = (event.y / canvas.clientHeight) * 2 - 1;

            this.tempInputs.mouseClicks.push({ x: x, y: y });
        });

        // window.addEventListener("keydown", (e) => {
        //     this.inputs.keys.push(e.key)
        //     console.log("Input collectroor", this.inputs);
        // });
    }

    public poll(): Inputs {
        this.inputs = this.tempInputs;
        this.tempInputs = { mouseClicks: [] };
        return this.inputs;
    }
}
