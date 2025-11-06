import React from 'react'

function PreprocessTextarea({ defaultValue, onChange }) {
  return (
    <>
        <label htmlFor="exampleFormControlTextarea1" 
          className="form-label fw-semibold text-light mb-2"
          >Text to preprocess:</label>
        <textarea className="form-control preprocess-textarea" rows="15" 
        defaultValue={defaultValue} 
        onChange={onChange} 
        id="proc" ></textarea>     
    </>
  )
}

export default PreprocessTextarea
