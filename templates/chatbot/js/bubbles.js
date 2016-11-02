function bubbleCSV(id, file){
  var svg = d3.select(id),
    width = +svg.attr("width");
    height = +svg.attr("height");

  var format = d3.format(",d");
  var color = d3.scaleOrdinal(d3.schemeCategory20c);
  //create bubble nodes
  var pack = d3.pack()
      .size([width, height])
      .padding(1.5);

  d3.csv(file, function(d) {
    console.log(d.value);
    d.value = +3;
    if (d.value) return d;
  }, function(error, classes) {
    if (error) throw error;
    var root = d3.hierarchy({children: classes})
    .sum(function(d) { return d.value; })
    .each(function(d){if (id = d.data.id) {
      var id, i = id.lastIndexOf(".");
      d.id = id;
      d.package = id.slice(0, i);
      d.class = id.slice(i + 1);
      }
    });
    var node = svg.selectAll(".node")
      .data(pack(root).leaves())
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("id", function(d) { return d.id; })
        .attr("r", function(d) { return 100; })
        .style("fill", function(d) { return color(d.package); })
        .on("click", function() {
          d3.select(this).style('opacity', 0.5); //just to make sure
          setTimeout(function(){d3.select(this).style('opacity', 1);}, 500);
        });
    node.append("clipPath")
        .attr("id", function(d) { return "clip-" + d.id; })
      .append("use")
        .attr("xlink:href", function(d) { return "#" + d.id; });

    node.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
      .selectAll("tspan")
      .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
      .enter().append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
        .text(function(d) { return d; });

    node.append("title")
        .text(function(d) { return d.id + "\n" + format(d.value); });
  });
}

