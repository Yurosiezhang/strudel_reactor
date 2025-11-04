import React from 'react'

function DJControls({tracks, onTracksChange}) {
    const currentTracks = tracks || {drums: true, chrods: true, melody: true};
  return (
    <>
        {/* input field */}
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">setCPM</span>
            <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" />
        </div>
        
        {/* Volume range slider */}
        <label htmlFor="volume_range" className="form-label">Volume</label>
        <input type="range" className="form-range"  min="0" max="1" step="0.01" id="volume_range" />

        {/* Checkboxes */}
        {/* Drums */}
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="drums"  
            checked={currentTracks.drums}
            onChange={(e) => onTracksChange({...currentTracks, drums: e.target.checked})}
            />
            <label className="form-check-label" htmlFor="s1">Drums</label>
        </div>

        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="chords" 
            checked={currentTracks.chrods}
            onChange={(e) => onTracksChange({...currentTracks, chords: e.target.checked})}
            />
            <label className="form-check-label" htmlFor="d1">Chords</label>
        </div>

        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="melody" 
            checked={currentTracks.melody}
            onChange={(e) => onTracksChange({...currentTracks, melody: e.target.checked})}
            />
            <label className="form-check-label" htmlFor="d2">Melody</label>
        </div>

    </>
  )
}

export default DJControls;