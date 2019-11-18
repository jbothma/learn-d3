import { select, selectall } from 'd3-selection';
import { transition } from 'd3-transition';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

import { generateData } from './data';


function drawChart() {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = scaleBand()
      .range([0, width])
      .padding(0.1);
  var y = scaleLinear()
      .range([height, 0]);

  var svg = select("#root").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  const t = transition()
        .duration(750);

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x axis");

  // add the y Axis
  svg.append("g")
    .attr("class", "y axis");

  // Define the div for the tooltip
  var div = select("#root").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  function showData(data) {
    const nodes = svg.selectAll(".bar");

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, max(data, function(d) { return d.value; })]);

    // append the rectangles for the bar chart

    nodes.data(data, d => d.name)
      .enter().append("rect")
      .attr("class", "bar")
      .on("mouseover", function(d) {
          div.style("opacity", .9);
        div.html(d.name + " " + d.timestamp)
          .style("left", (x(d.name)) + "px")
          .style("bottom", (y(d.value)) + "px");
      })
      .on("mouseout", function(d) {
          div.style("opacity", 0);
      });

    svg.select(".x.axis")
      .transition(t)
      .call(axisBottom(x));
    svg.select(".y.axis")
      .transition(t)
      .call(axisLeft(y));

    nodes
      .transition(t)
      .attr("x", function(d) { return x(d.name); });
    nodes
      .transition(t)
      .attr("width", x.bandwidth());
    nodes
      .transition(t)
      .attr("y", function(d) { return y(d.value); });
    nodes
      .transition(t)
      .attr("height", function(d) { return height - y(d.value); });

    nodes
      .exit().remove();

  }


  select("#update-data").on("click", function() {
    showData(generateData());
  });

  showData(generateData());
}


drawChart();
