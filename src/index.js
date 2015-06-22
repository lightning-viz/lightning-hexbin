
var React = require('react');
var Hexbin = require('./components/hexbin');
var d3 = require('d3');


/*
 * Initialize a new visualization and call the internal _init function
 */
var LightningHexbin = function(selector, data, images, opts) {
    this.opts = opts || {};
    
    this.width = (this.opts.width || $(selector).width());
    this.height = (this.opts.height || (this.width * 0.6));
    
    this.data = this._formatData(data);
    this.selector = selector;
    this._init();
};

/*
 * Initialize the visualization. This is kept separate by convention to make it easy
 * to inherit from other visualization types.
 */
LightningHexbin.prototype._init = function() {
    // draw the actual visualization here
    // e.g.           


    var randomX = d3.random.normal(this.width / 2, 80);
    var randomY = d3.random.normal(this.height / 2, 80);
    var points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

    this.data = {
      points: points
    };

    React.render((<Hexbin points={this.data.points} width={this.width} height={this.height} />), $(this.selector)[0]);
}

/*
 * Take the provided data and return it in whatever data format is needed
 */
LightningHexbin.prototype._formatData = function(data) {
   var transformedData = data;
   
   // …
   // transform the data into whatever form you need here
   // …
   
    return transformedData;
    
}

/*
 * Optional function, use this if you want to users to send updated data to this plot
 */
LightningHexbin.prototype.updateData = function(data) {
    this.data = this._formatData(data);
    // then update the visualization
}

/*
 * Optional function, use this if you want to enable streaming updates to this plot
 */
LightningHexbin.prototype.appendData = function(data) {
    this.data = this.data.concat(this._formatData(data));
    // then update the visualization
}


module.exports = LightningHexbin;