import { Console } from "console";
import { MinesweepAction } from "./render/gridScene"

export interface Inputs {
    mouseClicks: { x: number, y: number , button: number }[];
}

export class FrameInputCollector {
    inputs: Inputs = { mouseClicks: [] };
    // raw inputs go into `tempInputs` and get moved to `inputs`
    // every `update()`
    tempInputs: Inputs = { mouseClicks: [] };

    constructor(canvas: HTMLElement) {
        canvas.addEventListener("mouseup", (event: MouseEvent) => {
             const rect = canvas.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

            console.log("BUTTON %d", event.button)
            this.tempInputs.mouseClicks.push({ x: x, y: y , button: event.button});
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
