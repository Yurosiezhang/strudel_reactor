import React from 'react'
import { FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";


// Responsive volume icon and size
function VolumeIcon({ volume }) {
  if (volume === 0) return <FaVolumeMute size={20} color="#955faaff" />;
  if (volume < 0.5) return <FaVolumeDown size={20} color="#955faaff" />;
  return <FaVolumeUp size={25} color="#955faaff" />;
}

function VolumeSlider({ volume, onVolumeChange}) {

  const handleVolumeChange = (e) => {

    const newVolume = parseFloat(e.target.value);
    if(!isNaN(newVolume)){
      onVolumeChange?.(newVolume)
    }
  }

  return (
    <>
        <div className='volume-wrap mx-auto' style={{ maxWidth: "420px" }} >
            {/* Volume range slider */}
            <label htmlFor="volume_range" className="form-label fw-semibold d-flex align-items-center gap-2">
              <VolumeIcon volume={volume} />Volume
              <span className="ms-auto small text-secondary">{Math.round(volume * 100)}%</span>
            </label>
            <input type="range" className="form-range volume-range"  min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} id="volume_range" />
        </div>   
    </>

  )
}

export default VolumeSlider
