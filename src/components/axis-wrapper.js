var React = require('react');
var d3 = require('d3');

var AxisWrapper = React.createClass({

    getDefaultProps: function() {
        return {
          xTicks: 5,
          yTicks: 5,
          xPosition: 'bottom',
          yPosition: 'left',
          margin: {
            bottom: 20,
            left: 20,
            top: 0,
            right: 0
          }
        };
    },

    componentDidMount: function() {
        var xAxis = React.findDOMNode(this.refs.xAxis);
        console.log(xAxis);
        var s = d3.select(xAxis);
        console.log(s);

        var d3Axis = d3.svg.axis()
            .scale(this.props.x)
            .orient(this.props.xPosition)
            .ticks(this.props.xTicks);

        s.call(d3Axis);
    },

    xAxis: function () {
        return (<g className={'x axis'} transform={this._formatTranslate(0, this.props.height - 20)} ref="xAxis"></g>)

        // return d3.svg.axis()
        //     .scale(this.props.x)
        //     .orient(this.props.xPosition)
        //     .ticks(this.props.xTicks);
    },

    yAxis: function() {

        return (<g className={'y axis'} transform={this._formatTranslate(0, this.props.height - 20)} ref="xAxis"></g>)
        // return d3.svg.axis()
        //     .scale(this.props.y)
        //     .orient(this.props.yPosition)
        //     .ticks(this.props.yTicks);
    },

    _formatTranslate: function (x, y) {
        return 'translate(' + x + ',' + y + ')';
    },

    getChildWidth: function() {
        return this.props.width - this.props.margin.left - this.props.margin.right;
    },

    getChildHeight: function() {
        return this.props.height - this.props.margin.top - this.props.margin.bottom;
    },

    render: function() {

        var children = React.Children.map(this.props.children, function(child, i) {
            return React.cloneElement(child, {style: {position: 'absolute'}, width: this.getChildWidth(), height: this.getChildHeight()});
        }, this);

        return (
            <div style={{position: 'relative'}}>
                <svg width={this.props.width} height={this.props.height} style={{position: 'absolute'}}>
                    {this.xAxis()}
                </svg>
                {children}
            </div>
        );
    }

});

module.exports = AxisWrapper;

