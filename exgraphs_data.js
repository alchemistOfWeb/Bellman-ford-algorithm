graph_examples = {
    // first graph
    'bf-1': {
        matrix: [
            [0,        3,        Infinity, Infinity, Infinity, Infinity, Infinity],
            [Infinity, 0,        1,        Infinity, Infinity, Infinity, Infinity],
            [Infinity, Infinity, 0,        2,        Infinity, Infinity, Infinity],
            [Infinity, Infinity, Infinity, 0,        9,        5,       Infinity],
            [Infinity, Infinity, Infinity, Infinity, 0,        1,        Infinity],
            [Infinity, Infinity, Infinity, Infinity, Infinity, 0,        5       ],
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0       ],
        ],
        // Yes, you should write points of graph by yourself
        points: [
            new Point(40, 40, 0), 
            new Point(110, 60, 1),  
            new Point(60, 110, 2),  
            new Point(130, 120, 3),  
            new Point(130, 180, 4),  
            new Point(200, 200, 5), 
            new Point(260, 240, 6), 
        ],
    },
    // second graph
    'bf-2': {
        matrix: [
            [0,        5,        7,        Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],// 0
            [Infinity, 0,        2,        3,        Infinity, Infinity, Infinity, Infinity, Infinity],// 1
            [Infinity, Infinity, 0,        2,        Infinity, Infinity, Infinity, Infinity, Infinity],// 2
            [Infinity, Infinity, Infinity, 0,        5,        10,       Infinity, Infinity, Infinity],// 3
            [Infinity, Infinity, Infinity, Infinity, 0,        1,        Infinity, Infinity, Infinity],// 4
            [Infinity, Infinity, Infinity, Infinity, Infinity, 0,        5,        Infinity, Infinity],// 5
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0,        2,        1       ],// 6
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0,        4       ],// 7
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0       ],// 8
        ],
        points: [
            new Point(40, 40, 0),   
            new Point(40, 110, 1),   
            new Point(110, 40, 2),   
            new Point(130, 110, 3),  
            new Point(190, 60, 4),  
            new Point(260, 110, 5), 
            new Point(330, 100, 6), 
            new Point(310, 190, 7), 
            new Point(400, 210, 8), 
        ],
    },
};
