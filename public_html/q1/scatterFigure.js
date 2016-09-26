/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#return").click(function(){
    self.location= "../index.html";
});

var margin = {top:70,right:20,bottom:30,left:50},
    w = 400 - margin.left-margin.right,
    h = 400 - margin.top - margin.bottom;
var x = d3.scale.linear().range([0,w]);
var y = d3.scale.linear().range([h,0]);
var color = d3.scale.category10();

var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5);

var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

var xGrid = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
        .tickSize(-h,0,0)
        .tickFormat("");

var yGrid = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-w,0,0)
        .tickFormat("");

var svg = d3.select("body").append("svg")
        .attr("width",w + margin.left+margin.right)
        .attr("height",h+margin.top+margin.bottom)
        .append("g")
        .attr("transform","translate("+ margin.left +","+margin.top+")");

var line = d3.svg.line()
        .x(function(d){return x(d.Date);})
        .y(function(d){return y(d.attendee);});

d3.csv("test_vi_hw1.csv",function(error,data){
//    data.forEach(function(d){
//        console.log(d);
//    });

    //get the attributes name of each line
    color.domain(d3.keys(data[1]).filter(function(key){
            return key !=="Date";
    }));

    var continents  = color.domain().map(function(name){
        return{
            name: name,
            values: data.map(function(d){
                return {Date: d.Date,attendee: +d[name]};
            })
        };
    });
    console.log(continents);

    x.domain(d3.extent(data,function(d){return d.Date;}));
    y.domain([
        d3.min(continents,function(c){
                return d3.min(c.values,function(v){return v.attendee;});
        }),
        d3.max(continents,function(c){
                return d3.max(c.values,function(v){return v.attendee;})
        })
    ]);
//    console.log(x.domain());
//    console.log(y);
    svg.selectAll(".dot1")
            .data(data)
            .enter().append("circle")
            .attr("class","dot1")
            .attr("r",3.5)
            .attr("cx",function(d) {return x(d.Date);})
            .attr("cy",function(d) {return y(d.ADOM);});

    svg.selectAll(".dot2")
            .data(data)
            .enter().append("circle")
            .attr("class","dot2")
            .attr("r",3.5)
            .attr("cx",function(d) {return x(d.Date);})
            .attr("cy",function(d) {return y(d.BDOM);});

    svg.selectAll(".dot3")
            .data(data)
            .enter().append("circle")
            .attr("class","dot3")
            .attr("r",3.5)
            .attr("cx",function(d) {return x(d.Date);})
            .attr("cy",function(d) {return y(d.HSGOM);});

    svg.append("g")
            .attr("class","x axis")
            .attr("transform","translate(0,"+h+")")
            .call(xAxis);
    svg.append("g")
            .attr("class","y axis")
            .call(yAxis);
    svg.append("g")
            .attr("class","grid")
            .attr("transform","translate(0,"+h+")")
            .call(xGrid);
    svg.append("g")
            .attr("class","grid")
            .call(yGrid);

    var continent = svg.selectAll(".continent")
            .data(continents)
            .enter().append("g")
            .attr("class","continent");

    continent.append("path")
            .attr("class","line")					
            .attr("d",function(d) {return line(d.values);})
            .style("stroke",function(d) {return color(d.name);});

    console.log(color.domain().slice());
    var legend = svg.selectAll(".legend")
           .data(color.domain())
           .enter().append("g")
           .attr("class","legend")
           .attr("transform",function(d,i){return "translate(0,"+i*20+")";});

    legend.append("rect")
           .attr("x",w-18)
           .attr("y",4)
           .attr("width",10)
           .attr("height",10)
           .style("fill",color);

    legend.append("text")
           .attr("x",w-24)
           .attr("y",9)
           .attr("dy",".35em")
           .style("text-anchor","end")
           .text(function(d){return d;});

});

var labels = svg.append("g")
        .attr("class","labels");

labels.append("text")
        .attr("transform","translate(0,"+h+")")
        .attr("x",(w-margin.right))
        .attr("dx","1.90em")
        .attr("dy","2.0em")
        .text("Year");
labels.append("text")
        .attr("transform","rotate(-90)")
        .attr("y",-40)
        .attr("dy",".71em")
        .style("text-anchor","end")
        .text("Percentage");

var title = svg.append("g")
        .attr("class","title");

title.append("text")
        .attr("x",(w/2))
        .attr("y",-30)
        .attr("text-anchor","middle")
        .style("font-size","22px")
        .text("Question_1");

