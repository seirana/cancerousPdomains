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
    width = 925 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

var chart2 = d3.bullet()
    .width(width)
    .height(height);

var div = d3.select("#pfamBulletChart").append("div")
    .attr("class", "btooltip")
    .style("opacity", 0);

var svg2 = d3.select("#pfamBulletChart").selectAll("svg")
    .data(pfambullets)
    .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(chart2);

var title = svg2.append("g")
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

d3.select("#ee").on("click", function() {
    svg2.datum(putItem2).call(chart2.duration(1000)); // TODO automatic transition
});

var newX = "";

function putItem2(d) {
    var pfams = newX["pfam,"];
    pfams = pfams.split(',');
    pfams = pfams.filter(Boolean);
    var mend = Math.floor(newX['Length'] / 3) + 1;
    var strs = [];
    var dict = {};
    for (var i = 0; i < pfams.length; i++) {
        if (i % 3 == 0) {
            dict[i] = { 'name': pfams[i], 'start': parseInt(pfams[i + 1], 10), 'end': parseInt(pfams[i + 2], 10) };
            pfams[i] = "";
        }
    }
    pfams = pfams.filter(Boolean);
    var sortable = [];
    for (var obj in dict)
        sortable.push([obj, dict[obj]['start'], dict[obj]['end'], dict[obj]['name']]);
    sortable.sort(function(a, b) {
        return a[1] - b[1] })
    var rng = []
    for (var i = 0; i < sortable.length; i++) {
        if (i > 0 && rng[rng.length - 1] > sortable[i][1]) {
            strs[strs.length - 1] = strs[strs.length - 1] + ", <br>" + sortable[i][3] + ' :<br>' + sortable[i][1] + ' to ' + sortable[i][2];
            rng[rng.length - 1] = sortable[i][2];
        } else {
            rng.push(sortable[i][1]);
            rng.push(sortable[i][2]);
            strs.push(sortable[i][3] + ' :<br>' + sortable[i][1] + ' to ' + sortable[i][2]);
        }
    }
    svg2.selectAll("rect.range").remove().transition().duration(500);
    svg2.selectAll("rect.measure").remove().transition().duration(500);
    d.measures = [0, mend];
    d.ranges = rng;
    d.strs = strs;
    svg2.selectAll("text.title").text(newX["UniProt ID"]).transition().duration(500);
    return d;
}
