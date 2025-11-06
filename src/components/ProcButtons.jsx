import React from 'react'

function ProcButtons( { onProcess, onProAndPlay }) {
  return (
    <>
        <div className="d-flex gap-3 justify-content-center mb-3">
            <button id="process" className="btn btn-outline-primary" onClick={onProcess}>Preprocess</button>
            <button id="process_play" className="btn btn-outline-primary" onClick={onProAndPlay} >Proc & Play</button>
        </div>
    </>                                    
  )
}

export default ProcButtons
