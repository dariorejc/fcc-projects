var express = require('express');
var app = express();

var millisToStr = function(number) {
    var montharray=["January","February","March","April","May","June", "July","August","September","October","November","December"];
    var date = new Date(number * 1000);
    var dateStr = "";
    
    dateStr += montharray[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
    
    return dateStr;
}

app.get('/:time', function (req, res) {
    var str = decodeURIComponent(req.params.time);
    var dateFmt = parseInt(str, 10);
    var date = isNaN(dateFmt) ? new Date(str) : new Date(dateFmt);
    
    if (date.toString() === "Invalid Date") {
        res.send({"unix" : null, "natural" : null});
    } else {
        if (isNaN(str)) {
            res.send({"unix" : date.valueOf(), "natural" : str});
        } else {
            res.send({"unix" : date.valueOf(), "natural" : millisToStr(str)});
        }
        
    }
});

app.listen(8080, function () {
  console.log('Timestamp app listening on port 8080!');
});
