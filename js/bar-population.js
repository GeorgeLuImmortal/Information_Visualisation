// set margins for svg
var margin = {
	top: 40,
	right: 20,
	bottom: 85,
	left: 80
}

var width_bar2 = 1200 - margin.left - margin.right
var height_bar2 = 300 - margin.top - margin.bottom

var x_scale2 = d3.scale.ordinal()
	.rangeRoundBands([0, width_bar2], 0.1);

var y_scale2 = d3.scale.linear()
	.range([height_bar2, 0]);

var x_axis2 = d3.svg.axis()
	.scale(x_scale2)
	.orient("bottom");

var y_axis2 = d3.svg.axis()
	.scale(y_scale2)
	.orient("left")

var tooltip_bar = d3.select("body")
	.append("div")
	.attr("class", "tooltip-bar");

var svg_bar_chart2 = d3.select("#globalbar")
	.append("svg")
	.attr("width", width_bar2 + margin.left + margin.right)
	.attr("height", height_bar2 + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/2010-us-total-population.csv", function(error, data) {

   	svg_bar_chart.selectAll(".bar").remove();
	svg_bar_chart.selectAll("g").remove();
	var value2010 = [];
	var value2012 = [];
	var value2013 = [];
	var value2014 = [];

	for(var i=0;i<data.length;i++)
	{
      value2010.concat(data[i].value2010)
      value2012.concat(data[i].value2012)
      value2013.concat(data[i].value2013)
      value2014.concat(data[i].value2014)
	}

	x_scale2.domain(data.map(function(d) {
		return d.state;
	}));

	y_scale2.domain([0, d3.max(data, function(d) {
		return parseFloat(d.value2010);
	})]);

	svg_bar_chart2.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height_bar2 + ")")
		.call(x_axis2)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", function(d) {
			return "rotate(-45)";
		})

	svg_bar_chart2.append("g")
		.call(y_axis2)
		.append("text")
		.attr("y", 0)
		.attr("x", 1000)
		.attr("dy", "0.71em")
		.attr("dx", "-4em")
		.style("text-anchor", "end")
		.text("2010").attr("font-family", "sans-serif")
		.attr("font-size", 40).attr("font-weight",700)
		.attr("fill", "black");
				   

	svg_bar_chart2.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
			return x_scale2(d.state);
		})
		.attr("width", x_scale2.rangeBand())
		.attr("y", function(d) {
			return y_scale2(d.value2010);
		})
		.attr("height", function(d) {
			return height_bar2 - y_scale2(d.value2010);
		})
		.on("mouseover", function(d) {
			return tooltip_bar.style("visibility", "visible")
		  		.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
				.text(d.value2010 + " population")
		})
		.on("mouseout", function(d) {
			return tooltip_bar.style("visibility", "hidden")
		})

	d3.select("input").on("change", change);

	function change() {
		// if the value2010 of the input checkbox is checked, then x_scale.domain is sorted by highest to lowest value2010s, otherwise it is sorted alphabetically as original data
		var x_scale_0 = x_scale2.domain(data.sort(this.checked
			? function(a, b) { return b.value2010 - a.value2010; }
			: function(a, b) { return d3.ascending(a.state, b.state); })
			.map(function(d) {return d.state;} ))
			.copy();

		var transition = svg_bar_chart2.transition().duration(750),
			delay = function(d, i) {return i * 50; };

		transition.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) { return x_scale_0(d.state); });

		transition.select(".x.axis")
			.attr("transform", "translate(0," + height_bar2 + ")")
			.call(x_axis2)
			.selectAll("g")
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("transform", function(d) {
				return "rotate(-45)";
			})
			.delay(delay);
	}
})
 function valuechange2010()
 {

 	svg_bar_chart2.selectAll(".bar").remove()
	svg_bar_chart2.selectAll("g").remove()
 	d3.csv("data/2010-us-total-population.csv", function(error, data) {

	x_scale2.domain(data.map(function(d) {
		return d.state;
	}));

	y_scale2.domain([0, d3.max(data, function(d) {
		return parseFloat(d.value2010);
	})]);

	svg_bar_chart2.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height_bar2 + ")")
		.call(x_axis2)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", function(d) {
			return "rotate(-45)";
		})

	svg_bar_chart2.append("g")
		.call(y_axis2)
		.append("text")
		.attr("y", 0)
		.attr("x", 1000)
		.attr("dy", "0.71em")
		.attr("dx", "-4em")
		.style("text-anchor", "end")
		.text("2010").attr("font-family", "sans-serif")
		.attr("font-size", 40).attr("font-weight",700)
		.attr("fill", "black");
				   

	svg_bar_chart2.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
			return x_scale2(d.state);
		})
		.attr("width", x_scale2.rangeBand())
		.attr("y", function(d) {
			return y_scale2(d.value2010);
		})
		.attr("height", function(d) {
			return height_bar2 - y_scale2(d.value2010);
		})
		.on("mouseover", function(d) {
			return tooltip_bar.style("visibility", "visible")
		  		.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
				.text(d.value2010 + " population")
		})
		.on("mouseout", function(d) {
			return tooltip_bar.style("visibility", "hidden")
		})

	d3.select("input").on("change", change);
    var obj = document.getElementById("sort")
    obj.checked=false;

	function change() {
		// if the value2010 of the input checkbox is checked, then x_scale.domain is sorted by highest to lowest value2010s, otherwise it is sorted alphabetically as original data
		var x_scale_0 = x_scale2.domain(data.sort(this.checked
			? function(a, b) { return b.value2010 - a.value2010; }
			: function(a, b) { return d3.ascending(a.state, b.state); })
			.map(function(d) {return d.state;} ))
			.copy();

		var transition = svg_bar_chart2.transition().duration(750),
			delay = function(d, i) {return i * 50; };

		transition.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) { return x_scale_0(d.state); });

		transition.select(".x.axis")
			.attr("transform", "translate(0," + height_bar2 + ")")
			.call(x_axis2)
			.selectAll("g")
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("transform", function(d) {
				return "rotate(-45)";
			})
			.delay(delay);
	}
})
 }
