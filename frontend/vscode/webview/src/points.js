export default class Points {

    static siz = 3;

    constructor() {
        this.points = [];
    }

    add(p) {
        if (this.isfull()) this.points.unshift();
        this.points.push(p);
    }

    isfull() {
        return this.points.length == Points.siz;
    }
}