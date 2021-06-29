

class BellmanFord {
    // position = [0][0];
    graph = null;
    ctx = null;
    messager = null;

    speed = 200;

    constructor($canvas, $messager, $btn) {
        this.canvas = $canvas;
        this.ctx = $canvas[0].getContext('2d');
        this.messager = new Messager($messager);
        this.btn = $btn;

        this.ctx.lineWidth = 2;

        this.ctx.fillStyle = '#f8f6ed';
        this.ctx.fillRect(0, 0, this.canvas.attr('width'), this.canvas.attr('height'));
    }

    prepare_graph(matrix, start=0, points=null) {
        
        this.graph = new Graph(this.ctx, matrix, start, points);
        this.graph.draw_self();

        this.messager.prepare_matrix(matrix);

        this.btn.click(this.start.bind(this))

    }

    start() {
        console.info('start');

        this.algo_generator = this.get_algo_generator(this.graph.matrix, this.graph.start);

        setTimeout(this.step.bind(this), this.speed); // main cycle
        
    }

    step() {
        let step = this.algo_generator.next();
        if (step.done) {
            return;
        }
        let info_obj = step.value;

        this.update(info_obj);
        setTimeout(this.step.bind(this), this.speed);
    }

    update(info_obj) {
        this.ctx.fillStyle = '#f8f6ed';
        this.ctx.fillRect(0, 0, this.canvas.attr('width'), this.canvas.attr('height'));
        this.graph.draw_self();

        this.messager.set_iteration(info_obj.iteration);
        this.messager.set_message(info_obj.message);
        this.messager.set_results_table(info_obj.lambdas);


    }

    make_info_obj(iteration, message, lambdas, is_end=false) {
        return {
            iteration,
            message,
            lambdas,
            is_end,
        };
    }

    * get_algo_generator(matrix, start) {
        let verticesCount = matrix.length;

        
        let lambdas = [];
        let prev = [];
        
        for (let i = 0; i < verticesCount; i++) {
            lambdas.push(Infinity);
            prev.push(null);
        }

        
        
        lambdas[start] = 0;
        let stop = false;

        let msg 
                = '';

        // generate visualisation {
        // it is not a part of the algorithm   
        this.messager.prepare_results_table(lambdas);
        yield this.make_info_obj('1', msg, lambdas);
        // }

        for (let k = 1; k < verticesCount; k++) {

            // if there was no relaxation of an edge (in the previous iteration) then we break the cycle
            
            stop = true;
            
            // generate visualisation {
            // it is not a part of the algorithm
            yield this.make_info_obj(k+1, msg, lambdas);
            // }

            for (let i = 0; i < verticesCount; i++) {

                for (let j = 0; j < verticesCount; j++) {

                    let sum = lambdas[j] + matrix[j][i];
                    
                    // generate visualisation {
                    // it is not a part of the algorithm
                    
                    this.messager.set_matrix_active(j, i);

                    this.messager.activate_lambdas_col(i, 'lambdas-i');
                    this.messager.activate_lambdas_col(j, 'lambdas-j');

                    let msg_2 = `пробуем прибавлять к пройденному пути до точки ${j} соседние ребра<br>
                            <span class="text-dark">lambdas[j]</span> + 
                            <span class="text-warning">matrix[j, i]</span> <br> 
                            <span class="text-dark">${lambdas[j]}</span> + 
                            <span class="text-warning">${matrix[j][i]}</span> = ${sum}<br>`;

                    let msg_3 = `затем сравнимаем ${sum} < 
                            <span class="text-danger">${lambdas[i] == Infinity ? '∞' : lambdas[i]} ?</span><br>`;
                 

                    yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2, lambdas);
                    yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        
                    if (sum < Infinity) {

                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2, lambdas);
                       
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);

                    }

                    // }

                    if (sum < lambdas[i]) {
                        lambdas[i] = sum;
                        stop = false;
                        prev[i-1] = j;

                        // generate visualisation {
                        // it is not a part of the algorithm

                        let filtered_prev = Array.from(new Set(prev));
                        let path = filtered_prev.filter((val, ind) => {
                            if (val === null) return false;
                            else return true;
                        })
                        path.push(i);

                        // determine the edges that will be red
                        this.graph.red_paths = path;

                        let msg_4 = `<span class="text-danger">lambdas[i] теперь = ${sum}</span>`;
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3 + msg_4, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3 + msg_4, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3 + msg_4, lambdas);

                        // }
                    }
                }
            }

            if (stop) {
                break;
            }
        }
        
        yield this.make_info_obj('end', 'конец работы алгоритма', lambdas, true);
    }
}
