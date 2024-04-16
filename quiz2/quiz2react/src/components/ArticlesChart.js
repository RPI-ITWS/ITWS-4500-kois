import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import data from '../output.json';  
const ArticlesChart = () => {
  const d3Container = useRef(null);
  const [barColor, setBarColor] = useState('steelblue'); 

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      svg.selectAll('*').remove();

      svg.attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom)
         .append('g')
         .attr('transform', `translate(${margin.left},${margin.top})`);

      // Assuming your data has a structure that needs parsing similar to what was previously coded
      const summaryData = data.reduce((acc, article) => {
        const date = new Date(article.date);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        acc[monthYear] = (acc[monthYear] || 0) + 1;
        return acc;
      }, {});

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(Object.keys(summaryData));

      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(Object.values(summaryData), d => d)]);

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.selectAll('.bar')
        .data(Object.entries(summaryData))
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d[0]))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d[1]))
        .attr('height', d => height - y(d[1]))
        .attr('fill', barColor);
    }
  }, [data, barColor]);  

  const changeBarColor = (newColor) => {
    setBarColor(newColor);
  };

  return (
    <>
      <svg ref={d3Container} />
      <button onClick={() => changeBarColor('tomato')}>Change Color to Tomato</button>
      <button onClick={() => changeBarColor('steelblue')}>Change Color to Steelblue</button>
    </>
  );
};

export default ArticlesChart;
