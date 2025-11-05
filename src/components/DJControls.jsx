import React from 'react'
import VolumeSlider from './VolumeSlider';


function DJControls({tracks, onTracksChange, volume, onVolumeChange}) {
    const currentTracks = tracks || {drums: true, chords: true, melody: true};
  return (
    <>  
        <VolumeSlider volume={volume} onVolumeChange={onVolumeChange} />
        {/* Checkboxes */}
        {/* Drums */}
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="drums"  
            checked={currentTracks.drums}
            onChange={(e) => onTracksChange({...currentTracks, drums: e.target.checked})}
            />
            <label className="form-check-label" htmlFor="s1">Drums</label>
        </div>

        {/* Chords */}
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="chords" 
            checked={currentTracks.chords}
            onChange={(e) => onTracksChange({...currentTracks, chords: e.target.checked})}
            />
            <label className="form-check-label" htmlFor="d1">Chords</label>
        </div>

        {/* Melody */}
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