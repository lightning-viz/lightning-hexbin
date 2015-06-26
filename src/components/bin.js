var React = require('react');

var Bin = React.createClass({ 
 
    componentDidMount: function() {
        var context = this.props.getCanvasNode().getContext('2d');
        this.paint(context);
    },
 
    componentDidUpdate: function() {
        var context = this.props.getCanvasNode().getContext('2d');
        this.paint(context);
    },
 
    paint: function(context) {
        context.save();

        context.translate(this.props.x, this.props.y);
        var p = new Path2D(this.props.path);

        context.fillStyle = this.props.color.toString();
        context.fill(p);

        context.strokeStyle = '#ddd';
        context.lineWidth = '1';
        context.stroke(p);

        context.restore();
    },
 
    render: function() {
        return false;
    }

});

module.exports = Bin;