function valuechange2012()
 {
 	
 	svg_bar_chart2.selectAll(".bar").remove()
	svg_bar_chart2.selectAll("g").remove()
 	d3.csv("data/2010-us-total-population.csv", function(error, data) {

	x_scale2.domain(data.map(function(d) {
		return d.state;
	}));

	y_scale2.domain([0, d3.max(data, function(d) {
		return parseFloat(d.value2012);
	})]);

	svg_bar_chart2.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height_bar2 + ")")
		.call(x_axis2)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", function(d) {
			return "rotate(-45)";
		})
svg_bar_chart2.append("g")
		.call(y_axis2)
		.append("text")
		.attr("y", 0)
		.attr("x", 1000)
		.attr("dy", "0.71em")
		.attr("dx", "-4em")
		.style("text-anchor", "end")
		.text("2012").attr("font-family", "sans-serif")
		.attr("font-size", 40).attr("font-weight",700)
		.attr("fill", "black");
				   

	svg_bar_chart2.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
			return x_scale2(d.state);
		})
		.attr("width", x_scale2.rangeBand())
		.attr("y", function(d) {
			return y_scale2(d.value2012);
		})
		.attr("height", function(d) {
			return height_bar2 - y_scale2(d.value2012);
		})
		.on("mouseover", function(d) {
			return tooltip_bar.style("visibility", "visible")
		  		.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
				.text(d.value2012 + " population")
		})
		.on("mouseout", function(d) {
			return tooltip_bar.style("visibility", "hidden")
		})
 
	d3.select("input").on("change", change);
  var obj = document.getElementById("sort")
    obj.checked=false;


	function change() {
		// if the value2010 of the input checkbox is checked, then x_scale.domain is sorted by highest to lowest value2010s, otherwise it is sorted alphabetically as original data
		var x_scale_0 = x_scale2.domain(data.sort(this.checked
			? function(a, b) { return b.value2012 - a.value2012; }
			: function(a, b) { return d3.ascending(a.state, b.state); })
			.map(function(d) {return d.state;} ))
			.copy();

		var transition = svg_bar_chart2.transition().duration(750),
			delay = function(d, i) {return i * 50; };

		transition.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) { return x_scale_0(d.state); });

		transition.select(".x.axis")
			.attr("transform", "translate(0," + height_bar2 + ")")
			.call(x_axis2)
			.selectAll("g")
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("transform", function(d) {
				return "rotate(-45)";
			})
			.delay(delay);
	}
})
 }
 function valuechange2013()
 {
 	
 	svg_bar_chart2.selectAll(".bar").remove()
	svg_bar_chart2.selectAll("g").remove()
 	d3.csv("data/2010-us-total-population.csv", function(error, data) {

	x_scale2.domain(data.map(function(d) {
		return d.state;
	}));

	y_scale2.domain([0, d3.max(data, function(d) {
		return parseFloat(d.value2013);
	})]);

	svg_bar_chart2.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height_bar2 + ")")
		.call(x_axis2)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", function(d) {
			return "rotate(-45)";
		})

