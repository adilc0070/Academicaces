import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RibbonChart = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        const width = 400;
        const height = 400;
        const innerRadius = Math.min(width, height) * 0.5 - 90;
        const outerRadius = innerRadius + 10;

        const svg = d3.select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        const ribbon = d3.ribbon()
            .radius(innerRadius);

        const chords = chord(data);

        svg.append('g')
            .selectAll('path')
            .data(chords.groups)
            .enter().append('path')
            .style('fill', d => color(d.index))
            .style('stroke', d => d3.rgb(color(d.index)).darker())
            .attr('d', arc);

        svg.append('g')
            .attr('fill-opacity', 0.67)
            .selectAll('path')
            .data(chords)
            .enter().append('path')
            .attr('d', ribbon)
            .style('fill', d => color(d.target.index))
            .style('stroke', d => d3.rgb(color(d.target.index)).darker());
    }, [data]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Ribbon Chart</h2>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default RibbonChart;
