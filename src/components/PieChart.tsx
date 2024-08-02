import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = svg.node().getBoundingClientRect().width;
        const height = svg.node().getBoundingClientRect().height;
        const radius = Math.min(width, height) / 2;

        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeTableau10);

        const pie = d3.pie()
            .value(d => d.value);

        const path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 80);

        const arc = g.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        arc.append('path')
            .attr('d', path)
            .attr('fill', d => color(d.data.label))
            .style('stroke', '#fff')
            .style('stroke-width', '2px')
            .style('transition', 'all 0.3s ease-in-out')
            .on('mouseover', function(event, d) {
                d3.select(this).style('opacity', 0.8);
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`${d.data.label}: ${d.data.value}`)
                    .style('left', `${event.pageX + 5}px`)
                    .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', function() {
                d3.select(this).style('opacity', 1);
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        arc.append('text')
            .attr('transform', d => `translate(${label.centroid(d)})`)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', '#333')
            .style('font-weight', 'bold')
            .text(d => d.data.value);

        // Tooltip element
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('text-align', 'center')
            .style('background', 'rgba(0, 0, 0, 0.7)')
            .style('color', '#fff')
            .style('border-radius', '4px')
            .style('padding', '5px')
            .style('opacity', 0);

        // Append legend
        const legend = svg.append('g')
            .attr('transform', `translate(${width - 150}, 20)`);

        legend.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .attr('x', 0)
            .attr('y', (_, i) => i * 25)  // Replace 'd' with '_'
            .style('fill', d => color(d.label))
            .style('stroke', '#fff')
            .style('stroke-width', '1px');

        legend.selectAll('text')
            .data(data)
            .enter().append('text')
            .attr('x', 25)
            .attr('y', (_, i) => i * 25 + 12)  // Replace 'd' with '_'
            .style('font-size', '12px')
            .text(d => d.label);

    }, [data]);

    return <svg ref={ref} className="w-full h-full"></svg>;
};

export default PieChart;
