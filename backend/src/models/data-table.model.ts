export class DataTable {

    left: number = undefined;
    name: string = undefined;
    top: number = undefined;

    constructor(name: string, top: number, left: number) {
        this.name = name;
        this.top = top;
        this.left = left;
    }
}
