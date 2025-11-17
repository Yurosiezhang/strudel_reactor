import React, { useState, useEffect, useRef } from 'react'
import * as d3 from "d3";
import console_monkey_patch from '../console-monkey-patch';


function Graph() {

  const [jsonData, setJsonData] = useState([]);
  const hasRun = useRef(false);
  const [selectedParam, setSelectedParam] = useState("shape"); // defualt is shape param
  const MAX_ITEMS = 300;

    // Filter the param value
  function filterValue(input, param) {
    if (!input) { return 0 };
    var stringArray = input.split(/(\s+)/);

    for (const item of stringArray) {
        if (item.startsWith(param + ':')) {
            let val = item.substring(param.length +1)
            return Number(val)
        }
    }
    return 0;
  }

  // Handle json log data
  const handleD3Data = (event) => {
      console.log(event.detail);
      const array = event.detail;
      if (!Array.isArray(array) || array.length === 0) return;
      const last = array[array.length -1]
      if(!last.includes(`${selectedParam}:`))return
      const value = filterValue(last, selectedParam)

      setJsonData((prev) => {
        const next = [...prev, value];
        if (next.length > MAX_ITEMS) next.shift();
        return next;
      })
  };

  useEffect(()=>{
      if (!hasRun.current){
          console_monkey_patch();
          hasRun.current=true;
      }
      document.addEventListener("d3Data", handleD3Data);
      // clean up 
      return () => {
          document.removeEventListener("d3Data", handleD3Data);
      };
  },[selectedParam])



  // Draw d3 graph
  useEffect(()=>{

    // select SVG element
    const svg = d3.select('svg');
    svg.selectAll("*").remove();

    // if no data, no drawing 
    if (jsonData.length === 0) return;

    // determine the size of the SVG element
    let w = svg.node().getBoundingClientRect().width;
    w = w - 40
    let h = svg.node().getBoundingClientRect().height;
    h = h - 25

    const barWidth = w / jsonData.length;


    // set dynamic yscale
    let yDomain;
    if (selectedParam === "room") yDomain = [0.2, 0.8];
    else if (selectedParam === "shape") yDomain = [0, 1];
    else if (selectedParam === "fmi") yDomain = [0, 8];
    else yDomain = [0, Math.max(1, d3.max(jsonData)) || 1];

    // Create a YScale
    let yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([h, 0]);

    // create chartGroup - translate the Bars to make room for axis
    const chartGroup = svg.append('g')
        .classed('chartGroup', true)
        .attr('transform', `translate(30, 3)`);


    // Set the gradient
    svg.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", yScale(yDomain[0]))
        .attr("x2", 0)
        .attr("y2", yScale(yDomain[1]))
        .selectAll("stop")
        .data([
            { offset: "0%", color: "green" },
            { offset: "100%", color: "red" }
        ])
        .enter().append("stop")
        .attr("offset", function (d) { return d.offset; })
        .attr("stop-color", function (d) { return d.color; });



    // Draw lines
    chartGroup
      .append('path')
      .datum(jsonData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x((d, i) => i * barWidth)
        .y((d) => yScale(d))
      )

    let yAxis = d3.axisLeft(yScale);
    chartGroup.append('g')
      .classed('axis y', true)
      .call(yAxis);

  },[jsonData, selectedParam])


  return (
    <>
      <div>
        <h5 className="mb-3">Real-time Audio Parameter Visualizer</h5>
        <select value={selectedParam} onChange={(e) => setSelectedParam(e.target.value)}
          className="form-select w-auto mb-3">
          <option value="shape">Shape-Drums</option>
          <option value="room">Room-Chords</option>
          <option value="fmi">FMI-Melody</option>

        </select>
        <svg width="100%" height="400px"
          className="border border-primary rounded p-2">
        </svg>

      </div>    
    </>
  )
}

export default Graph
