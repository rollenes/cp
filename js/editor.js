document.onselectstart = function () { return false; };

jsPlumb.ready(function(){
    jsPlumb.importDefaults({
        PaintStyle: { lineWidth:1, strokeStyle:"#456"},
        Connector: [ 'Flowchart' ],
        RenderMode: jsPlumb.CANVAS
    });
});

(function($) {
    $.widget("cp.diagramDraggable", {
        _create: function() {
            this.element.draggable({
                helper: 'clone',
                revert: 'invalid'
            });
        }
    });

    $.widget("cp.diagramDroppable", {
        parent: null,
        children: [],
        
        _create: function() {
            this.element.droppable({
                drop: function( event, ui ) {
                    $(this).diagramDroppable( "addChild", ui.draggable.clone() );
                }
            });
        },
        addChild: function( child_element ) {
            parent_element = this.element;

            child_element.diagramDroppable().parent = parent_element;
            
            this.children.push( child_element );
            
            this.paintChild( child_element );
            
            this.paintConnection( parent_element, child_element );
            
        },
        paintChild: function( child_element ) {
            offset = this.element.offset();

            child_element.insertAfter( this.element ).offset({
                top: offset.top + 2 * this.element.height()
            });
        
        },
        paintConnection: function( begin_element, end_element ) {
            start = jsPlumb.addEndpoint( begin_element );

            end = jsPlumb.addEndpoint( end_element, { anchor: "TopCenter" } );

            connection = jsPlumb.connect( { source: start, target: end } );
        }
    });
    
})(jQuery);

//TODO Calculating propper top, left offsets while dragging elements
//TODO Dragging elements from editor area causes dragging full subtree
//TODO Dragging from editor_area to elements area removes element from diagram
//TODO Build an abstract basis of connecting elements
//TODO Resizing diagram
//TODO Testing in diferent browsers
//TODO Build an abstract basis of editing diagram elements
//TODO Comunication data structure proposal
//TODO Data saving 
//TODO Firefox bug fix

//jsPlumb.ready(function(){
//
//    $(window).resize(function() {
//        e0.repaint();
//        e1.repaint();
//        e2.repaint();
//        e3.repaint();
//        e4.repaint();
//        e5.repaint();
//        connection0.repaint();
//        connection1.repaint();
//        connection2.repaint();
//    });
//
//});