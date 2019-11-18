import * as d3 from 'd3';
import { generateData } from './data';


function drawChart() {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
  var y = d3.scaleLinear()
      .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#root").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



  function showData(data) {
    const nodes = svg.selectAll(".bar");

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // append the rectangles for the bar chart

    nodes.data(data)
      .enter().append("rect")
      .attr("class", "bar");

    nodes
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .exit().remove();

    svg.selectAll(".x-axis").call(d3.axisBottom(x));
    svg.selectAll(".y-axis").call(d3.axisLeft(y));
  }

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x-axis");


  // add the y Axis
  svg.append("g")
    .attr("class", "y-axis");


  d3.select("#update-data").on("click", function() {
    showData(generateData());
  });

  showData(generateData());
}


drawChart();
