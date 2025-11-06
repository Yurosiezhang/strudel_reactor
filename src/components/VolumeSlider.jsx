import React from 'react'

function VolumeSlider({ volume, onVolumeChange}) {

  const handleVolumeChange = (e) => {

    const newVolume = parseFloat(e.target.value);
    if(!isNaN(newVolume)){
      onVolumeChange?.(newVolume)
    }
  }

  return (
    <>
        <div>
            {/* Volume range slider */}
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range"  min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} id="volume_range" />
            <div className='form-text text-muted'>Volume: {Math.round(volume*100)}</div>
        </div>   
    </>

  )
}

export default VolumeSlider
