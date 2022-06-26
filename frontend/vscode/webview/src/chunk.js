export default class Chunk {

    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }

    static size = 100;

    static getchunk(x, y, ctx) {
        //chunk size is 100x100 pixels
        return new Chunk(...([x, y].map(v => v / Chunk.size).map(Math.floor)), ctx);
    }

    static through(x, y, width, ctx) {
        //TODO
        return [
            this.getchunk(x, y, ctx),
            this.getchunk(x + Chunk.size, y, ctx),
            this.getchunk(x, y + Chunk.size, ctx),
            this.getchunk(x + Chunk.size, y + Chunk.size, ctx),
        ];
    }

    clear() {
        this.ctx.clearRect(this.x * Chunk.size, this.y * Chunk.size, Chunk.size, Chunk.size);
    }

    display() {
        this.ctx.rect(this.x * Chunk.size, this.y * Chunk.size, Chunk.size, Chunk.size);
        this.ctx.stroke();
    }

    toString() {
        return `${this.x}.${this.y}`;
    }
}