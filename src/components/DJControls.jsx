import React from 'react'

function DJControls() {
  return (
    <>
        {/* input field */}
        <div class="input-group mb-3">
            <span class="input-group-text" id="cpm_label">setCPM</span>
            <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" />
        </div>
        
        {/* Volume range slider */}
        <label for="volume_range" className="form-label">Volume</label>
        <input type="range" className="form-range"  min="0" max="1" step="0.01" id="volume_range" />

        {/* Checkboxes */}
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="s1" />
            <label className="form-check-label" for="s1">s1</label>
        </div>

        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="d1" />
            <label className="form-check-label" for="d1">d1</label>
        </div>

        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="d2" />
            <label className="form-check-label" for="d2">d2</label>
        </div>

    </>
  )
}

export default DJControls;