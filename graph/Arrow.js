class Arrow {
    start = {};
    end = {};
    value = null;

    associates = {
        'color': 'strokeStyle'
    }
    
    /**
     * 
     * @param {*} ctx 
     * @param {object} start {x, y}
     * @param {object} end {x, y}
     * @param {object} options 
     */
    constructor(ctx, start, end, value, options={}) {
        this.ctx = ctx;
        this.start = start;
        this.end = end;
        this.value = value;
        this.options = options;
    }

    draw_self(options={}) {
        let headlen = 10;
        let dx = this.end.x - this.start.x;
        let dy = this.end.y - this.start.y;
        let angle = Math.atan2(dy, dx);

        // this need to be refactor
        let point_radius = 15;
        let cut = {
            start: {
                x: this.start.x + point_radius * Math.cos(angle),
                y: this.start.y + point_radius * Math.sin(angle),
            },
            end: {
                x: this.end.x - point_radius * Math.cos(angle),
                y: this.end.y - point_radius * Math.sin(angle),
            },
        }

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black';

        $.each(options, (option, value) => {
            this.ctx[this.associates[option]] = value;
        });

        this.ctx.moveTo(cut.start.x, cut.start.y);
        this.ctx.lineTo(cut.end.x, cut.end.y);
        this.ctx.lineTo(
            cut.end.x - headlen * Math.cos(angle - Math.PI / 6),
            cut.end.y - headlen * Math.sin(angle - Math.PI / 6)
        );

        this.ctx.moveTo(cut.end.x, cut.end.y);

        this.ctx.lineTo(
            cut.end.x - headlen * Math.cos(angle + Math.PI / 6), 
            cut.end.y - headlen * Math.sin(angle + Math.PI / 6)
        );

        this.ctx.stroke();
        
        this.draw_value();
    }

    draw_value() {
        this.ctx.font = 'italic 20px Arial';
        this.ctx.fillStyle = '#bd8a8a';
        this.ctx.textBaseline = "center";
        this.ctx.textAlign = "center";

        let center_x = (this.start.x + this.end.x) / 2;
        let center_y = (this.start.y + this.end.y) / 2;

        this.ctx.fillText(this.value, center_x, center_y);
    }

}