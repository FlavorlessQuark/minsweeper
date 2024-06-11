import { MinesweepAction } from "./minesweepRenderer"

export interface I_Input {
    actions: MinesweepAction[],
    keys : string[]
}

export class InputCollector {
    inputs: I_Input;

    constructor () {
        this.inputs = {
            actions: [],
            keys: []
        };

        window.addEventListener("click", (e) => {
            let action: MinesweepAction = {
                coordinate: [e.x, e.y],
                type: e.button == 0 ? "rightClick" : "leftClick"
            }
            this.inputs.actions.push(action)
            console.log("Input collectroor", this.inputs);
        })

        window.addEventListener("keydown", (e) => {
            this.inputs.keys.push(e.key)
            console.log("Input collectroor", this.inputs);
        })
    }


}
