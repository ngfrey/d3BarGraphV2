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
    var maxValue = d3.max(data, function(d) { return(d.x);} );
    
    var yScale = d3.scale.linear()
      						 .domain([0, maxValue])
      						 .range([svgHeight, 0]);
    
    var widthPercent = 0.15;  						 
    
    var xScale = d3.scale.ordinal()
                  .domain(d3.range(data.length))
                  .rangeBands([0, svgWidth], widthPercent); //.15 = 15% of width will be used for bar spacing
                  
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(5);
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10);

    
      
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
  			    
  			    svg.append("text")
					   .attr("id", "tooltip")
					   .attr("x", xPosition)
					   .attr("y", yPosition + margin.top + 7) //moving the basic tooltip down
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
        
      console.log("possible updated svg below");
      console.log(svg);
  
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
          
    //fixing the axis text...so it looks crisp, just like the axis      
    //  d3.selectAll(".tick > text")
        d3.selectAll(".xaxis .tick text")
        .style("font-size", "11px")
        //.style("stroke", "grey")
        .style("stroke-width", "0")
        .style("fill", "black")
        .style("font-family", "sans-serif")
        .style('shape-rendering', "crispEdges")
        .style('stroke-opacity', '0.8');

// and the y axis
        d3.selectAll(".yaxis .tick text")
        .style("font-size", "11px")
        //.style("stroke", "grey")
        .style("stroke-width", "0")
        .style("fill", "black")
        .style("font-family", "sans-serif")
        .style('shape-rendering', "crispEdges")
        .style('stroke-opacity', '0.8');

// tooltip section below:  
/* 
    var tooltip = d3.select(el).append('div'); 
    tooltip.attr('id', 'tooltip-div');
      console.log("tooltip below");
      console.log(tooltip);
  */       
      console.log("xaxis below");
      console.log(svg.selectAll(".xaxis"));
      
      
      
 /*     
      svg.selectAll("g")
        .data(data)
        .enter()
          .append("g")
          .attr('class', "text")
   */       
  },

//  resize: function(el, width, height, theChart) {
    
    
    
//  }//with new resize

  resize: function(el, width, height, theChart) {
    // Re-render the previous value, if any
    if (theChart.lastValue) {
      d3.selectAll('g').remove();  
      d3.selectAll('rect').remove();
      //d3.selectAll('svg').remove();
      this.renderValue(el, theChart.lastValue, theChart);

    }
  }

/*    
    console.log("width below:");
    console.log(width);
    console.log("el.offsetWidth below");
    console.log(el.offsetWidth);
    //console.log(this);
    console.log("el below");
    console.log(el);
    
  d3.select(el).select("svg") //theChart.svg
      .attr('width', width)
      .attr('height', height);
      
  console.log("after changing the svg height and width:");
  console.log(d3.select(el).select("svg"));
    //  .call(theChart);
    
  console.log("d3.select(el).select('svg').remove() below:");
  console.log(d3.select(el).select("svg").remove());  
  
  console.log("el below", d3.select(el));
  console.log("refreshed with new svg:")
  
  var svg = d3.select(el).append("avg")
              .attr('width', el.offsetWidth)
              .attr('height', el.offsetHeight);
              
              
  
              
  
    //console.log("resize svg below:");  
    //console.log(svg);  
    //theChart.svg.size([width, height]);
    //d3.select(el)
    //  .call(theChart);
    
  */  
    
 // }//with resize method, if I uncommment the above section

});
