
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
            setError("⚠️ BPM value must be a number!")
            setLocalBpm(String(bpm))
            return
        }

        // check if BMP in the valid range 

        if (value < min || value > max){
            setError(`⚠️ Enter a BPM between ${min} and ${max}!`)
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
        <div className='d-flex justify-content-center'>
                    {/* Display BPM (beats per minute)input field */}
            <div className="input-group mb-3" style={{ width: "320px" }}>
                <span
                    className="input-group-text text-white border-0 fw-semibold px-4"
                    id="bpm_label"
                    style={{
                        background: "linear-gradient(90deg, #845ef7, #ff6b6b)",
                    }}
                >set BPM</span>

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
        </div>
        {/* Dispaly Alert if any errors */}
        {error&&(
            <div className='alert alert-warning mt-1 py-1 text-center mx-auto' 
            role='alert'
            style={{ maxWidth: "340px" }}
            >{error}</div>            
        )}
        <div className='form-text text-muted mt-1 text-center mx-auto'
        style={{ maxWidth: "320px" }}
        >
            <p>{`BPM must be between ${min} and ${max}`}</p>
        </div>     
    </>
  )
}

export default  BPMInput