svg_bar_chart2.append("g")
		.call(y_axis2)
		.append("text")
		.attr("y", 0)
		.attr("x", 1000)
		.attr("dy", "0.71em")
		.attr("dx", "-4em")
		.style("text-anchor", "end")
		.text("2013").attr("font-family", "sans-serif")
		.attr("font-size", 40).attr("font-weight",700)
		.attr("fill", "black");
				   

	svg_bar_chart2.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
			return x_scale2(d.state);
		})
		.attr("width", x_scale2.rangeBand())
		.attr("y", function(d) {
			return y_scale2(d.value2013);
		})
		.attr("height", function(d) {
			return height_bar2 - y_scale2(d.value2013);
		})
		.on("mouseover", function(d) {
			return tooltip_bar.style("visibility", "visible")
		  		.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
				.text(d.value2013 + " population")
		})
		.on("mouseout", function(d) {
			return tooltip_bar.style("visibility", "hidden")
		})

	d3.select("input").on("change", change);
  var obj = document.getElementById("sort")
    obj.checked=false;

	function change() {
		// if the value2010 of the input checkbox is checked, then x_scale.domain is sorted by highest to lowest value2010s, otherwise it is sorted alphabetically as original data
		var x_scale_0 = x_scale2.domain(data.sort(this.checked
			? function(a, b) { return b.value2013 - a.value2013; }
			: function(a, b) { return d3.ascending(a.state, b.state); })
			.map(function(d) {return d.state;} ))
			.copy();

		var transition = svg_bar_chart2.transition().duration(750),
			delay = function(d, i) {return i * 50; };

		transition.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) { return x_scale_0(d.state); });

		transition.select(".x.axis")
			.attr("transform", "translate(0," + height_bar2 + ")")
			.call(x_axis2)
			.selectAll("g")
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("transform", function(d) {
				return "rotate(-45)";
			})
			.delay(delay);
	}
})
 }
 function valuechange2014()
 {
 	
 	svg_bar_chart2.selectAll(".bar").remove()
	svg_bar_chart2.selectAll("g").remove()
 	d3.csv("data/2010-us-total-population.csv", function(error, data) {

	x_scale2.domain(data.map(function(d) {
		return d.state;
	}));

	y_scale2.domain([0, d3.max(data, function(d) {
		return parseFloat(d.value2014);
	})]);

	svg_bar_chart2.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height_bar2 + ")")
		.call(x_axis2)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", function(d) {
			return "rotate(-45)";
		})
svg_bar_chart2.append("g")
		.call(y_axis2)
		.append("text")
		.attr("y", 0)
		.attr("x", 1000)
		.attr("dy", "0.71em")
		.attr("dx", "-4em")
		.style("text-anchor", "end")
		.text("2014").attr("font-family", "sans-serif")
		.attr("font-size", 40).attr("font-weight",700)
		.attr("fill", "black");
				   

	svg_bar_chart2.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
			return x_scale2(d.state);
		})
		.attr("width", x_scale2.rangeBand())
		.attr("y", function(d) {
			return y_scale2(d.value2014);
		})
		.attr("height", function(d) {
			return height_bar2 - y_scale2(d.value2014);
		})
		.on("mouseover", function(d) {
			return tooltip_bar.style("visibility", "visible")
		  		.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px")
				.text(d.value2014 + " population")
		})
		.on("mouseout", function(d) {
			return tooltip_bar.style("visibility", "hidden")
		})

	d3.select("input").on("change", change);
  var obj = document.getElementById("sort")
    obj.checked=false;

	function change() {
		// if the value2010 of the input checkbox is checked, then x_scale.domain is sorted by highest to lowest value2010s, otherwise it is sorted alphabetically as original data
		var x_scale_0 = x_scale2.domain(data.sort(this.checked
			? function(a, b) { return b.value2014 - a.value2014; }
			: function(a, b) { return d3.ascending(a.state, b.state); })
			.map(function(d) {return d.state;} ))
			.copy();

		var transition = svg_bar_chart2.transition().duration(750),
			delay = function(d, i) {return i * 50; };

		transition.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) { return x_scale_0(d.state); });

		transition.select(".x.axis")
			.attr("transform", "translate(0," + height_bar2 + ")")
			.call(x_axis2)
			.selectAll("g")
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("transform", function(d) {
				return "rotate(-45)";
			})
			.delay(delay);
	}
})
 }