var hexbin = require('../../deps/hexbin');
var Bin = require('./bin');
var _ = require('lodash');
var React = require('react');
var utils = require('lightning-client-utils');
var scale = require('d3-scale');

var Hexbin = React.createClass({displayName: "Hexbin",

    getDefaultProps: function() {
        return {
          points: [],
          initialRadius: 10
        };
    },

    getInitialState: function() {
        return {
            radius: this.props.initialRadius
        };
    },

    _getExtent: function(idx) {
        var iter = function(d) { return d[idx]; };

        var min = _.min(this.props.points, iter);
        var max = _.max(this.props.points, iter);

        return [min[idx], max[idx]];
    },

    hexbin: function() {
        return hexbin().size([this.props.width, this.props.height]).radius(this.state.radius);
    },

    scaleX: function() {
        return scale.linear().domain(this._getExtent(0)).range([0, this.props.width]);
    },

    scaleY: function() {
        return scale.linear().domain(this._getExtent(1)).range([0, this.props.height]);
    },

    componentWillUpdate: function() {
        var context = this.getDOMNode().getContext('2d');
        context.clearRect(0, 0, this.props.width, this.props.height);
    },

    drawNodes: function() {
        var hexbin = this.hexbin();
        var scaleX = this.scaleX();
        var scaleY = this.scaleY();
        var path = hexbin.hexagon();

        var x, y;
        var points = _.map(this.props.points, function(d) {
            x = scaleX(d[0]);
            y = scaleY(d[1]);
            return [x, y];
        }, this);

        var data = hexbin(points);
        var value = _.pluck(data, 'length');
        var colors = utils.getColorFromData({
            value: value
        });

        return _.map(data, function(d, i) {
            return (React.createElement(Bin, {path: path, x: d.x, y: d.y, getCanvasNode: this.getDOMNode, color: colors[i], key: i}))
        }, this);
    },

    render: function() {
        return (
            React.createElement("canvas", {
                width: this.props.width, 
                height: this.props.height}, 
                this.drawNodes()
            )
        )
    }
 
});


module.exports = Hexbin;

