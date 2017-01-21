var n = 5,  // number of layers
    m = 6;  // number of samples per layer

var margin = {top: 40, right: 10, bottom: 40, left: 20},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function (error, data){
    if (error) throw error;
    
    var headers = ["Aktive","Jugend","Ehrenmitglieder","Passive","Ausgetreten"];
    
    var layers = d3.layout.stack()(headers.map(function(layer) {
        return data.map(function(d) {
          return {x: d.Jahr, y: +d[layer]};
        });
    }));

    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
        yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var x = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, width], .08);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    var color = d3.scale.linear()
        .domain([0, n - 1])
        .range(["#aad", "#556"]);
      
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    var layer = svg.selectAll(".layer")
      .data(layers)
      .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0);

    rect.append("svg:title")
        .text(function(d) { return d.y; });

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    
    svg.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(20,0)")
        .call(yAxis)
      .append("text")
        .attr("x", 5)
        .attr("y", y(y.ticks(10).pop()))
        .attr("dy", "0.35em")
        .style("text-anchor", "start")
        .text("Anzahl");

    var legend = svg.selectAll(".legend")
      .data(headers.reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(-300," + i * 20 + ")"; })
        .style("font", "10px sans-serif");
       
    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { return color(i); });
    
    legend.selectAll("text .legend")
      .data([headers.slice().reverse()])
      .enter().append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d,i,j) { return d[j];  });

    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function() {
      d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
      clearTimeout(timeout);
      if (this.value === "grouped") transitionGrouped();
      else transitionStacked();
    }

    function transitionGrouped() {
      y.domain([0, yGroupMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
          .attr("width", x.rangeBand() / n)
        .transition()
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return height - y(d.y); });

      svg.select(".axis--y")
        .transition()
          .duration(500).ease("sin-in-out")
          .call(yAxis);
    };

    function transitionStacked() {
      y.domain([0, yStackMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("y", function(d) { return y(d.y0 + d.y); })
          .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .transition()
          .attr("x", function(d) { return x(d.x); })
          .attr("width", x.rangeBand());

      svg.select(".axis--y")
        .transition()
          .duration(500).ease("sin-in-out")
          .call(yAxis);
    };
});