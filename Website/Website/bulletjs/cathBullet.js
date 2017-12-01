// (function() {

//     // Chart design based on the recommendations of Stephen Few. Implementation
//     // based on the work of Clint Ivy, Jamie Love, and Jason Davies.
//     // http://projects.instantcognition.com/protovis/bulletchart/
//     d3.bullet = function() {
//         var orient = "left", // TODO top & bottom
//             reverse = false,
//             duration = 0,
//             ranges = bulletRanges,
//             markers = bulletMarkers,
//             measures = bulletMeasures,
//             strs = bulletStrs,
//             width = 380,
//             height = 30,
//             tickFormat = null;

//         // For each small multiple…
//         function bullet(g) {
//             g.each(function(d, i) {
//                 var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
//                     markerz = markers.call(this, d, i).slice().sort(d3.descending),
//                     measurez = measures.call(this, d, i).slice().sort(d3.descending),
//                     strz = strs.call(this, d, i).slice(),
//                     g = d3.select(this);

//                 // Compute the new x-scale.
//                 var x1 = d3.scale.linear()
//                     // .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
//                     // .domain([100, 300])
//                     .domain([measurez[1], measurez[0]])
//                     .range(reverse ? [width, 0] : [0, width]);

//                 // Retrieve the old x-scale, if this is an update.
//                 var x0 = this.__chart__ || d3.scale.linear()
//                     .domain([0, Infinity])
//                     .range(x1.range());

//                 // Stash the new scale.
//                 this.__chart__ = x1;

//                 // Derive width-scales from the x-scales.
//                 var w0 = bulletWidth(x0),
//                     w1 = bulletWidth(x1);
//                 var w01 = bulletWidth1(x0, measurez[1] + measurez[0]),
//                     w11 = bulletWidth1(x1, measurez[1] + measurez[0]);

//                 // Update the range rects.
//                 var range = g.selectAll("rect.range")
//                     .data(rangez);

//                 range.enter().append("rect")
//                     .attr("fill", "#ddd")
//                     .attr("width", w01)
//                     .attr("height", height)
//                     .attr("x", reverse ? x0 : 0)
//                     .transition()
//                     .duration(duration)
//                     .attr("width", w11)
//                     .attr("x", reverse ? x1 : 0);

//                 range.transition()
//                     .duration(duration)
//                     .attr("x", reverse ? x1 : 0)
//                     .attr("width", w11)
//                     .attr("height", height);


//                 // Update the measure rects.
//                 var measure = g.selectAll("rect.measure")
//                     .data(measurez);

//                 measure.enter().append("rect")
//                     .attr("class", function(d, i) {
//                         return "measure s" + i;
//                     })
//                     .attr("width", w0)
//                     .attr("height", height / 3)
//                     .attr("x", reverse ? x0 : 0)
//                     .attr("y", height / 3)
//                     .transition()
//                     .duration(duration)
//                     .attr("width", w1)
//                     .attr("x", reverse ? x1 : 0);

//                 measure.transition()
//                     .duration(duration)
//                     .attr("width", w1)
//                     .attr("height", height / 3)
//                     .attr("x", reverse ? x1 : 0)
//                     .attr("y", height / 3);

//                 // Update the marker lines.
//                 var marker = g.selectAll("line.marker")
//                     .data(markerz);

//                 marker.enter().append("line")
//                     .attr("class", "marker")
//                     .attr("x1", x0)
//                     .attr("x2", x0)
//                     .attr("y1", height / 6)
//                     .attr("y2", height * 5 / 6)
//                     .transition()
//                     .duration(duration)
//                     .attr("x1", x1)
//                     .attr("x2", x1);

//                 marker.transition()
//                     .duration(duration)
//                     .attr("x1", x1)
//                     .attr("x2", x1)
//                     .attr("y1", height / 6)
//                     .attr("y2", height * 5 / 6);
//                 marker.on("mouseover", function(d, i) {

//                         // if (!(i % 2)) {
//                         div.transition()
//                             .duration(200)
//                             .style("opacity", .9);
//                         div.html(d + " to " + strz[strz.length - 1 - i]);
//                             // div.html(strz[i])
//                             .style("left", d3.mouse(this)[0] + 100 + "px")
//                             .style("top", (d3.event.pageY) - 63 + "px");
//                         // }
//                     })
//                     .on("mouseout", function(d, i) {
//                         if (!(i % 2)) {
//                             div.transition()
//                                 .duration(500)
//                                 .style("opacity", 0);
//                         }
//                     });
//                 // Compute the tick format.
//                 var format = tickFormat || x1.tickFormat(8);

//                 // Update the tick groups.
//                 var tick = g.selectAll("g.tick")
//                     .data(x1.ticks(8), function(d) {
//                         return this.textContent || format(d);
//                     });

//                 // Initialize the ticks with the old scale, x0.
//                 var tickEnter = tick.enter().append("g")
//                     .attr("class", "tick")
//                     .attr("transform", bulletTranslate(x0))
//                     .style("opacity", 1e-6);

//                 tickEnter.append("line")
//                     .attr("y1", height)
//                     .attr("y2", height * 7 / 6);

//                 tickEnter.append("text")
//                     .attr("text-anchor", "middle")
//                     .attr("dy", "1em")
//                     .attr("y", height * 7 / 6)
//                     .text(format);

