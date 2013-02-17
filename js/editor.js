document.onselectstart = function () { return false; };

jsPlumb.ready(function(){
    jsPlumb.importDefaults({
        PaintStyle: { lineWidth:1, strokeStyle:"#456"},
        Connector: [ 'Flowchart' ],
        Container: $('#editor_area'),
        ConnectionsDetachable: false
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
        
        _create: function() {
            var that = this;
        
            this._parent = null;

            this._children = [];
            this._childrenWrapper = $();

            this._connections = [];
            this._endpoints = [];
                        
            this.element.droppable({
                drop: function( event, ui ) {
                    new_element = ui.draggable.clone();

                    new_element.diagramDroppable();
                    new_element.diagramDroppable( "setParent", $(this) );
                    
                    that.appendChild( new_element );
                    that.repaint();
                }
            });
        },

        setParent: function ( parent_element ) {
            this._parent = parent_element;
        },

        appendChild: function( child_element ) {
            this._children.push( child_element );
            
            this._appendChildToDiagram( child_element );
            
            this._appendConnection( this.element, child_element );
        },
        
        getWidth: function() {
            return Math.max( this.element.width(), this._childrenWrapper.width() );
        },
        
        getHeight: function() {
            return Math.max( this.element.height(), this._childrenWrapper.height() );
        },
        
        repaint: function() {
            var totalWidth = 0;
            var maxHeight = 0;
            
            $.each( this._children, function( index, child ) {
                child.diagramDroppable( "repaint" );
                
                totalWidth += child.diagramDroppable( "getWidth" );
                maxHeight = Math.max( child.diagramDroppable( "getWidth" ), maxHeight );
                
            });
        
            var element_offset = this.element.offset();
        
            this._childrenWrapper.height( maxHeight );
            
            var distance_beetween_elements = totalWidth / 5;
            
            this._childrenWrapper.width( totalWidth + ( this._children.length - 1 ) * distance_beetween_elements );
            
            this._childrenWrapper.offset({
                top: element_offset.top + 2 * this.element.height()
            });
        
            var current_offset = 0;
            $.each( this._children, function( index, child ) {
                console.log(current_offset);
                child.offset({
                    left: current_offset
                });
            
                current_offset += child.diagramDroppable("getWidth") + distance_beetween_elements;
            });
    
            this._repaintConnections();
            
        },

        _appendChildToDiagram: function( child_element ) {
            if( !this._childrenWrapper.length ) {
                this._childrenWrapper = $('<div/>');
                this._childrenWrapper.insertAfter( this.element );
            }
        
            this._childrenWrapper.append( child_element );
        },

        _appendConnection: function( begin_element, end_element ) {
            var start = jsPlumb.addEndpoint( begin_element );

            this._endpoints.push( start );

            var end = jsPlumb.addEndpoint( end_element, { anchor: "TopCenter" } );
            
            this._endpoints.push( end );

            var connection = jsPlumb.connect( { source: start, target: end } );

            this._connections.push( connection );
        },
    
        _repaintConnections: function() {
            $.each( this._endpoints, function( index, endpoint ) {
                endpoint.repaint();
            });
        
            $.each( this._connections, function( index, connection ) {
                connection.repaint();
            });
        },
    
        dumpTree: function( depth ) {
            if( depth === undefined ) {
                depth = 0;
            }
        
            console.log( "    " . repeat( depth ) + "->" , this.element );
            
            $.each( this._children, function( index, child ) {
                child.diagramDroppable( "dumpTree", depth + 1 );
            });
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

String.prototype.repeat = function( count ) {
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 0) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result;
}