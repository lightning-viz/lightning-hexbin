
var React = require('react');
var Hexbin = require('./components/hexbin');
var d3 = require('d3');
var LightningVisualization = require('lightning-visualization');
var _ = require('lodash');


/*
 * Initialize a new visualization and call the internal _init function
 */
var LightningHexbin = LightningVisualization.extend({

    init: function() {

        React.render((<Hexbin points={this.data.points} width={this.width} height={this.height} />), $(this.selector)[0]);
    },

    formatData: function(data) {
        return {
            points: _.zip(data.x || [], data.y || [])
        }
    }

});


module.exports = LightningHexbin;
