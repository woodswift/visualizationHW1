ds.select

/* 
 * Read Csv File
 */
var hs;
var bd;
var ad;
d3.csv("q1.csv",function(error,csvdata){
    hs = [csvdata[0]]; 
    bd = [csvdata[1]];
    ad = [csvdata[2]];
});  


