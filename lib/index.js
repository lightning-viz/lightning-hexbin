var React = require('react');
var Hexbin = require('./components/hexbin');
var LightningVisualization = require('lightning-visualization');
var _ = require('lodash');

/*
 * Extend the base visualization object
 */
var LightningHexbin = LightningVisualization.extend({

    init: function() {
        this.render();
    },

    render: function() {
        React.render((React.createElement(Hexbin, {points: this.data.points, width: this.width, height: this.height})), $(this.selector)[0]);
    },

    formatData: function(data) {
        return {
            points: _.zip(data.x || [], data.y || [])
        }
    },

    updateData: function(formattedData) {
        this.data = formattedData;
        this.render();
    }

});


module.exports = LightningHexbin;
