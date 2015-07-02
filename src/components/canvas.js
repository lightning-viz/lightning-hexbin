var React = require('react');

var Canvas = React.createClass({

    getInitialState: function() {
        return {
            radius: this.props.initialRadius
        };
    },

    getContext: function() {
        return React.findDOMNode(this).getContext('2d');
    },

    render: function() {
        var children = React.Children.map(this.props.children, function(child, i) {
            return React.cloneElement(child, {getContext: this.getContext});
        }, this);

        return (
            <canvas width={this.props.width} height={this.props.height} style={this.props.style}>
                {children}
            </canvas>
        )
    }

});


module.exports = Canvas;

