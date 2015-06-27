var React = require('react');
var d3 = require('d3');

var AxisWrapper = React.createClass({

    getDefaultProps: function() {
        return {
          xTicks: 5,
          yTicks: 5,
          xPosition: 'bottom',
          yPosition: 'left'
        };
    },

    makeXAxis: function () {
        return d3.svg.axis()
            .scale(this.props.x)
            .orient(this.props.xPosition)
            .ticks(this.props.xTicks);
    },

    makeYAxis: function() {
        return d3.svg.axis()
            .scale(this.props.y)
            .orient(this.props.yPosition)
            .ticks(this.props.yTicks);
    },

    _formatTranslate: function (x, y) {
        return 'translate(' + x + ',' + y + ')';
    },

    render: function() {
        var children = React.Children.map(this.props.children, function(child, i) {
            return React.cloneElement(child, {style: {position: 'absolute'}, width: this.props.width, height: this.props.height});
        }, this);

        return (
            <div style={{position: 'relative'}}>
                <svg width={this.props.width} height={this.props.height} style={{position: 'absolute'}}>
                    <g className={'x axis'} transform={this._formatTranslate(0, this.props.height - 20)}></g>
                </svg>
                {children}
            </div>
        );
    }

});

module.exports = AxisWrapper;

