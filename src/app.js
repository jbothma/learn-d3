import 'core-js';
import "regenerator-runtime/runtime";

import { select } from 'd3-selection';
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

  function updateScales(data) {
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, max(data, function(d) { return d.value; })]);
  }

  function updateAxes() {
    svg.select(".x.axis")
      .transition(t)
      .call(axisBottom(x));
    svg.select(".y.axis")
      .transition(t)
      .call(axisLeft(y));
  }

  function showData(data) {
    // append the rectangles for the bar chart

    const bars = svg.selectAll(".bar").data(data, d => d.name);

    bars.exit().remove();

    updateScales(data);
    updateAxes();

    const barsEntering = bars.enter();

    barsEntering.append("rect")
      .attr("class", "bar")
      .on("mouseover", function(d) {
          div.style("opacity", .9);
        div.html(d.name + " " + d.timestamp)
          .style("left", (x(d.name)) + "px")
          .style("bottom", (y(d.value)) + "px");
      })
      .on("mouseout", function() {
          div.style("opacity", 0);
      });

    bars
      .transition(t)
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

    updateScales(data);
    updateAxes();

  }


  select("#update-data").on("click", function() {
    showData(generateData());
  });

  showData(generateData());
}


drawChart();
