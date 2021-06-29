class Messager {
    iteration = null;
    message = null;
    results_table = null;
    thead = null;
    tbody = null;

    td_lambdas = {};

    constructor($messager_node, matrix=null) {
        this.node = $messager_node;
        this.iteration = $messager_node.find('.iteration');
        this.message = $messager_node.find('.message');
        this.results_table = $messager_node.find('.results-table');

        this.thead = this.results_table.find('thead>tr');
        this.tbody = this.results_table.find('tbody>tr');
    }

    set_iteration(iteration) {
        this.iteration.html(iteration);
    }

    set_message(message) {
        this.message.html(message);
    }

    prepare_results_table(lambdas_arr) {
        let thead_html = '';
        let tbody_html = '';    

        lambdas_arr.forEach((value, index) => {
            thead_html += `<th>${index}</th>`;
            tbody_html += `<td>${value == Infinity ? '∞' : value}</td>`;
        });

        this.thead.html(thead_html);
        this.tbody.html(tbody_html);
    }

    set_results_table(lambdas_arr) {
        lambdas_arr.forEach((value, index) => {
            let td = this.tbody.find(`td:nth-child(${index+1})`);
            td.text(value == Infinity ? '∞' : value);
        });
    }

    prepare_matrix(matrix) {
        if (this.matrix = matrix) {
            this.matrix_table = this.node.find('.matrix-table');
            this.prepare_matrix_table();
        }
    }

    prepare_matrix_table() {
        let m_len = this.matrix.length;

        let thead = this.matrix_table.find('thead>tr');
        thead.append('<th> n </th>');
        
        for (let i=0; i<m_len; i++) {
            thead.append(`<th> ${i} </th>`);
        }

        let tbody = this.matrix_table.find('tbody');
        this.matrix.forEach((row, row_i) => {
            let tr = $('<tr/>');
            
            let tr_html = '';
            tr_html += `<th> ${row_i} </th>`;

            row.forEach(col => {
                tr_html += `<td> ${col == Infinity ? '∞' : col} </td>`;
            });

            tr.html(tr_html);
            tbody.append(tr);
        });
    }

    set_matrix_active(row, col) {
        if (!this.matrix) {
            return; 
        }

        if (this.active_table_point) {
            this.active_table_point.removeClass('table-active');
        }
        
        let tr = this.matrix_table.find(`tbody>tr:nth-child(${row+1})`);
        let td = tr.find(`td:nth-child(${col+2})`);

        td.addClass('table-active');
        this.active_table_point = td;
        
    }

    activate_lambdas_col(col, class_name='lambdas-i') {
        if (this.td_lambdas[class_name]) {
            this.td_lambdas[class_name].removeClass(class_name);
        }

        this.td_lambdas[class_name] = this.tbody.find(`td:nth-child(${col+1})`);
        this.td_lambdas[class_name].addClass(class_name);
        console.log(this.td_lambdas[class_name][0]);
    }
}