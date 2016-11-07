var link_dict = {'Golden West Brewery': 'https://www.eventbrite.com/e/brewery-tour-oakland-tickets-28915784891?aff=es2',
 'Bison Happy Hour': 'https://www.eventbrite.com/e/happy-hour-tickets-27616181743?aff=es2',
 'Sushi-making Class': 'https://www.eventbrite.com/e/learn-from-the-master-sushi-class-rolls-san-francisco-2016-tickets-25549651696?aff=es2',
 'Spanish Cooking Class': 'https://www.eventbrite.com/e/spanish-cooking-class-in-berkeley-tickets-27416225669?aff=es2',
 'Holiday Cooking Boot Camp': 'https://www.eventbrite.com/e/holiday-boot-camp-cooking-class-in-berkeley-pies-and-tarts-tickets-27416504503?aff=ehomecard'}

var choices = new Array;

Array.prototype.clear = function() {
  while (this.length) {
    this.pop();
  }
};


function bubbleCSV(select_id, file){
  var svg = d3.select(select_id),
    width = +svg.attr("width");
    height = +svg.attr("height");

  var format = d3.format(",d");
  var color = d3.scaleOrdinal(d3.schemeCategory20c);
  //create bubble nodes
  var pack = d3.pack()
      .size([width, height])
      .padding(1.5);

  d3.csv(file, function(d) {
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
        .style("opacity", function(d) { return 0.5;})
        .on("click", function() {
          var circ = d3.select(this);
          if (link_dict[circ.attr("id")]) {
            openInNewTab(link_dict[circ.attr("id")]);
          } else { 
            var cid = circ.attr("id");
            if (choices.indexOf(cid) == -1) {
              choices.push(circ.attr("id"));
            } else{
              choices.splice(choices.indexOf(cid), 1);
            }
            console.log(choices);
            var opac = circ.style('opacity');
            circ.style.transition = "all 0.5s";
            circ.style.WebKitTransition = "all 0.5s";
            if (opac == 1) {
              circ.style('opacity', 0.5);
              var textPath = '[clip-path=' + '"url(#clip-' + circ.attr("id") + '"]';
              d3.select(textPath).style('color', '#fff');
            } else if (opac == 0.5) {
              circ.style('opacity', 1);
              circ.style('border', '1px solid white');
              var textPath = '[clip-path=' + '"url(#clip-' + circ.attr("id") + '"]';
              d3.select(textPath).style('color', '#fff');
            }
          }
        });
        // .on("mouseover", function() {alert("hey");});
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
        .text(function(d) { return d; })
        .attr("text-anchor", "middle");

    node.append("title")
        .text(function(d) { return d.id + "\n" + format(d.value); });
  });
}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}