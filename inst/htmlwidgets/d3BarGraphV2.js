HTMLWidgets.widget({

  name: 'd3BarGraphV2',

  type: 'output',

  initialize: function(el, width, height) {
    // this makes the svg object and attaches it to the
    //instance variable we call "theChart" in renderValue()
    
    var svg = d3.select(el).append("svg")
      .attr('class', "root")
      .attr('width', width)
      .attr('height', height);
      

    return {
      svg:svg
    };

  }, //with initialize

  renderValue: function(el, x, theChart) {

    theChart.lastValue = x; // from jcheng bubbles example 
    var data = HTMLWidgets.dataframeToD3(x.data);
    var svg = theChart.svg;
    var margin = {top: 5, right: 40, bottom: 20, left: 40, legend_top: 50};
      console.log("logging el below:");
      console.log(el);

  // setup figure height, leaving room for axis text
    var svgWidth = el.offsetWidth - margin.right - margin.left;
    var svgHeight = el.offsetHeight - (margin.top + margin.bottom + margin.legend_top);
    var svgBuffer = 1;
    var barPadding = 2;
    var barSpacing = svgWidth/data.length;
    var barWidth = barSpacing-barPadding;
    var maxValue = d3.max(data, function(d) { return(d.x);} ); //using d.x because the column in the dataframe from R is called 'x'
    
// setup scales, so all data values fit onto our canvas, do not paint outside the lines with your data!     
    var yScale = d3.scale.linear()
      						 .domain([0, maxValue])
      						 .range([svgHeight, 0]);
    
 		var widthPercent = 0.15; 				 
    
    var xScale = d3.scale.ordinal()
                  .domain(d3.range(data.length))
                  .rangeBands([0, svgWidth], widthPercent); //.15 = 15% of width will be used for bar spacing
                  // the rangeBands function comes from D3, it takes in a min, max, and % of bar width for bar spacing, I set this to be 15% of the total bar width. 
                  
//Setting up the axes, we have both an x axis and a y axis
                  
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(5);
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10);

// The code below actually makes the rectanges we want to have, binds them to the data, and sets the desired attributes, like color, and behaviors when the mouse is placed on a given rectangle     
      
      svg.selectAll("rect")
        .data(data)
        .enter()
          .append("rect")
          .attr('class', "rect")
          .attr('height', function(d){return svgHeight-yScale(d.x)})
          .attr('width', (barWidth-barPadding))
          .attr('x', function(d, i) {return i * barSpacing;})
          .attr("transform", "translate(" + margin.left + ", " + margin.legend_top + ")")
          .attr('y', function(d) {return yScale(d.x);})
          .attr('fill',"teal")
          .attr('stroke',"#004d4d")
  			  .on("mouseover", function(d) {
  			    var xPosition = parseFloat(d3.select(this).attr("x")) + (xScale.rangeBand()/2) + margin.left;
  			    var yPosition = parseFloat(d3.select(this).attr("y")) +7;


// This code puts labels on each bar. Since the labels are just text, we append text to the SVG canvas
// Note: we are still inside of the .on("mouseover" code's callback function
  			    svg.append("text")
					   .attr("id", "tooltip")
					   .attr("x", xPosition)
					   .attr("y", yPosition + margin.top + 7) //moving the simple tooltip down
					   .attr("text-anchor", "middle")
					   .attr("font-family", "sans-serif")
					   .attr("font-size", "11px")
					   .attr("font-weight", "bold")
					   .attr("fill", "black")
					   .text(d.x);
  			    
  			    
  			    
  			   	d3.select(this)
  			   			.attr("fill", "orange");
  			   })
  			   .on("mouseout", function(d) {
  			     d3.select("#tooltip").remove();
  				   d3.select(this)
  				    .transition()
  				    .duration(300)
  						.attr("fill", "teal");
  			   });
      
  
    // setting up the x-axis:      
      svg.append("g")
          .attr('class', "xaxis")
          .attr('fill', "none")
          .attr('stroke', "black")
          .attr('shape-rendering', "crispEdges")
          .attr("transform", "translate(" + (margin.left - 2) + ", " + (svgHeight +margin.legend_top + 1) + ")")
          .call(xAxis);
  
    // And the y-axis        
      svg.append("g")
          .attr('class', "yaxis")
          .attr('fill', "none")
          .attr('stroke', "black")
          .attr('shape-rendering', "crispEdges")
          .attr("transform", "translate(" + (margin.left - 2) + ", " + (margin.legend_top + 1) + ")")
          .call(yAxis);
          
    //fixing the axis text...so it looks crisp      
        d3.selectAll(".xaxis .tick text")
        .style("font-size", "11px")
        .style("stroke-width", "0")
        .style("fill", "black")
        .style("font-family", "sans-serif")
        .style('shape-rendering', "crispEdges")
        .style('stroke-opacity', '0.8');

    // and the y axis
        d3.selectAll(".yaxis .tick text")
        .style("font-size", "11px")
        .style("stroke-width", "0")
        .style("fill", "black")
        .style("font-family", "sans-serif")
        .style('shape-rendering', "crispEdges")
        .style('stroke-opacity', '0.8');

     
  },

  resize: function(el, width, height, theChart) {
    // Re-render the previous value, if any
    if (theChart.lastValue) {
      d3.selectAll('g').remove();  
      d3.selectAll('rect').remove();
      //d3.selectAll('svg').remove();
      this.renderValue(el, theChart.lastValue, theChart);

    }
  }



});
