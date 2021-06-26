/* 
requires 
    Arrow.js (class Arrow)
    Point.js (class Point)

*/

class Graph {
    matrix = [];

    paths = [];
    points = [];

    pointer = 0;
    start = 0;

    red_paths = [];

    constructor(ctx, matrix, start=0, points=null) {
        this.matrix = matrix;
        this.points = points;
        this.ctx = ctx;

        this.matrix.forEach((row, row_i) => {
            start = this.points[row_i].positions;

            this.paths[row_i] = [];
            row.forEach((el, el_i) => {
                if (el < Infinity && el_i != row_i) {
                    let end = this.points[el_i].positions;

                    this.paths[row_i][el_i] = new Arrow(ctx, start, end, el);
                }
            })
            
        });
    }

    move_pointer_to(point_number) {
        this.pointer = point_number;
    }

    draw_self() {
        this.draw_points();
        this.draw_paths();

    }

    draw_points() {
        this.points.forEach(point => {
            point.draw_self(this.ctx);
        });
    }

    draw_paths() {
        this.paths.forEach((arrows, arrows_from) => {
            arrows.forEach((arrow, arrow_to) => {
                let red_paths_str = this.red_paths.join('');
                let from_to_str = String(arrows_from) + String(arrow_to); 
                
                let options = {};

                if (red_paths_str.includes(from_to_str)) {
                    options.color = 'red';
                    console.log(red_paths_str, from_to_str);
                }
                
                arrow.draw_self(options);
            });
        });
    }

    
    
}