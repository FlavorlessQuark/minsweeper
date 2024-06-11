import { CellState } from "./minesweepRenderer";
import { Coord, randomIntFromInterval } from "./utils";

export class MinesweepBoard {
    private _grid: CellState[] = [];
    private dirs: Coord[] = [];

    public w: number;
    public h: number;
    public mines: number;
    public grid: CellState[] = [];

    constructor(w:number, h:number, mines:number){
        this.w = w;
        this.h = h;
        this.mines = mines;
        this._grid = new Array<number>(w * h);
        this._grid.fill("empty");

        this.grid = new Array<number>(w * h);
        this.grid.fill("unknown");
        this.dirs = [
            {x:+1, y: 0},//right
            {x:-1, y: 0},//left
            {x:+0, y: +1},//up
            {x:+0, y: -1},//down
            {x:+1, y: +1},//Up right
            {x:-1, y: +1},//Up left
            {x:+1, y: -1},//Down right
            {x:-1, y: -1},//Down Left
        ]
        console.log("New booard w:%d h:%d mines: %d", w, h, mines)
    }

    private isInBounds = (x:number, y:number) => {
        return (
            x >= 0      &&
            x < this.w  &&
            y >= 0      &&
            y < this.h
        )
    }

    private coordToAbsCoord = (x:number, y:number) =>
    {
        return y * this.w + x;
    }

    private coordFromAbsCoord = (coord : number) =>
    {
        return {x: coord % this.w, y : Math.floor(coord / this.w)}
    }


    public generate = (x: number, y: number) =>
    {
        // let i = 0;

        // for (let _y = 0; _y < this.h; _y++)
        //     for (let _x = 0; _x < this.w; _x++)
        //     {
        //         let c = this.coordFromAbsCoord(i);
        //         let abs = this.coordToAbsCoord(_x, _y)
        //         console.log("At : %d,%d   %d", _x, _y, i)

        //         console.log("assert abs => %d == %d %s",abs, i, String(abs == i))
        //         console.log("assert x   => %d == %d %s",_x, c.x, String(c.x == _x))
        //         console.log("assert y   => %d == %d %s",_y, c.y, String(c.y == _y))
        //         console.log("------------------------------------")
        //         i++;
            // }
        console.log("Generate....")
        let mine_coords: number[] = [];
        let abs_coord = this.coordToAbsCoord(x, y);

        this.grid[abs_coord] = "empty";
        this._grid[abs_coord] = "empty";

        for (let i = 0; i < this.mines; i++)
        {
            let rand = randomIntFromInterval(1, this.w * this.h);
            while (rand == abs_coord)
                rand = randomIntFromInterval(1, this.w * this.h);
            this._grid[rand] = "mine";
            mine_coords.push(rand);
        }

        for (let coord of mine_coords)
        {
            let c = this.coordFromAbsCoord(coord);
            console.log("Mine coords %d %d,%d",coord, c.x, c.y)
            for (let dir of this.dirs)
            {
                let {x, y} = this.coordFromAbsCoord(coord);
                let absCoord = this.coordToAbsCoord(x + dir.x, y + dir.y);

                console.log("testing coords %d, %d in bounds %s", x + dir.x, y + dir.y,
                 this.isInBounds(x + dir.x, y + dir.y))
                if (this.isInBounds(x + dir.x, y + dir.y)){
                    if (this._grid[absCoord] == "empty")
                    {
                            this._grid[absCoord] = 1;
                        console.log("PLacing 1 at %d,%d %d", x + dir.x, y + dir.y, absCoord)
                    }
                    else if (typeof this._grid[absCoord] == "number")
                        (this._grid[absCoord] as number) += 1;
                    else
                        console.log("Couldnt place mine sadge %s", this._grid[absCoord].toString())
                }
            }
        }
        this.reveal(x, y);
    }


    public reveal = (x: number, y:number) => {
        let position = y * this.w + x;
        let cell_lst = [position]

        this.grid[position] = this._grid[position];


        this._print();
        if (this._grid[position] != "empty")
            return ;
        for (let coord of cell_lst)
        {
            for (let dir of this.dirs)
            {
                let {x, y} = this.coordFromAbsCoord(coord);
                let absCoord = this.coordToAbsCoord(x + dir.x, y + dir.y);

                if (absCoord >= 0 && absCoord < this.w * this.h)
                    if (this._grid[absCoord] == "empty" && this.grid[absCoord] == "unknown") {
                        this.grid[absCoord] = "empty"
                        cell_lst.push(absCoord);
                    }
                    else if (typeof this._grid[absCoord] == "number")
                        this.grid[absCoord] = this._grid[absCoord];
            }
        }
        this._print();
    }

    public _print = () => {
        let intern_str = "Intern grid : \n";
        let extern_str = "Visible grid : \n";

        console.log("...printing...")

        for (let i = 0; i < this._grid.length; i++) {
            if (i % this.w == 0) {
                intern_str += "\n";
                extern_str += "\n";
            }
            intern_str += this._grid[i].toString() + "\t";
            extern_str += this.grid[i].toString() + "\t";
        }
        console.log(intern_str)
        console.log(extern_str)
    }
}
