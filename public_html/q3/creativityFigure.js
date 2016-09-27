function creativityFigure(dataName){
    var color = d3.scale.category10();
    var margin = {top:70,right:20,bottom:30,left:40},
        w = 1500-margin.left-margin.right,
        h = 500-margin.top-margin.bottom;

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

    d3.csv(dataName,function(data){
        color.domain(d3.keys(data[0]).filter(function(key){
            return key !=="state";
        }));
        var sum = 0;
        data.forEach(function(d){
            sum = d.HSGOM;
            hig = d.HSGOM - d.BDOM;
            mid = d.BDOM -d.ADOM;
            sma = d.ADOM - 0;
            var y0 = 0;
            var i = -1;
            d.states = color.domain().map(function(name){
                    i++;
                    var list = [sma,mid,hig];
                    return{ name:name, 
                            y0:y0/sum,
                            y1: (y0 += list[i])/sum,
                            sum:sum,
                            val:list[i],
                            state: d.state
                        };	
            });
        });
        x.domain(data.map(function(d){return d.state;}));
        y.domain([0,d3.max(data,function(d) {return d.HSGOM;})]);

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

        var state = svg.selectAll(".country")
                .data(data)
                .enter().append("g")
                .attr("class","country")
                .attr("transform",function(d){
                    return "translate(" + x(d.state) +",0)";
                });

        state.selectAll("rect")
                .data(function(d){return d.states;})
                .enter().append("rect")
                .attr("width",x.rangeBand())
                .attr("val",function(d){return x(d.state);})
                .attr("y",function(d){return (y(d.y1*d.sum));})
                .attr("height",function(d){return ((y(d.y0)-y(d.y1))*d.sum);})
                .style("fill",function(d) {return color(d.name);})
                .on("mouseover", function(d){
                    var color = $(this).css("fill");
                    $(this).css("fill","yellow");
                    $("rect").mouseout(function(){
                        $(this).css("fill",color);
                        $(this).unbind("mouseout");
                    });
                    
                    //Get this bar's x/y values, then augment for the tooltip
                    var xPosition = parseFloat($(this).attr("val")) + x.rangeBand() / 2;
                    var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
//                    console.log(xPosition);
                    //Update the tooltip position and value
                    d3.select("#tooltip")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + "px")						
                        .select("#value")
                        .text(d.val);
                    d3.select("#label").text(d.name);
                    //Show the tooltip
                    d3.select("#tooltip").classed("hidden", false);
                })
                .on("mouseout", function() {		   
                    //Hide the tooltip
                    d3.select("#tooltip").classed("hidden", true);
                 });

        var legend = svg.selectAll(".legend")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("class","legend")
                .attr("transform",function(d,i){
                return "translate("+(i*65-150)+",-10)";});

        legend.append("rect")
                .attr("x",w-18)
                .attr("y",-1)
                .attr("width",10)
                .attr("height",10)
                .style("fill",color);

        legend.append("text")
                .attr("x",w-24)
                .attr("y",4)
                .attr("dy",".35em")
                .style("text-anchor","end")
                .text(function(d){return d;});
    });

    var labels = svg.append("g")
            .attr("class","labels");

    labels.append("text")
            .attr("transform","rotate(-90)")
            .attr("y",6)
            .attr("dy",".71em")
            .style("text-anchor","end")
            .text("Percentage[%]");

    var title = svg.append("g")
            .attr("class","title")

    title.append("text")
            .attr("x",(w/2))
            .attr("y",-30)
            .attr("text-anchor","middle")
            .style("font-size","22px")
            .text("Homework_1_Question_3");
    return;
}

var year = $("#year").val();
creativityFigure("HW_1_Q3_"+year+".csv");
$("#year").change(function(){
    year = $("#year").val();
    $("svg").remove();
    creativityFigure("HW_1_Q3_"+year+".csv");
});

$("#return").click(function(){
    self.location= "../index.html";
});
