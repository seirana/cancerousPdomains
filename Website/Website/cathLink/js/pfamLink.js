var cancers = ["Cancer Type", "BRCA", "COAD", "GBM", "KIRC", "KIRP", "LGG", "LUAD", "OV", "UCEC", "ACC", "BLCA", "CHOL", "ESCA", "HNSC", "KICH", "LIHC", "LUSC", "PAAD", "PCPG", "PRAD", "READ", "SARC", "SKCM", "STAD", "TGCT", "THCA", "THYM", "UCS", "UVM", "Pan Cancer"]
var diameter = 1000,
    // var diameter = window.innerWidth,
    radius = diameter / 2,
    innerRadius = radius - 120;

var cluster = d3.layout.cluster()
    .size([9600, 100])
    .sort(null)
    .value(function(d) {
        return d.size;
    });

var bundle = d3.layout.bundle();

// var line = d3.svg.line.radial()
//     .interpolate("bundle")
//     .tension(.85)
//     .radius(function(d) {
//         return d.y;
//     })
//     .angle(function(d) {
//         return d.x / 180 * Math.PI;
//     });
var margin = { top: -5, right: -5, bottom: -5, left: -5 },
    width = 1260 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

function zoomed() {
    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


var ssvg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
    .call(zoom);


var rect = ssvg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "#111")
    .style("pointer-events", "all");


var container = ssvg.append("g");

// var svg = d3.select("#chart").append("svg")
var svg = container.append("svg")
    .attr("width", 2400)
    .attr("height", 750)
    .append("g")
    .attr("transform", "translate(20,0)");
// .attr("transform", "translate(" + radius + "," + radius + ")");




var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");


var nodes = cluster.nodes(packageHierarchy(pfamLink));
var links = packageImports(nodes);


// .attr("d", line);

node = node
    .data(nodes.filter(function(n) {
        return !n.children;
    }))
    .enter().append("text")
    .attr("class", "node")
    .attr("dx", function(d) {
        return 10;
    })
    .attr("dy", ".31em")
    .attr("transform", function(d) {

        // console.log('BRCA' in cancers);
        if (cancers.indexOf(d.key) > -1) {
            d.x = d.x + 150;
            return "translate(" + d.y + "," + d.x + ")";
        } else {
            d.y = d.y + 400;
            while (d.x > 650) {
                d.y = d.y + 100;
                d.x = d.x - 550;
            }
            d.x = d.x - 70;
            return "translate(" + d.y + "," + d.x + ")";
        }
    })
    .style("text-anchor", function(d) {
        if (cancers.indexOf(d.key) > -1) {
            // return "start";
            return "end";
        } else
            return "end";
    })
    .text(function(d) {
        return d.key;
    })
    .on("mouseover", mouseovered)
    .on("mouseout", mouseouted);
// .attr("transform", function(d) {
//     return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" + (d.x < 180 ? "" : "rotate(180)");
// })
//});

node.append("circle")
    .attr("r", 2.5);

link = link
    .data(bundle(links.filter(function(n) {
        return (cancers.indexOf(n.source.key) > -1);
    })))
    .enter().append("path")
    .each(function(d) {
        d.source = d[0], d.target = d[d.length - 1];
    })
    .attr("class", "link")
    .attr("d", function(d) {
        return "M" + d.source.y + "," + d.source.x + "C" + (d.target.y) + "," + d.source.x + " " + (d.target.y + 100) + "," + d.target.x + " " + d.target.y + "," + d.target.x;
    });

function mouseovered(d) {
    node
        .each(function(n) {
            n.target = n.source = false;
        });

    link
        .classed("link--target", function(l) {
            if (l.target === d) return l.source.source = true;
        })
        .classed("link--source", function(l) {
            if (l.source === d) return l.target.target = true;
        })
        .filter(function(l) {
            return l.target === d || l.source === d;
        })
        .each(function() {
            this.parentNode.appendChild(this);
        });

    node
        .classed("node--target", function(n) {
            return n.target;
        })
        .classed("node--source", function(n) {
            return n.source;
        });
}

function mouseouted(d) {
    link
        .classed("link--target", false)
        .classed("link--source", false);

    node
        .classed("node--target", false)
        .classed("node--source", false);
}

d3.select(self.frameElement).style("height", diameter + "px");

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
    var map = {};

    function find(name, data) {
        var node = map[name],
            i;
        if (!node) {
            node = map[name] = data || {
                name: name,
                children: []
            };
            if (name.length) {
                // i = name.lastIndexOf("/");
                i = 0;
                // node.parent = find(name.substring(0, i = name)); //.lastIndexOf("/")
                if (i > -1) {
                    node.parent = find(name.substring(0, i));
                    node.parent.children.push(node);
                    // node.key = name.substring(i + 1);
                    node.key = name;
                } else

                {
                    node.parent = null;
                }
            }
        }
        return node;
    }

    classes.forEach(function(d) {
        if (typeof d.children === 'undefined') {
            d.children = [];
        }
        find(d.name, d);
    });

    return map[""];
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
    var map = {},
        imports = [];

    // Compute a map from name to node.
    nodes.forEach(function(d) {
        map[d.name] = d;
    });

    // For each import, construct a link from the source to target node.
    nodes.forEach(function(d) {
        if (d.imports) d.imports.forEach(function(i) {
            if (i in map) {
                imports.push({
                    source: map[d.name],
                    target: map[i]
                });
            }
        });
    });

    return imports;
}
