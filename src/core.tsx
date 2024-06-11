import { CellState } from "./minesweepRenderer";
import { randomIntFromInterval } from "./utils";

export class MinesweepBoard {
    w: number;
    h: number;
    mines: number;
    _grid: CellState[] = [];
    grid: CellState[] = [];
    dirs: number[] = [];

    constructor(w:number, h:number, mines:number){
        this.w = w;
        this.h = h;
        this.mines = mines;
        this._grid = new Array<number>(w * h);
        this._grid.fill("empty");

        this.grid = new Array<number>(w * h);
        this.grid.fill("unknown");
        this.dirs = [
            +1,//right
            -1,//left
            +this.h,//up
            -this.h,//down
            +this.h + 1,//Up right
            +this.h - 1,//Up left
            -this.h + 1,//Down right
            -this.h - 1,//Down Left
        ]
    }

    public generate = (x: number, y: number) =>
    {
        let mine_coords: number[] = [];


        this.grid[y * this.w + x] = "empty";

        for (let i = 0; i < this.mines; i++)
        {
            let rand = randomIntFromInterval(0, this.w * this.h);
            this._grid[rand] = "mine";
            mine_coords.push(rand);
        }
        for (let coord of mine_coords)
        {
            for (let dir of this.dirs)
            {
                if (coord + dir >= 0 && coord + dir < this.w * this.h){
                    if (this._grid[coord + dir] == "empty")
                        this._grid[coord + dir] = 1;
                    else if (typeof this._grid[coord + dir] == "number")
                        (this._grid[coord + dir] as number) += 1;
                }
            }
        }
        this.reveal(x, y);
    }


    public reveal = (x: number, y:number) => {
        let position = y * this.w + x;
        let cell_lst = [position]

        this.grid[position] = this._grid[position];

        if (this._grid[position] != "empty")
            return ;
        for (let coord of cell_lst)
        {
            for (let dir of this.dirs)
            {
                if (coord + dir >= 0 && coord + dir < this.w * this.h)
                    if (this._grid[coord + dir] == "empty") {
                        this.grid[coord + dir] = "empty"
                        cell_lst.push(coord + dir);
                    }
                    else if (typeof this._grid[coord + dir] == "number")
                        this.grid[coord + dir] = this._grid[coord + dir];
            }
        }
    }
}
