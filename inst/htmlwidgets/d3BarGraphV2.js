HTMLWidgets.widget({

  name: 'd3BarGraphV2',

  type: 'output',

  initialize: function(el, width, height) {
    // this makes the svg object and attaches it to the instance variable we call "theChart" in renderValue()
    
    var svg = d3.select(el).append("svg")
      .attr('class', "root")
    //.append("div").classed("svg-container", true).append("svg")
    //     .attr("preserveAspectRatio", "xMinYMin meet")
    //     .attr("viewBox", "0 0 width height")
    //     .classed("svg-content-responsive", true); //theChart.svg
      .attr('width', width)
      .attr('height', height);
      

    return {
      svg:svg
    };

 
 //return{}; //returning just the instance 
  }, //with initialize

  renderValue: function(el, x, theChart) {
      console.log("el below");
      console.log(el);
      console.log("x from renderValue below");
      console.log(x);
      
      console.log("theChart instance thing below");
      console.log(theChart);
      console.log("theChart.svg below");
      console.log(theChart.svg);

    var data = HTMLWidgets.dataframeToD3(x.data);
    var svg = theChart.svg;
    var margin = {top: 5, right: 30, bottom: 20, left: 30, legend_top: 50};
      console.log("referenced svg object below, svg = theChart.svg");
      console.log(svg);
    
      console.log("data from HTMLWidgets.datframeToD3 and length below");
      console.log(data);
      console.log(data.length);

    var svgWidth = el.offsetWidth - margin.right - margin.left;
    var svgHeight = el.offsetHeight - (margin.top + margin.bottom + margin.legend_top);
      console.log("svgWidth below");
      console.log(svgWidth);
      console.log("svgHeight below");
      console.log(svgHeight);
   
    var svgBuffer = 1;
    var barPadding = 2;
      console.log("barPadding below:");
      console.log(barPadding);
    
    var barSpacing = svgWidth/data.length;
      console.log("barspacing below:");
      console.log(barSpacing);
    var barWidth = barSpacing-barPadding;
    var maxValue = d3.max(data, function(d) { return(d.x);} );
    
    var yScale = d3.scale.linear()
      						 .domain([0, maxValue])
      						 .range([0, svgHeight]);
    
    var widthPercent = 0.15;  						 
    
    var xScale = d3.scale.ordinal()
                  .domain(d3.range(data.length))
                  .rangeBands([0, svgWidth], widthPercent); //.15 = 15% of width will be used for bar spacing
                  
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(5);

    
      
      svg.selectAll("rect")
        .data(data)
        .enter()
          .append("rect")
          .attr('class', "rect")
          .attr('height', function(d){return yScale(d.x)})
          .attr('width', (barWidth-barPadding))
          .attr('x', function(d, i) {return i * barSpacing;})
          .attr("transform", "translate(" + margin.left + ", " + margin.legend_top + ")")
          .attr('y', function(d) {return svgHeight-yScale(d.x);})
          .attr('fill',"teal")
          .attr('stroke',"#004d4d");
      
      console.log("possible updated svg below");
      console.log(svg);
      
      svg.selectAll("g")
        .data(data)
        .enter()
          .append("g")
          .attr('class', "axis")
          .attr('fill', "none")
          .attr('stroke', "black")
          .attr('shape-rendering', "crispEdges")
          .attr("transform", "translate(" + (margin.left - 1) + ", " + (svgHeight +margin.legend_top + 1) + ")")
          .call(xAxis);
          
    //  d3.selectAll(".tick > text")
        d3.selectAll(".tick text")
        .style("font-size", "11px")
        //.style("stroke", "grey")
        .style("stroke-width", "0")
        .style("fill", "black")
        .style("font-family", "sans-serif")
        .style('shape-rendering', "crispEdges")
        .style('stroke-opacity', '0.8');
        
        
      console.log("axis below");
      console.log(svg.selectAll(".axis"));
      
      
      
 /*     
      svg.selectAll("g")
        .data(data)
        .enter()
          .append("g")
          .attr('class', "text")
   */       
  },

  resize: function(el, width, height, theChart) {
    
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
    
    //console.log("resize svg below:");  
    //console.log(svg);  
    //theChart.svg.size([width, height]);
    //d3.select(el)
    //  .call(theChart);
  }

});
