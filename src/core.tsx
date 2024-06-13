import { CellState } from "./minesweepRenderer";
import { Coord, I_MinesweeperData, randomIntFromInterval } from "./utils";

export class MinesweepBoard {
    private dirs: Coord[] =  [
            {x:+1, y: 0},//right
            {x:-1, y: 0},//left
            {x:+0, y: +1},//up
            {x:+0, y: -1},//down
            {x:+1, y: +1},//Up right
            {x:-1, y: +1},//Up left
            {x:+1, y: -1},//Down right
            {x:-1, y: -1},//Down Left
        ];
    public data: I_MinesweeperData;

    constructor(data: I_MinesweeperData){
        this.data = data;

    }

    private isInBounds = (x:number, y:number) => {
        return (
            x >= 0      &&
            x < this.data.w  &&
            y >= 0      &&
            y < this.data.h
        )
    }

    private coordToAbsCoord = (x:number, y:number) =>
    {
        return y * this.data.w + x;

    }

    private coordFromAbsCoord = (coord : number) =>
    {
        return {x: coord % this.data.w, y : Math.floor(coord / this.data.w)}
    }

    public reset = () => {
        this.data._grid.fill("empty");
        this.data.grid.fill("unknown");
        // this.generate(1,1);
    }

    public newBoard = (w: number, h: number, mines: number) => {
        this.data.w = w;
        this.data.h = h;
        this.data.mines = mines;

        this.data._grid = new Array<CellState>(w * h);
        this.data.grid = new Array<CellState>(w * h);

        this.data._grid.fill("empty");
        this.data.grid.fill("unknown");
    }


    public generate = (x: number, y: number) =>
    {
        // let i = 0;

        // for (let _y = 0; _y < this.data.h; _y++)
        //     for (let _x = 0; _x < this.data.w; _x++)
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

        this.data.grid[abs_coord] = "empty";
        this.data._grid[abs_coord] = "empty";

        for (let i = 0; i < this.data.mines; i++)
        {
            let rand = randomIntFromInterval(1, this.data.w * this.data.h - 1);
            while (rand == abs_coord || this.data._grid[rand] == "mine")
                rand = randomIntFromInterval(1, this.data.w * this.data.h - 1);
            this.data._grid[rand] = "mine";
            mine_coords.push(rand);
            console.log("New mine at %f max : %d", rand,  this.data.w * this.data.h - 1)
        }

        for (let coord of mine_coords)
        {
            let c = this.coordFromAbsCoord(coord);
            for (let dir of this.dirs)
            {
                let {x, y} = this.coordFromAbsCoord(coord);
                let absCoord = this.coordToAbsCoord(x + dir.x, y + dir.y);

                if (this.isInBounds(x + dir.x, y + dir.y)){
                    if (this.data._grid[absCoord] == "empty")
                    {
                            this.data._grid[absCoord] = 1;
                    }
                    else if (typeof this.data._grid[absCoord] == "number")
                        (this.data._grid[absCoord] as number) += 1;
                }
            }
        }
        this.reveal(x, y);
    }


    public reveal = (x: number, y:number) => {
        let position = y * this.data.w + x;
        let cell_lst = [position]

        this.data.grid[position] = this.data._grid[position];


        // this._print();
        if (this.data._grid[position] != "empty")
            return ;
        for (let coord of cell_lst)
        {
            for (let dir of this.dirs)
            {
                let {x, y} = this.coordFromAbsCoord(coord);
                let absCoord = this.coordToAbsCoord(x + dir.x, y + dir.y);

                if (absCoord >= 0 && absCoord < this.data.w * this.data.h)
                    if (this.data._grid[absCoord] == "empty" && this.data.grid[absCoord] == "unknown") {
                        this.data.grid[absCoord] = "empty"
                        cell_lst.push(absCoord);
                    }
                    else if (typeof this.data._grid[absCoord] == "number")
                        this.data.grid[absCoord] = this.data._grid[absCoord];
            }
        }
        // this._print();
    }

    public _print = () => {
        let intern_str = "Intern grid : \n";
        let extern_str = "Visible grid : \n";

        console.log("...printing...")

        for (let i = 0; i < this.data._grid.length; i++) {
            if (i % this.data.w == 0) {
                intern_str += "\n";
                extern_str += "\n";
            }
            intern_str += this.data._grid[i].toString() + "\t";
            extern_str += this.data.grid[i].toString() + "\t";
        }
        console.log(intern_str)
        console.log(extern_str)
    }
}
