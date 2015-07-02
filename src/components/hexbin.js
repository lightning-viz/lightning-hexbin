var hexbin = require('../../deps/hexbin');
var Bin = require('./bin');
var _ = require('lodash');
var React = require('react');
var utils = require('lightning-client-utils');
var scale = require('d3-scale');
var AxisWrapper = require('./axis-wrapper');
var Canvas = require('./canvas');

var Hexbin = React.createClass({

    getDefaultProps: function() {
        return {
          points: [],
          initialRadius: 10,
          margin: {
            bottom: 20,
            left: 20,
            top: 0,
            right: 0
          }
        };
    },

    getInitialState: function() {
        return {
            radius: this.props.initialRadius,
            x: scale.linear().domain(this._getExtent(0)).range([0, this.getInnerWidth()]),
            y: scale.linear().domain(this._getExtent(1)).range([this.getInnerHeight(), 0])
        };
    },

    _getExtent: function(idx) {
        var iter = function(d) { return d[idx]; };

        var min = _.min(this.props.points, iter);
        var max = _.max(this.props.points, iter);

        return [min[idx], max[idx]];
    },

    hexbin: function() {
        return hexbin().size([this.getInnerWidth(), this.getInnerHeight()]).radius(this.state.radius);
    },

    getInnerWidth: function() {
        return this.props.width - this.props.margin.left - this.props.margin.right;
    },

    getInnerHeight: function() {
        return this.props.height - this.props.margin.top - this.props.margin.bottom;
    },

    drawNodes: function() {
        var hexbin = this.hexbin();
        var path = hexbin.hexagon();

        var data = hexbin(this.props.points);
        var value = _.pluck(data, 'length');
        var colors = utils.getColorFromData({
            value: value
        });

        return _.map(data, function(d, i) {
            return (<Bin path={path} x={this.state.x(d.x)} y={this.state.y(d.y)} color={colors[i]} key={i} />)
        }, this);
    },

    render: function() {
        return (
            <AxisWrapper width={this.props.width} height={this.props.height} margin={this.props.margin} x={this.state.x} y={this.state.y}>
                <Canvas>
                    {this.drawNodes()}
                </Canvas>
            </AxisWrapper>
        )
    }
 
});


module.exports = Hexbin;

