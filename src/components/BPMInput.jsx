
import React, { useEffect, useState } from 'react'

function  BPMInput({bpm, onChange, min = 40, max = 180}){

    const [localBpm, setLocalBpm] = useState(String(bpm))

    const [cps, setCps] = useState(parseFloat(localBpm) / 120);

    const [error, setError] = useState("")

    // Update cps when BPM changes
    useEffect(() => {
        const value = parseFloat(localBpm);
        if (!isNaN(value)){
            setCps(value / 120)
        }else{
            setCps(null)
        }
        }, [localBpm])


    const handleInputChange = (e) => {
        const input = e.target.value
        setLocalBpm(input)
        setError("")
    }

    const handleValidation = () => {
        const value = parseFloat(localBpm);

        // check if input is a valid number
        if (isNaN(value)){
            setError("⚠️ Please enter a valid BPM value - must be a number!")
            setLocalBpm(String(bpm))
            return
        }

        // check if BMP in the valid range 

        if (value < min || value > max){
            setError(`⚠️ Please enter a valid BPM value - must be between ${min} and ${max}!`)
             setLocalBpm(String(bpm))
            return
        }

        // if valid input 
        onChange?.(value);
        setLocalBpm(String(value))
        setError("")
    }


  return (
    <>
        {/* Display BPM (beats per minute)input field */}
        <div className="input-group mb-3">
            <span className="input-group-text" id="bpm_label">set BPM</span>
            <input type="number" className={`form-control ${error ? 'is-invalid' : ''}`}
            id="bpm_text_input" 
            value={localBpm} 
            min={min} 
            max={max}
            step="10"
            onChange={handleInputChange}
            onBlur={handleValidation}
            placeholder="90" 
            aria-label="bpm" aria-describedby="bpm_label" />
        </div>
        {/* Dispaly Alert if any errors */}
        {error&&(
            <div className='alert alert-warning mt-2 py-1' role='alert'>{error}</div>            
        )}
        <div className='form-text text-muted mt-1'>
            <p>BPM must be between ${min} and ${max}</p>
            Current speed: <strong>{cps !== null ? cps.toFixed(2) : "--"}</strong> CPS
        </div>
      
    </>
  )
}

export default  BPMInput
