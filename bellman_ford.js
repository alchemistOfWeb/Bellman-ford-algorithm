

class BellmanFord {
    // position = [0][0];
    graph = null;
    ctx = null;
    messager = null;

    speed = 100;

    constructor($canvas, $messager, $btn) {
        this.canvas = $canvas;
        this.ctx = $canvas[0].getContext('2d');
        this.messager = new Messager($messager);
        console.log(this.messager.message[0])
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

    /**
     * 
     * @param {array} matrix 
     * @param {number} start 
     * @param {object} points 
     */
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

        // console.info(info_obj.iteration, info_obj.message, info_obj.lambdas);
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

        yield this.make_info_obj('1', 'Ищем все пути с колличеством ребер < 1', lambdas);
        
        // let k = 1;
        // while (k < verticesCount && !stop) {
        //     k++;
        // }
        for (let k = 1; k < verticesCount; k++) {
            // console.info(`Ищем все пути с колличеством ребер < ${k+1}`);
            if (stop) {
                break;
            }
            stop = true;

            let msg = `Ищем все пути с колличеством ребер < ${k+1}\n`;
            yield this.make_info_obj(k+1, msg, lambdas);

            for (let i = 0; i < verticesCount; i++) {
                // console.info(`subiteration ${i+1}`)

                // yield this.make_info_obj(`${k+1}:${i+1}`, `subiteration`, lambdas);

                for (let j = 0; j < verticesCount; j++) {
                    // console.info(`subiteration ${i+1} : ${j+1}`)

                    let msg_2 = '';
                    let msg_3 = '';

                    let sum = lambdas[j] + matrix[j][i];
                    if (sum < Infinity) {

                        msg_2 = `пробуем прибавлять к пройденному пути до точки ${j} соседние ребра\n lambdas[${j}] + matrix[${j}, ${i}] \n ${lambdas[j]} + ${matrix[j][i]} = ${sum}\n`;

                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2, lambdas);

                        msg_3 = `затем сравнимаем ${sum} < ${lambdas[i]} ?\n`;
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3, lambdas);
                        
                    }

                    if (sum < lambdas[i]) {
                        lambdas[i] = sum;
                        stop = false;
                        prev[i-1] = j;  
                        // console.info('prev: ', prev);

                        let filtered_prev = Array.from(new Set(prev));
                        let path = filtered_prev.filter((val, ind) => {
                            if (val === null) return false;
                            else return true;
                        })
                        path.push(i);

                        // determine the edges that will be red
                        this.graph.red_paths = path;
                        
                        // console.info(paths);

                        let msg_4 = `lambdas[i] теперь = ${sum}`;
                        yield this.make_info_obj(`${k} : i=${i} : j=${j}`, msg + msg_2 + msg_3 + msg_4, lambdas);
                    }
                }
            }
            // console.log('кратчайшие пути: ', lambdas);
        }
        
        yield this.make_info_obj('end', 'конец работы алгоритма', lambdas, true);
    }
}
