
var React = require('react');
var Hexbin = require('./components/hexbin');
var d3 = require('d3');
var LightningVisualization = require('lightning-visualization');


/*
 * Initialize a new visualization and call the internal _init function
 */
var LightningHexbin = LightningVisualization.extend({

    init: function() {       
        var randomX = d3.random.normal(this.width / 2, 80);
        var randomY = d3.random.normal(this.height / 2, 80);
        var points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

        this.data = {
          points: points
        };

        React.render((<Hexbin points={this.data.points} width={this.width} height={this.height} />), $(this.selector)[0]);
    },

    formatData: function(data) {
        return data;
    }

});


module.exports = LightningHexbin;
