document.onselectstart = function () { return false; };

$.fn.extend({
   
    diagram_editor: function( options ) {
        
        this.options = {
            workspace: $(this),
            elements_area: $('#diagram_elements_area'),
            diagram_area: $('#editor_area'),
            element_class: 'diagram_element'
        };
        
        var self = this;
        
        $.extend( this.options, options );
            
        var draggable_elements = $( '.' + this.options.element_class, this.options.elements_area );
        
        draggable_elements.draggable({
            helper: 'clone',
            revert: 'invalid',
        } );

        on_diagram_drop = function(event, ui) {
                
                offset = $(this).offset();
                
                new_element = ui.draggable.clone().insertAfter($(this)).offset({
                    top: offset.top + 2 * $(this).height()
                });
                
                start = jsPlumb.addEndpoint( $(this) );
                
                end = jsPlumb.addEndpoint( new_element, {anchor: "TopCenter"} );
                
                connection = jsPlumb.connect( { source: start, target: new_element, connector: [ 'Flowchart' ], anchor: "TopCenter" } );
                
                new_element.droppable({
                   drop: on_diagram_drop 
                });
        };
        
        $('.diagram_element.start').droppable({
            drop: on_diagram_drop
        });
    }
    
});



jsPlumb.ready(function(){
    var e0 = jsPlumb.addEndpoint("container0"),
        e1 = jsPlumb.addEndpoint("container1", {anchor: "TopCenter"}),
        e2 = jsPlumb.addEndpoint("container2", {anchor: "TopCenter"}),
        e3 = jsPlumb.addEndpoint("container3", {anchor: "TopCenter"}),
        e4 = jsPlumb.addEndpoint("container0"),
        e5 = jsPlumb.addEndpoint("container0");
        
    jsPlumb.draggable("container0");
    jsPlumb.draggable("container3");
    jsPlumb.draggable("container1");

//    jsPlumb.draggable($(".container"));

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