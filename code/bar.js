// set up margins for chart
var margin_bar = {top: 100, right: 100, bottom: 70, left: 50},
	width bar = 1000 - marg.left - margin_bar.right,
	height_bar = 520 - margin_bar.top - margin_bar.bottom;

var svg_bar = d3.select('#viz4').select('#bar')
	.append('g')
	.attr("transform", "translate("+margin_bar.left + "," + margin_bar.top + ")");

var yScaleBar = d3.scaleLinear()
	.range([height_bar, 0]);

var xScaleBar = d3.scaleBlend()
	.domain(['1/31/2000',
			 '1/31/2001',
			 '1/31/2002',
			 '1/31/2003',
			 '1/31/2004',
			 '1/31/2005',
			 '1/31/2006',
			 '1/31/2007',
			 '1/31/2008',
			 '1/31/2009',
			 '1/31/2010',
			 '1/31/2011',
			 '1/31/2012',
			 '1/31/2013',
			 '1/31/2014',
			 '1/31/2015',
			 '1/31/2016',
			 '1/31/2017',
			 '1/31/2018',
			 '1/31/2019'])
	.range([0, width_bar])
	.paddingInner(0.05)
	.paddingOutter(0.25)

var xAxisBar = d3.axisBottom()
	.scale(xScaleBar)

var yAxisBar = d3.axisLeft()
	.scale(yScaleBar)

d3.csv("data/gapIncomeStatement.csv", function(error, data){
	yScaleBar.domain([0, d3.max(data, function(d){ return d.["Gross Profit"]; })])

	svg_bar.append("g")
		.attr("class", "xaxis")
		.attr("transform", "translate(0,", height_bar + ")")
		.call(xAxisBar)
		.selectAll("text")
		.style("font-size", "11px")

	svg_bar.append("g")
		.attr("class", "yaxis")
		.call(yAxisBar)

	// y-label
	svg_bar.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin_bar.left)
		.attr("x", 0 - (height_bar/2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.attr("font-family", "Chivo")
		.attr("font-weight", "400")
		.attr("font-size", "12px")
		.text("Gross Profit in Thousands");

	// chart title
	svg_bar.append("text")
		.attr("transform", "translate(" + width_bar/2 + "," + -60 +")")
		.style("text-anchor", "middle")
		.attr("font-family", "Chivo")
        .attr("font-size", "25px")
        .attr("font-weight", 300)
        .text("Gross Profit of Gap Inc.");

    // x-label
     svg_bar.append("text")
        .attr("transform", "translate(" + width_bar/2 + "," + (height_bar+40) + ")")
        .style("text-anchor", "middle")
        .attr("font-family", "Chivo")
        .attr("font-size", "12px")
        .attr("font-weight", "400")
        .text("Year");

    // build rectangles for bar chart
    svg_bar.selectAll('rectangle')
    	.data(data)
    	.enter()
    	.append('rect')
    	.attr("class", "bar")
    	.attr("x", function(d, i) { return xScaleBar(i+1); })
    	.attr("y", function(d, i) { return yScaleBar(+d.["Gross Profit"]; })
    	.attr("height", function(d) { return height_bar - yScaleBar(+d.["Gross Profit"]); })
        .attr("width", xScaleBar.bandwidth())
        .on("mouseover", function(d) {

        	//Get this bar's x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x"))
          var yPosition = parseFloat(d3.select(this).attr("y"));


          // want to display total revenue, cost of revenue, and gross profit
          svg_bar.append("text")
          	.attr("class", "tooltipbar")
          	.attr("x", xPosition+3)
          	.attr("y", yPosition-60)
          	.style("font-size", "14px")
          	.style("font-weight", "400")
          	.style("font-family", "Chivo")
          	.style("text-decoration", "underline")
          	.text(d.["Gross Profit"];


          svg_bar.append("foreignObject")
         	.attr("class", "tooltipbar")
          	.attr("width", 200)
          	.attr("height", 50)
          	.attr("x", xPosition+3)
          	.attr("y", yPosition-55)
          	.style("font", "10px 'Chivo'")
          	.style("font-weight", "300")
          	.style("color", "black")
          	.html(d.city + ", " + d.state 
          		 + "<br><b> Total Revenue: </b>" + d3.(d.["Total Revenue"])
          		 + "<b>Cost of Revenue</b> "  + d["Cost of Revenue"]; 
       
        .on("mouseout", function(){
        	// removes the tooltip
        	d3.selectAll(".tooltipbar").remove();

        });// close out mouse out


}); // close out
