import React, { useState, useEffect, useRef } from 'react'
import * as d3 from "d3";
import console_monkey_patch, { getD3Data } from '../console-monkey-patch';

function Graph() {

  const [jsonData, setJsonData] = useState([]);
  const hasRun = useRef(false);
  const [selectedParam, setSelectedParam] = useState("");

  // Handle json log data
  const handleD3Data = (event) => {
      console.log(event.detail);
      setJsonData(event.detail);
  };

  useEffect(()=>{
      if (!hasRun.current){

          document.addEventListener("d3Data", handleD3Data);
          console_monkey_patch();
          hasRun.current=true;
      }
      // clean up 
      return () => {
          document.removeEventListener("d3Data", handleD3Data);
      };
  },[])

  // Filter the param value
  function LogToNum(input, param) {
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



  return (
    <>
      <div>
        <h5 className="mb-3">Real-time Audio Parameter Visualizer</h5>
        <select value={selectedParam} onChange={(e) => setSelectedParam(e.target.value)}
          className="form-select w-auto mb-3">
          <option value="shape">Shape</option>
          <option value="room">Room</option>
          <option value="lpf">LPF</option>

        </select>

      </div>    
    </>
  )
}

export default Graph
