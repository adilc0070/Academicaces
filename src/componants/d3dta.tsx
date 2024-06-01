import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
      const svg = d3.select(svgRef.current);
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  
      svg
        .attr('width', width)
        .attr('height', height);
  
      const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top]);
  
      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));
  
      svg.selectAll('*').remove(); // Clear the previous content
  
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
  
      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
  
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);
    }, [data]);
  
    return <svg ref={svgRef}></svg>;
};

export default BarChart;
