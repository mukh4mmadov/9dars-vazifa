import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const NormalDistributionGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    const xScale = d3.scaleLinear().domain([-3, 3]).range([margin.left, width - margin.right]);

  
    const yScale = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

  
    const normalDistribution = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);

   
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveBasis); 

  
    const data = d3.range(-3, 3.01, 0.1).map((x) => ({ x, y: normalDistribution(x) }));

   
    svg
      .append("path")
      .datum(data)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#FFD700")
      .attr("stroke-width", 2);

   
    const colorSegments = [
      { range: [-3, -1], color: "red" },
      { range: [-1, 1], color: "orange" },
      { range: [1, 3], color: "green" },
    ];

    colorSegments.forEach(({ range, color }) => {
      const segmentData = data.filter((d) => d.x >= range[0] && d.x <= range[1]);
      svg
        .append("path")
        .datum(segmentData)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2);
    });


    const resultX = 1.2;
    svg
      .append("line")
      .attr("x1", xScale(resultX))
      .attr("x2", xScale(resultX))
      .attr("y1", yScale(0))
      .attr("y2", yScale(normalDistribution(resultX)))
      .attr("stroke", "blue")
      .attr("stroke-dasharray", "4 2")
      .attr("stroke-width", 2);

   
    svg
      .append("text")
      .attr("x", xScale(resultX) + 10)
      .attr("y", yScale(normalDistribution(resultX)) - 10)
      .text("90 фоиз иштирокчилардан")
      .attr("fill", "#333")
      .attr("font-size", "12px");
    svg
      .append("text")
      .attr("x", xScale(resultX) + 10)
      .attr("y", yScale(normalDistribution(resultX)) + 5)
      .text("яхшироқ натижа")
      .attr("fill", "#333")
      .attr("font-size", "12px");
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default NormalDistributionGraph;
