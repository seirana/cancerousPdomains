// ###############################################3
// ###############################################3
// ###############################################3
// ###############################################3
// ###############################################3
// ###############################################3

var margin = {
        top: 5,
        right: 40,
        bottom: 20,
        left: 120
    },
    width = 890 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

var chart = d3.bullet()
    .width(width)
    .height(height);

var div = d3.select("#pcBulletChart").append("div")
    .attr("class", "btooltip")
    .style("opacity", 0);

var pcsvg = d3.select("#pcBulletChart").selectAll("svg")
    .data(pcBullets)
    .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(chart);

var title = pcsvg.append("g")
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + height / 2 + ")");

title.append("text")
    .attr("class", "title")
    .text(function(d) {
        return d.title;
    });

title.append("text")
    .attr("class", "subtitle")
    .attr("dy", "1em")
    .text(function(d) {
        return d.subtitle;
    });

d3.select("#rr").on("click", function() {
    pcsvg.datum(putItem).call(chart.duration(1000)); // TODO automatic transition
});

var newX = "";

function putItem(d) {
    var x = $('#searchinput').val();
    // console.log(newX);
    var xstart = newX["exonStarts,"];
    // console.log(xstart);
    xstart = xstart.split(',');
    var xend = newX["exonEnds,"];
    // console.log(xend);
    xend = xend.split(',');
    // console.log(xend);
    var xendi = 0;
    for (var i = xend.length - 1; i > 0; i--) {
        if (xend[i] != "") {
            xendi = i;
            break;
        }
    }
    var xstarti = 0
    for (var i = 0; i < xstart.length; i++) {
        if (xstart[i] != "") {
            xstarti = i;
            break;
        }
    }
    d.measures = [xstart[xstarti], xend[xendi]];
    pcsvg.selectAll("line.marker").remove().transition().duration(500);
    pcsvg.selectAll("text.title").text(newX["Approved Symbol"]).transition().duration(500);
    d.markers = xend;
    d.strs = xstart;
    return d;
}
