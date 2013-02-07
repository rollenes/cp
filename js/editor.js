jsPlumb.ready(function(){
    var e0 = jsPlumb.addEndpoint("container0"),
        e1 = jsPlumb.addEndpoint("container1", {anchor: "TopCenter"}),
        e2 = jsPlumb.addEndpoint("container2", {anchor: "TopCenter"}),
        e3 = jsPlumb.addEndpoint("container3", {anchor: "TopCenter"}),
        e4 = jsPlumb.addEndpoint("container0"),
        e5 = jsPlumb.addEndpoint("container0");
        
    jsPlumb.draggable("container0"),
    jsPlumb.draggable("container3"),
    jsPlumb.draggable("container1"),

    connection0 = jsPlumb.connect({ source:e0, target:e1, connector: [ 'Flowchart' ] });
    connection1 = jsPlumb.connect({ source:e4, target:e2, connector: [ 'Flowchart' ] });
    connection2 = jsPlumb.connect({ source:e5, target:e3, connector: [ 'Flowchart' ] });

    $(window).resize(function() {
        e0.repaint();
        e1.repaint();
        e2.repaint();
        e3.repaint();
        e4.repaint();
        e5.repaint();
        connection0.repaint();
        connection1.repaint();
        connection2.repaint();
    });

});