// Old Javascript Snippets
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





 /*     
      svg.selectAll("g")
        .data(data)
        .enter()
          .append("g")
          .attr('class', "text")
*/  


// tooltip section below:  
/* 
    var tooltip = d3.select(el).append('div'); 
    tooltip.attr('id', 'tooltip-div');
      console.log("tooltip below");
      console.log(tooltip);
  */     
  
  
console.log("xaxis below");
console.log(svg.selectAll(".xaxis"));
      