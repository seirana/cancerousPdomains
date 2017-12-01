var cancers = ["Cancer Type", "BRCA", "COAD", "GBM", "KIRC", "KIRP", "LGG", "LUAD", "OV", "UCEC", "ACC", "BLCA", "CHOL", "ESCA", "HNSC", "KICH", "LIHC", "LUSC", "PAAD", "PCPG", "PRAD", "READ", "SARC", "SKCM", "STAD", "TGCT", "THCA", "THYM", "UCS", "UVM", "Pan Cancer"]
var diameter = 1500,
    // var diameter = window.innerWidth,
    radius = diameter / 2,
    innerRadius = radius - 120;

var cluster = d3.layout.cluster()
    .size([360, innerRadius])
    .sort(null)
    .value(function(d) {
        return d.size;
    });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(.85)
    .radius(function(d) {
        return d.y;
    })
    .angle(function(d) {
        return d.x / 180 * Math.PI;
    });

var margin = { top: -5, right: -5, bottom: -5, left: -5 },
    width = 1260 - margin.left - margin.right,
    height = 1300 - margin.top - margin.bottom;

var zoom = d3.behavior.zoom().scaleExtent([.3, 10])
    .on("zoom", zoomed);

function zoomed() {
    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


var ssvg = d3.select("#chart").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
    .call(zoom);


var rect = ssvg.append("rect")
    // .attr("width", width)
    .attr("width", "100%")
    // .attr("height", height)
    .attr("height", "100%")
    .style("fill", "#111")
    .style("pointer-events", "all");


var container = ssvg.append("g");


// var svg = d3.select("#chart").append("svg")
var svg = container.append("svg")
    .attr("width", diameter + 1000)
    .attr("height", diameter + 1000)
    // .attr("width", "100%")
    // .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(" + 1000 + "," + 1000 + ")");

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");


var nodes = cluster.nodes(packageHierarchy(pfamLink));
var links = packageImports(nodes);


node = node
    .data(nodes.filter(function(n) {
        return !n.children;
    }))
    .enter().append("text")
    .attr("class", "node")
    .attr("dx", function(d) {
        if (cancers.indexOf(d.key) > -1) {
            d.x = d.x * 360 * Math.PI * Math.PI;
            d.y = d.y - 300;
            return d.x < 180 ? 8 : -8;
        } else {
            if (d.x > 270) {
                d.y = d.y - 50;
                d.x = d.x * 500 * Math.PI * Math.PI;
            } else if (d.x > 180) {
                d.y = d.y + 50;
                d.x = d.x * 500 * Math.PI * Math.PI;
            } else if (d.x > 90) {
                d.y = d.y + 150;
                d.x = d.x * 500 * Math.PI * Math.PI;
            } else {
                d.y = d.y + 250;
                d.x = d.x * 500 * Math.PI * Math.PI;
            }
            return d.x < 180 ? 8 : -8;
        }
    })
    .attr("dy", ".31em")
    .attr("transform", function(d) {
        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" + (d.x < 180 ? "" : "rotate(180)");
    })
    .style("text-anchor", function(d) {
        return d.x < 180 ? "start" : "end";
    })
    .text(function(d) {
        return d.key;
    })
    .on("click", mouseovered);
// .on("mouseover", mouseovered);
//     .on("mouseout", mouseouted);

//});

link = link
    .data(bundle(links))
    .enter().append("path")
    .each(function(d) {
        d.source = d[0], d.target = d[d.length - 1];
    })
    .attr("class", "link")
    .attr("d", line);


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
    console.log(map);
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
