		//D3 CODE
		var margin = {top:70,right :20,bottom:30,left:40},
			w = 1500-margin.left-margin.right,
			h = 500-margin.top-margin.bottom;

		var color = d3.scale.category10();

		var x = d3.scale.ordinal()
			.rangeRoundBands([0,w],.1);

		var y = d3.scale.linear()
			.range([h,0]);

		//var formatPercent = d3.format(".0%");

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5);
		
		var yGrid = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5)
			.tickSize(-w,0,0)
			.tickFormat("");

		var svg = d3.select("body").append("svg")
			.attr("width",w+margin.left+margin.right)
			.attr("height",h+margin.top+margin.bottom)
			.append("g")
			.attr("transform","translate("+margin.left+","+margin.top+")");

		d3.csv("HW_1_Q2.csv",function(error,data){

		x.domain(data.map(function(d){return d.state;}));
		y.domain([0,d3.max(data,function(d){return d.HSGOM})]);

		svg.append("g")
			.attr("class","x axis")
			.attr("transform","translate(0,"+h+")")
			.call(xAxis);

		svg.append("g")
			.attr("class","y axis")
			.call(yAxis);

		svg.append("g")
			.attr("class","grid")
			.call(yGrid);

		var labels = svg.append("g")
			.attr("class","labels");

		labels.append("text")
			.attr("transform","rotate(-90)")
			.attr("y",6)
			.attr("dy",".71em")
			.style("text-anchor","end")
			.text("Percentage [%]");
		
		var title = svg.append("g")
			.attr("class","title");

		title.append("text")
			.attr("x",(w/2))
			.attr("y",-30)
			.attr("text-anchor","middle")
			.style("font-size","22px")
			.text("HOMEWORK1_QUESTION2_HSGOM");
		
		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class","bar")
			.attr("x",function(d) {return x(d.state);})
			.attr("width", x.rangeBand())
			.attr("y",function(d){return y(d.HSGOM);	})
			.attr("height",function(d){return h-y(d.HSGOM);})
			.attr("fill",function(d) {return color(d.country);});
		});