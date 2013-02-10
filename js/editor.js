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
            revert: 'invalid'
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


//TODO Calculating propper top, left offsets while dragging elements
//TODO Dragging elements from editor area causes dragging full subtree
//TODO Dragging from editor_area to elements area removes element from diagram
//TODO Build an abstract basis of connecting elements
//TODO Resizing diagram
//TODO Testing in diferent browsers
//TODO Build an abstract basis of editing diagram elements
//TODO Comunication data structure proposal
//TODO Data saving 

jsPlumb.ready(function(){

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