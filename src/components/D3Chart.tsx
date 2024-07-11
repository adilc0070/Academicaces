import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const D3Chart = ({ data, title }) => {
    const chartRef = useRef();

    useEffect(() => {
        // Set up chart dimensions and margins
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Create SVG container
        const svg = d3.select(chartRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Set up scales
        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([height, 0]);

        // Draw bars
        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.value))
            .attr('fill', 'steelblue');

        // Add x-axis
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Add y-axis
        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y));
    }, [data]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default D3Chart;
