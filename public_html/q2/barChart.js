
var margin = {top:70,right:20,bottom:30,left:50},
    w = 900 - margin.left-margin.right,
    h = 400 - margin.top - margin.bottom;
var x = d3.scale.linear().range([0,w]);
var y = d3.scale.linear().range([h,0]);
//var color = d3.scale.category10();
var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5);