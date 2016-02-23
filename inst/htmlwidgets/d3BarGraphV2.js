HTMLWidgets.widget({

  name: 'd3BarGraphV2',

  type: 'output',

  initialize: function(el, width, height) {
    // this makes the svg object and attaches it to the instance variable we call "theChart" in renderValue()
    var svg = d3.select(el).append("svg") //theChart.svg
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
      console.log("referenced svg object below, svg = theChart.svg");
      console.log(svg);
    
      console.log("data from HTMLWidgets.datframeToD3 and length below");
      console.log(data);
      console.log(data.length);

    var svgWidth = el.offsetWidth;
    var svgHeight = el.offsetHeight;
      console.log("svgWidth below");
      console.log(svgWidth);
      console.log("svgHeight below");
      console.log(svgHeight);
   

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
    
    console.log("d3 max Value below");
    console.log(maxValue);


      
      svg.selectAll("rect")
        .data(data)
        .enter()
          .append("rect")
          .attr('class', "rect")
          .attr('height', function(d){return yScale(d.x)})
          .attr('width', (barWidth-barPadding))
          .attr('x', function(d, i) {return i * barSpacing; })
          .attr('y', function(d) {return svgHeight-yScale(d.x);})
          .attr('fill',"teal");
      
      console.log("possible updated svg below");
      console.log(svg);
      
  
  },

  resize: function(el, width, height, theChart) {

  }

});
