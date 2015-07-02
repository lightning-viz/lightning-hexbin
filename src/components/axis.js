var React = require('react');
var d3 = require('d3');
var _ = require('lodash');
var Path = require('svg-path-generator');

var axis_orientations = {
    TOP: 'top',
    LEFT: 'left',
    BOTTOM: 'bottom',
    RIGHT: 'right'
};

var Axis = React.createClass({

    getDefaultProps: function() {
        return {
          innerTickSize: 6,
          outerTickSize: 6,
          tickPadding: 3
        };
    },

    getTickSpacing: function() {
        return Math.max(this.props.innerTickSize, 0) + this.props.tickPadding;
    },

    _formatTranslate: function (x, y) {
        return 'translate(' + x + ',' + y + ')';
    },

    getTransformForTick: function(tick) {
        var orientation = this.props.orientation;

        if (orientation === axis_orientations.BOTTOM || orientation === axis_orientations.TOP) {
            return this._formatTranslate(this.props.scale(tick) + this.props.margin.left, 0);
        } else if (orientation === axis_orientations.LEFT || orientation === axis_orientations.RIGHT) {
            return this._formatTranslate(0, this.props.scale(tick) + this.props.margin.top);
        }
    },

    generateTicks: function(ticks) {
        var orientation = this.props.orientation;
        var sign = (orientation === axis_orientations.TOP || orientation === axis_orientations.LEFT) ? -1 : 1;

        var textStyles = {
            fontFamily: 'monospace',
            fill: '#BEC9CE'
        };

        var lineStyles = {
            stroke: '#BEC9CE',
            opacity: 0.4,
            fill: 'none'
        }

        var textProps = {style: textStyles};
        var lineProps = {style: lineStyles};
        if (orientation === axis_orientations.BOTTOM || orientation === axis_orientations.TOP) {
            textProps.dy = (sign < 0) ? '0em' : '1em';
            textProps.style = _.extend(textProps.style, {
                textAnchor: 'middle'
            });
            lineProps.y2 = sign * this.props.innerTickSize;
            lineProps.y1 = sign < 0 ? this.props.margin.top : 0;
            lineProps.x2 = 0;
        } else if (orientation === axis_orientations.LEFT || orientation === axis_orientations.RIGHT) {
            textProps.dx = (sign < 0) ? this.props.margin.left - 7 : 0;
            textProps.style = _.extend(textProps.style, {
                textAnchor: (sign < 0) ? 'end' : 'start'
            });

            lineProps.x1 = sign < 0 ? this.props.margin.left : 0;
            lineProps.x2 = sign * this.props.innerTickSize;
            lineProps.y2 = 0
        }

        return _.map(ticks, function(tick, i) {

            var text = React.createElement('text', textProps, tick);
            var line = React.createElement('line', lineProps);
            return (
                <g className={'tick'} key={i} transform={this.getTransformForTick(tick)}>
                    {line}
                    {text}
                </g>
            )
        }, this);

    },

    generateDomain: function(d) {
        var orientation = this.props.orientation;
        var sign = (orientation === axis_orientations.TOP || orientation === axis_orientations.LEFT) ? -1 : 1;
        var path;
        var range = this.props.scale.range();
        var style = {
            fill: 'none',
            stroke: '#BEC9CE'
        }

        if (orientation === axis_orientations.BOTTOM || orientation === axis_orientations.TOP) {
            path = new Path()
                        .moveTo(range[0], 0)
                        .horizontalLineTo(range[1])
                        .end();
        } else if (orientation === axis_orientations.LEFT || orientation === axis_orientations.RIGHT) {
            path = new Path()
                        .moveTo(sign < 0 ? this.props.margin.left : 0, range[0])
                        .verticalLineTo(range[1])
                        .end();
        }
        return (<path d={path} strokeWidth={1} style={style}></path>);
    },

    getTransform: function() {
        var orientation = this.props.orientation;
        if (orientation === axis_orientations.BOTTOM) {
            return this._formatTranslate(this.props.margin.left, this.props.margin.top + this.props.height);
        } else if (orientation === axis_orientations.LEFT) {
            return this._formatTranslate(0, this.props.margin.top);
        } else if (orientation === axis_orientations.RIGHT) {
            return this._formatTranslate(this.props.margin.left + this.props.width, this.props.margin.top);
        } else if (orientation === axis_orientations.TOP) {
            return this._formatTranslate(this.props.margin.left, 0);
        }
    },

    render: function() {
        var scale = this.props.scale;
        var ticks = scale.ticks ? scale.ticks() : scale.domain();
        var domain = [];

        return (
            <g className={this.props.className} transform={this.getTransform()}>
                {this.generateTicks(ticks)}
                {this.generateDomain(domain)}
            </g>
        );
    }

});

module.exports = Axis;

