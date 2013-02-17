document.onselectstart = function () { return false; };

jsPlumb.ready(function(){
    jsPlumb.importDefaults({
        PaintStyle: { lineWidth:1, strokeStyle:"#456"},
        Connector: [ 'Flowchart' ],
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
            
            var connection = this._createConnection( this.element, child_element );
            
            this._connections.push( connection );
        },

        repaint: function() {
    
            $.each( this._children, function(index, child){
                console.log('repaintchild')
                child.diagramDroppable( "repaint" );
            });
                    
        },

        _appendChildToDiagram: function( child_element ) {
            if( !this._childrenWrapper.length ) {
                this._childrenWrapper = $('<div/>');
                this._childrenWrapper.insertAfter( this.element );
            }
        
            this._childrenWrapper.append( child_element );
        },

        _createConnection: function( begin_element, end_element ) {
            var start = jsPlumb.addEndpoint( begin_element );

            var end = jsPlumb.addEndpoint( end_element, { anchor: "TopCenter" } );

            return jsPlumb.connect( { source: start, target: end } );
        },
    
        /**
         * @todo Complete it
         */
        dumpTree: function( depth, elem ) {
            if( depth === undefined ) {
                depth = 0;
            }
        
            if( elem === undefined ) {
                elem = this;
            }
        
            var that = this;
            
            $.each( elem._children, function( index, child ) {
                console.log( " " . repeat( depth ) + "->" , child );
                that.dumpTree( depth + 1, child.diagramDroppable() );
            });
        }
    });
    
})(jQuery);

//TODO Calculating propper top, left offsets while dragging elements
//TODO Create a dumpTree method
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