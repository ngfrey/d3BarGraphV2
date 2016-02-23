
    function barD3() {

        //var data = HTMLWidgets.dataframeToD3(params.data); //get data from htmlwidgets --params is not defined
        //var data = [8,16,10,18,19,4,12,18,12,11,19,11,15,13,5];
        //var data = data;

        //This is where Rob Moore says to initialize variables you want to make visible to the calling function
        // In this case: data, width, height, svg
        // xScale and yScale are probably not needed here
        // barPadding and fillColor will be set to user defined values later...hardcoded for now

        //var data; //Following juba's example on GitHub
        var data;
        var width = width || 600;  //default--value taken from htmlwidgets arguement, else 600
        var height = height || 600;  //default --value taken from htmlwidgets argueemnt, else 600
        var svg, xScale, yScale;
        var barPadding = 1;
        var fillColor = 'steelblue';
        var strokeWidth = 2;
        var params = {};// =  2; //defaults to 2 if nothing provided
        console.log(strokeWidth);


      console.log(params.height);





    function chart(selection){
      selection.each(function (){
        var root = svg.append("g")
            .attr("class", "root")
            .style("fill", "#FFF");
        //var minValue = d3.min(data);
        //var heightScale = height/maxValue;
        var barSpacing = width/ data.length;
        var barWidth  = (barSpacing - barPadding) - 2;
        var maxValue = d3.max(data, function(d) { return(d.x);} );
        console.log(maxValue);
  		  var yScale = d3.scale.linear()
  						.domain([0, maxValue])
  						.range([0, height]);
        root
          .selectAll('.bar')
          .data(data)
            .enter()
          .append('rect')
          .attr("x", function(d, i) {return i*barSpacing;})
			    .attr("y", function(d) {return height - yScale(d.x);})
			    .attr("class", "bar")
			    .attr("width", barWidth)
			    .attr("height", function(d) {return yScale(d.x);})
			    .style('fill', fillColor)
			    .style("stroke-width",strokeWidth)
			    .style('stroke',"#1874CD");

			    console.log(svg);


      }); // with function(data) and selection.each

    }//with chart

    function resize_chart() {
      d3.select(el).select("svg") //.select(".root")
        .attr("width", width)
        .attr("height", height);
       // .attr("strokeWidth", strokeWidth);
      //xScale.range([0, width]);
      //yScale.range([height, 0]);
      //svg.select(".root").attr('height', height).attr('width', width).attr('strokeWidth',strokeWidth);


    }

          // resize
      chart.resize = function() {
          resize_chart(); //this lets us use barD3().chart.resize() later on in the resize function in HTMLWidgets
          // need to ensure resize_chart() is a valid function
       };
      chart.width = function(value) {
      	  if (!arguments.length) return width;//if nothing is passed to the function, return the default width
      	  // and chart object
        	width = value;
          return chart;
    	};

    	chart.height = function(value) {
        	if (!arguments.length) return height;
        	height = value;
        	return chart;
    	};
    	chart.strokeWidth = function(value) {
        	if (!arguments.length) return strokeWidth;
        	strokeWidth = value;
        	return chart;
    	};
    	chart.barPadding = function(value) {
        	if (!arguments.length) return barPadding;
        	barPadding = value;
        	return chart;
    	};

      chart.data = function(value) {
          if (!arguments.length) return data;
          data = value;
          return chart;
    };
    	chart.svg = function(value) {
          if (!arguments.length) return svg;
          svg = value;
          return chart;
    };
 return chart;
}//goes with the the opening barD3(){ bracket

  // instance=instance.svg(svg).data(data);


HTMLWidgets.widget({

  name: 'd3BarGraph',

  type: 'output',

  initialize: function(el, width, height, strokeWidth) {

    var svg =  d3.select(el).append("svg");
    svg
    .attr("width", width)
    .attr("height", height);
    //.attr("strokeWidth", strokeWidth);
  return barD3().width(width).height(height).svg(svg).strokeWidth(strokeWidth); //passing the svg obj & options to the barD3 function.

  },


  renderValue: function(el, params, instance, strokeWidth) {

   var data = HTMLWidgets.dataframeToD3(params.data);
   strokeWidth = params.options.strokeWidth;
     //= params.options.strokeWidth;
   console.log(params.options.strokeWidth);

   var svg =  d3.select(el).select("svg");

    instance = instance.data(data);
    console.log(instance.data);

   d3.select(el)
    .call(instance);
   // console.log(instance);
  //  console.log(instance.svg);

  },

  resize: function(el, width, height, strokeWidth, instance) {

  //var svg = instance.svg;
 /*   var svg = d3.select(el).select("svg");
    svg
    .attr('width', width)
    .attr('height', height)
    .attr('strokeWidth', strokeWidth)
    .resize();
    */
   //instance.width(width).height(height).svg(svg).resize(); //instance gets at function(chart)
  //return barD3().width(width).height(height).svg(svg).strokeWidth(strokeWidth);

  //instance.svg(svg).width(width).height(height).resize().resume();
  }



});
