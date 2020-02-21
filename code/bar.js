var margin_bar = {top: 100, right: 100, bottom: 70, left: 50},
    width_bar = 1000 - margin_bar.left - margin_bar.right,
    height_bar = 520 - margin_bar.top - margin_bar.bottom;

var svg_bar = d3.select("#viz4").select("#bar")
	.append("g")
  .attr("transform", "translate(" + margin_bar.left + "," + margin_bar.top + ")");

var yScaleBar = d3.scaleLinear()
      .range([height_bar, 0]);

var xScaleBar = d3.scaleBand()
              .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
              .range([0, width_bar])
              .paddingInner(0.05)
              .paddingOuter(0.25);

  var xAxisBar = d3.axisBottom()
    .scale(xScaleBar);

  var yAxisBar = d3.axisLeft()
    .scale(yScaleBar);

d3.csv("cleanIncomeStatement.csv", function(data){

  var date = ['1/31/2000',
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
 '1/31/2019']

 var gross_profit = [5296300,
 5664383,
 4143484,
 4913151,
 5968000,
 6381000,
 5869000,
 5649000,
 5692000,
 5447000,
 5724000,
 5889000,
 5274000,
 6171000,
 6293000,
 6289000,
 5720000,
 5640000,
 6066000,
 6322000]

  // var cities = ["All", "Atlanta", "Boston", "Chicago", "Dallas", "Detroit", "Houston", "Jersey City", "Las Vegas", "Los Angeles", "Miami", "New York City", "Philadelphia", "Pittsburgh", "San Francisco", "Seattle"];

  // var purposes = ["abandoned", "casino", "government", "hospital", "hotel", "observation", "office", "religious", "residential", "retail", "telecommunications"];


	// var selection = cities[0];
  var selection = date[0;]

	yScaleBar.domain([0, d3.max(data, function(d){ return d.height; })])

	svg_bar.append("g")
    	.attr("class", "xaxis")
    	.attr("transform", "translate(0," + height_bar + ")")
    	.call(xAxisBar)
    	.selectAll("text")
    	.style("font-size", "11px");

 	svg_bar.append("g")
    	.attr("class", "yaxis")
    	.call(yAxisBar);

   svg_bar.append("text")
	   .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin_bar.left)
      .attr("x",0 - (height_bar / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-family", "Chivo")
      .attr("font-weight", "400")
      .attr("font-size", "12px")
      .text("Height (m)");

    svg_bar.append("text")
        .attr("transform", "translate(" + width_bar/2 + "," + -60 + ")")
        .style("text-anchor", "middle")
        .attr("font-family", "Chivo")
        .attr("font-size", "25px")
        .attr("font-weight", 300)
        .text("Ten Tallest Skyscrapers (USA)");

    svg_bar.append("text")
        .attr("transform", "translate(" + width_bar/2 + "," + (height_bar+40) + ")")
        .style("text-anchor", "middle")
        .attr("font-family", "Chivo")
        .attr("font-size", "12px")
        .attr("font-weight", "400")
        .text("Rank");

	svg_bar.selectAll("rectangle")
      .data(data)
      .enter()
      .append("rect")
      .filter(function(d){ return d.category === selection; })
      .attr("class", "bar")
      .attr("x", function(d, i) { return xScaleBar(i+1); })
      .attr("y", function(d) { return yScaleBar(+d.height); })
      .attr("height", function(d) { return height_bar - yScaleBar(+d.height); })
      .attr("width", xScaleBar.bandwidth())
      .on("mouseover", function(d) {
        
					//Get this bar's x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x"))
					var yPosition = parseFloat(d3.select(this).attr("y"));

          var purposeString = "<i>" + d.main + "</i>";

          for (i in date){
            if (d[date[i]] === "TRUE" && pdate[i] != d.main){
              purposeString = purposeString + ", " + date[i];
            }
          }


        if (d.category === "All"){
          svg_bar.append("text")
          .attr("class", "tooltipbar")
          .attr("x", xPosition+3)
          .attr("y", yPosition-60)
          .style("font-size", "14px")
          .style("font-weight", "400")
          .style("font-family", "Chivo")
          .style("text-decoration", "underline")
          .text(d.name);

        svg_bar.append("foreignObject")
          .attr("class", "tooltipbar")
          .attr("width", 200)
          .attr("height", 50)
          .attr("x", xPosition+3)
          .attr("y", yPosition-55)
          .style("font", "10px 'Chivo'")
          .style("font-weight", "300")
          .style("color", "black")
          // .html(d.city + ", " + d.state + "<br><b> height: </b>" + d3.format(".5n")(d.height) + " m <br>" + "<b>completed:</b> " + d["completed.year"] +
          //   "<br><b>purposes: </b>" + purposeString);

        }
        else{

        svg_bar.append("text")
          .attr("class", "tooltipbar")
          .attr("x", xPosition+3)
          .attr("y", yPosition-45)
          .style("font-size", "14px")
          .style("font-weight", "400")
          .style("font-family", "Chivo")
          .style("text-decoration", "underline")
          // .text(d.name);

        svg_bar.append("foreignObject")
          .attr("class", "tooltipbar")
          .attr("width", 200)
          .attr("height", 50)
          .attr("x", xPosition+3)
          .attr("y", yPosition-40)
          .style("font", "10px 'Chivo'")
          .style("font-weight", "300")
          .style("color", "black")
          // .html("<b> height: </b>" + d3.format(".5n")(d.height) + " m <br>" + "<b>completed:</b> " + d["completed.year"] +
          //   "<br><b>purposes: </b>" + purposeString);

        }
             

			   })
			   .on("mouseout", function() {
			   
					//Remove the tooltip
          d3.selectAll(".tooltipbar").remove();
         
					
			   });

	var selector = d3.select("#drop")
    	.append("select")
    	.attr("id","dropdown")
    	.on("change", function(d){
        	selData = document.getElementById("dropdown");
        	selection = selData.options[selData.selectedIndex].value;

          svg_bar.selectAll(".bar")
            .data(data.filter(function(d){return d.category === selection}))
            .transition()
            .delay(function(d, i) {
               return i * 200;
             })
            .duration(500)
            .attr("height", function(d) { return height_bar - yScaleBar(+d.height); })
            .attr("y", function(d) { return yScaleBar(+d.height); })

    });
					

    selector.selectAll("option")
      .data(cities)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })

});
