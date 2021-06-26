(function(){
    // bf_1________________________________________________
    // canvas 
    bf_1_node = $('#bf-1');
    $canvas_1 = bf_1_node.find('.bf-canvas');

    // messager
    $messager_1 = bf_1_node.find('.bf-messager');

    // btn
    $btn_1 = bf_1_node.find('.bf-btn-start');
    
    bf_1 = new BellmanFord($canvas_1, $messager_1, $btn_1);
    exgraph_1 = graph_examples['bf-1'];
    bf_1.prepare_graph(exgraph_1.matrix, 0, exgraph_1.points);
    // bf_1________________________________________________

    // bf_2________________________________________________
    // canvas 
    bf_2_node = $('#bf-2');
    $canvas_2 = bf_2_node.find('.bf-canvas');

    // messager
    $messager_2 = bf_2_node.find('.bf-messager');

    // btn
    $btn_2 = bf_2_node.find('.bf-btn-start');
    
    bf_2 = new BellmanFord($canvas_2, $messager_2, $btn_2);
    exgraph_2 = graph_examples['bf-2'];
    bf_2.prepare_graph(exgraph_2.matrix, 0, exgraph_2.points);
    // bf_2________________________________________________


})();