//                 // Transition the entering ticks to the new scale, x1.
//                 tickEnter.transition()
//                     .duration(duration)
//                     .attr("transform", bulletTranslate(x1))
//                     .style("opacity", 1);

//                 // Transition the updating ticks to the new scale, x1.
//                 var tickUpdate = tick.transition()
//                     .duration(duration)
//                     .attr("transform", bulletTranslate(x1))
//                     .style("opacity", 1);

//                 tickUpdate.select("line")
//                     .attr("y1", height)
//                     .attr("y2", height * 7 / 6);

//                 tickUpdate.select("text")
//                     .attr("y", height * 7 / 6);

//                 // Transition the exiting ticks to the new scale, x1.
//                 tick.exit().transition()
//                     .duration(duration)
//                     .attr("transform", bulletTranslate(x1))
//                     .style("opacity", 1e-6)
//                     .remove();
//             });
//             d3.timer.flush();
//         }

//         // left, right, top, bottom
//         bullet.orient = function(x) {
//             if (!arguments.length) return orient;
//             orient = x;
//             reverse = orient == "right" || orient == "bottom";
//             return bullet;
//         };

//         // ranges (bad, satisfactory, good)
//         bullet.ranges = function(x) {
//             if (!arguments.length) return ranges;
//             ranges = x;
//             return bullet;
//         };

//         // markers (previous, goal)
//         bullet.markers = function(x) {
//             if (!arguments.length) return markers;
//             markers = x;
//             return bullet;
//         };

//         // measures (actual, forecast)
//         bullet.measures = function(x) {
//             if (!arguments.length) return measures;
//             measures = x;
//             return bullet;
//         };

//         bullet.width = function(x) {
//             if (!arguments.length) return width;
//             width = x;
//             return bullet;
//         };

//         bullet.height = function(x) {
//             if (!arguments.length) return height;
//             height = x;
//             return bullet;
//         };

//         bullet.tickFormat = function(x) {
//             if (!arguments.length) return tickFormat;
//             tickFormat = x;
//             return bullet;
//         };

//         bullet.duration = function(x) {
//             if (!arguments.length) return duration;
//             duration = x;
//             return bullet;
//         };

//         return bullet;
//     };



//     function bulletStrs(d) {
//         return d.strs;
//     }

//     function bulletRanges(d) {
//         return d.ranges;
//     }

//     function bulletMarkers(d) {
//         return d.markers;
//     }

//     function bulletMeasures(d) {
//         return d.measures;
//     }

//     function bulletTranslate(x) {
//         return function(d) {
//             return "translate(" + x(d) + ",0)";
//         };
//     }

//     function bulletWidth(x) {
//         var x0 = x(0);
//         return function(d) {
//             return Math.abs(x(d) - x0);
//         };
//     }

//     function bulletWidth1(x, distance) {
//         var x0 = x(0) + distance;
//         return function(d) {
//             return Math.abs(x(d) - x0);
//         };
//     }
// })();


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

var chart3 = d3.bullet()
    .width(width)
    .height(height);

var div = d3.select("#cathBulletChart").append("div")
    .attr("class", "btooltip")
    .style("opacity", 0);

var svg3 = d3.select("#cathBulletChart").selectAll("svg")
    .data(cathbullets)
    .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(chart3);

var title = svg3.append("g")
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

d3.select("#ww").on("click", function() {
    svg3.datum(putItem3).call(chart3.duration(1000)); // TODO automatic transition
});

var newX = "";

function putItem3(d) {
    var caths = newX["CATH,"];
    caths = caths.split(',');
    caths = caths.filter(Boolean);
    var mend = Math.floor(newX['Length'] / 3) + 1;
    var strs = [];
    var dict = {};
    for (var i = 0; i < caths.length; i++) {
        if (i % 3 == 0) {
            dict[i] = { 'name': caths[i], 'start': parseInt(caths[i + 1], 10), 'end': parseInt(caths[i + 2], 10) };
            caths[i] = "";
        }
    }
    caths = caths.filter(Boolean);
    var sortable = [];
    for (var obj in dict)
        sortable.push([obj, dict[obj]['start'], dict[obj]['end'], dict[obj]['name']]);
    sortable.sort(function(a, b) {
            return a[1] - b[1] })
        // console.log(sortable);
    var rng = []
    for (var i = 0; i < sortable.length; i++) {
        if (i > 0 && rng[rng.length - 1] > sortable[i][1]) {
            // strs[strs.length-1] = strs[strs.length-1] + ", " + sortable[i][3];
            strs[strs.length - 1] = strs[strs.length - 1] + ", <br>" + sortable[i][3] + ' :<br>' + sortable[i][1] + ' to ' + sortable[i][2];
            rng[rng.length - 1] = sortable[i][2];
        } else {
            rng.push(sortable[i][1]);
            rng.push(sortable[i][2]);
            strs.push(sortable[i][3] + ' :<br>' + sortable[i][1] + ' to ' + sortable[i][2]);
            // strs.push(sortable[i][3]);
        }
    }
    // console.log(rng);
    svg3.selectAll("rect.range").remove().transition().duration(500);
    svg3.selectAll("rect.measure").remove().transition().duration(500);
    d.measures = [0, mend];
    d.ranges = rng;
    d.strs = strs;
    svg3.selectAll("text.title").text(newX["UniProt ID"]).transition().duration(500);
    return d;
}
