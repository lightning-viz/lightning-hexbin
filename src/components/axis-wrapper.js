var React = require('react');
var d3 = require('d3');
var Axis = require('./axis');
var _ = require('lodash');

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

    zoomed: function() {
        console.log('zoomed');
        this.forceUpdate();
    },

    componentDidMount: function() {
        var svg = React.findDOMNode(this.refs.svg);
        var child = React.findDOMNode(this.refs.child);
        var s = d3.select(svg);
        var c = d3.select(child);

        var zoom = d3.behavior.zoom()
            .x(this.props.x)
            .y(this.props.y)
            .on('zoom', _.debounce(this.zoomed, 10));

        s.call(zoom);
        console.log(c);
        c.call(zoom);
        
    },

    xAxis: function () {
        return (<Axis
            orientation={this.props.xPosition}
            scale={this.props.x}
            width={this.getInnerWidth()}
            height={this.getInnerHeight()}
            margin={this.props.margin} 
            innerTickSize={-this.getInnerHeight()}
            outerTickSize={0} />);
    },

    yAxis: function() {
        return (<Axis
            orientation={this.props.yPosition}
            scale={this.props.y}
            width={this.getInnerWidth()}
            height={this.getInnerHeight()}
            margin={this.props.margin}
            innerTickSize={-this.getInnerWidth()}
            outerTickSize={0} />);
    },

    getInnerWidth: function() {
        return this.props.width - this.props.margin.left - this.props.margin.right;
    },

    getInnerHeight: function() {
        return this.props.height - this.props.margin.top - this.props.margin.bottom;
    },

    render: function() {
        var children = React.Children.map(this.props.children, function(child, i) {
            return React.cloneElement(child, {ref: 'child', style: {position: 'absolute', marginLeft: this.props.margin.left, marginTop: this.props.margin.top}, width: this.getInnerWidth(), height: this.getInnerHeight()});
        }, this);

        return (
            <div style={{position: 'relative'}}>
                <svg width={this.props.width} height={this.props.height} style={{position: 'absolute'}} ref={'svg'}>
                    {this.xAxis()}
                    {this.yAxis()}
                </svg>
                {children}
            </div>
        );
    }
});

module.exports = AxisWrapper;
