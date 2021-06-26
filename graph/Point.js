class Point {
    
    positions = {}

    radius = 15;

    index = null;

    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} index 
     */
    constructor(x, y, index) {
        // this.ctx = ctx;

        this.positions.x = x;
        this.positions.y = y;

        this.index = index;
    }

    draw_self(ctx) {
        console.log(`draw point on x: ${this.x}, y: ${this.y}`)

        ctx.beginPath()
        ctx.fillStyle = '#70d78f';

        ctx.arc(this.positions.x, this.positions.y, this.radius, 0, Math.PI*2)
        ctx.fill()

        this.draw_index(ctx);
    }

    draw_index(ctx) {
        ctx.fillStyle = '#3f3636';
        ctx.font = 'italic 20px Arial';
        ctx.textBaseline = "center";
        ctx.textAlign = "center";
        ctx.fillText(this.index, this.positions.x, this.positions.y+5);
    }

}