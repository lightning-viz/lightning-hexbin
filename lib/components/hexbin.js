
var hexbin = require('../../deps/hexbin');
var Bin = require('./bin');
var _ = require('lodash');
var React = require('react');
var utils = require('lightning-client-utils');


var Hexbin = React.createClass({displayName: "Hexbin",

    getDefaultProps: function() {
        return {
          points: [],
          initialRadius: 20
        };
    },

    getInitialState: function() {
        return {
            radius: this.props.initialRadius
        };
    },

    hexbin: function() {
        return hexbin().size([this.props.width, this.props.height]).radius(this.state.radius);
    },

    componentDidUpdate: function() {
        var context = this.getDOMNode().getContext('2d');
        console.log('clearing rect');
        context.clearRect(0, 0, this.props.width, this.props.height);
        // this.forceUpdate();

        console.log(this.props.childen);
        this.props.childen.map(function(c) {
            c.forceUpdate();
        })
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
            return (React.createElement(Bin, {path: path, x: d.x, y: d.y, getCanvasNode: this.getDOMNode, color: colors[i]}))
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

