// set width and height of svg element
var width = 760;
var height = 350;

// create projection
var projection = d3.geo.albersUsa()
	.translate([width / 2, height / 2])
	.scale([720]);

// create path generator; converts geojson to svg path's ("M 100 100 L 300 100 L 200 300 z")
var path = d3.geo.path()
	.projection(projection);

// create an svg element to the body of the html
var svg = d3.select("#map").append("svg")
	.attr("width", width)
	.attr("height", height);

// add a tooltip
var tooltip = d3.select("body")
	.append("div")
	.attr("class", "tooltip");

// create a quantize scale (function) to sort data values coo buckets of color
var color = d3.scale.quantize()
	.range(colorbrewer.Blues[8])

// make a legend
var legend = d3.select("#legend")
	.append("ul")
	.attr("class", "list-inline");

// function to calculate a color based on the ag productivity from data/us-ag-productivity-2004.csv file
function calculate_color(d) {

	var d = d.properties.value2010/d.properties.valuearea;

	if (d) {
		return d > 1000 ? '#084594' :
               d > 500 ? '#2171b5' :
               d > 200 ? '#4292c6' :
			   d > 100 ? '#6baed6' :
			   d > 50 ? '#9ecae1' :
	           d > 20 ? '#c6dbef' :
		       d > 10 ? '#deebf7' :
			   '#f7fbff';
	} else {
		return "#ccc"; // grayish
	}
}




// set margins for svg
var margin = {
	top: 40,
	right: 20,
	bottom: 85,
	left: 80
}

var width_bar = 500 - margin.left - margin.right
var height_bar = 400 - margin.top - margin.bottom

var x_scale = d3.scale.ordinal()
	.rangeRoundBands([0, width_bar], 0.1);

var y_scale = d3.scale.linear()
	.range([height_bar, 0]);

var x_axis = d3.svg.axis()
	.scale(x_scale)
	.orient("bottom");

var y_axis = d3.svg.axis()
	.scale(y_scale)
	.orient("left")

var tooltip_bar = d3.select("body")
	.append("div")
	.attr("class", "tooltip-bar");

var svg_bar_chart = d3.select("#bar-chart")
	.append("svg")
	.attr("width", width_bar + margin.left + margin.right)
	.attr("height", height_bar + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the agriculture data
d3.csv("data/2010-us-total-population.csv", function(population_data) {

	// set the input domain for the color scale
	color.domain([
		d3.min(population_data, function(d) {	return parseFloat(d.value2010/d.area); }),
		d3.max(population_data, function(d) { return parseFloat(1000); })
		]);

	// load the data file; note path is relative from index.html
	d3.json("data/us-states.json", function(error, json) {

		if (error) { return console.error(error) };	

		// merge the ag. data and geojson
		for (var i = 0; i < population_data.length; i++) {

			// get the state name
			var population_data_state = population_data[i].state;

			// get the data value and convert from string to float
			var population_data_value = parseFloat(population_data[i].value2010);
			var population_data_value2012 = parseFloat(population_data[i].value2012);
			var population_data_value2013 = parseFloat(population_data[i].value2013);
			var population_data_value2014 = parseFloat(population_data[i].value2014);
			var population_data_valuearea = parseFloat(population_data[i].area);

			// find the corresponding state inside the geojson
			for (var j = 0; j < json.features.length; j++) {

				// get the json state name
				var json_data_state = json.features[j].properties.name;

				if (population_data_state === json_data_state) {

					// copy the ag data value into the the json
					json.features[j].properties.value2010 = population_data_value;
					json.features[j].properties.value2012 = population_data_value2012;
					json.features[j].properties.value2013 = population_data_value2013;

					json.features[j].properties.value2014 = population_data_value2014;
					json.features[j].properties.valuearea = population_data_valuearea;



					// stop looking through the geojson
					break;
				}
			}	
		}
		
		// bind the data and create one path for each geojson feature
		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("fill", calculate_color);

		svg.selectAll("path")
			.data(json.features)
			.on("mouseover", function(d) {
				d3.select(this)
					.transition()
					.attr("fill", "orange")
					.attr("stroke-width", 3)





			})
			.on("mouseout", function(d) {
				d3.select(this)
					.transition().duration(500)
					.attr("fill", calculate_color)
					.attr("stroke-width", 1)
					
					 tooltip.style("visibility", "hidden");

          
			})
			.on("click", function(d) {	// display a tooltip
		  		 tooltip.style("visibility", "visible")
		  				.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
		  				.text(d.properties.name + " = " + d.properties.value2010/d.properties.valuearea + " /sq mi");
		  				svg_bar_chart.selectAll(".bar").remove()
					svg_bar_chart.selectAll("g").remove()
d3.csv("data/2010-us-total-population.csv", function(error, data) {

 var state=d.properties.name;
  var data_new;
    for (var i=0;i<data.length;i++)
   {
   	  
   	   data_state=data[i].state;
   	 if(data_state==state)
   	 { 
         console.log(data_state)
   	 	var value2010=data[i].value2010/data[i].area;
   	 	var value2012=data[i].value2012/data[i].area;
   	 	var value2013=data[i].value2013/data[i].area;
   	 	var value2014=data[i].value2014/data[i].area;

       data_new=[value2010,value2012,value2013,value2014];

   }
   }
     var year=["2010","2012","2013","2014"]
     
	x_scale.domain(year.map(function(d) {
		return d;
	}));

	y_scale.domain([value2010-value2010*0.01, d3.max(data_new, function(d) {
		return parseFloat(d);
	})]);

	svg_bar_chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height_bar + ")")
		.call(x_axis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", function(d) {
			return "rotate(-45)";
		})

	svg_bar_chart.append("g")
		.call(y_axis)
		.append("text")
		.attr("x", 150)
		.attr("y", 0)
		.attr("dy", "0.71em")
		.attr("dx", "0em")
		.style("text-anchor", "end")
		.text(state).attr("font-family", "sans-serif")
		.attr("font-size", 20).attr("font-weight",00)
		.attr("fill", "black");
				   

	svg_bar_chart.selectAll(".bar")
		.data(data_new)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d,i) {
			return i * (width_bar / data_new.length);
		})
		.attr("width", x_scale.rangeBand())
		.attr("y", function(d) {
			return y_scale(d);

		})
		.attr("height", function(d) {
			return height_bar - y_scale(d);
		})
		.on("mouseover", function(d) {
			return tooltip_bar.style("visibility", "visible")
		  		.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
				.text(d + " /sq mi")
		})
		.on("mouseout", function(d) {
			return tooltip_bar.style("visibility", "hidden")
		})
       

      


})

    
		  	})
		  	.on("mousemove", function(d) {
		  		tooltip.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px");
		  			tooltip.style("visibility", "visible")
		  				.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
		  				.text(d.properties.name + " = " + d.properties.value2010/d.properties.valuearea + " /sq mi");
		  		 
		  	})
		
	    var legend_data=[0,10,20,50,100,200,500,1000,2000];
	    var i=-1
		var keys = legend.selectAll("li.key")
			.data(color.range())
			
      
		keys.enter().append("li")
			.attr("class", "key")
			.style("border-top-color", String)
			.text(function(d) {
				i=i+1;
				var r = color.invertExtent(d);
				var format = d3.format("0.0f");
				return format(+legend_data[i]) + " - " + format(+legend_data[i+1])+"/sq mi";
			});
		
		
	});
});
