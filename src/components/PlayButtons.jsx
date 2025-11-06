import React from 'react'
import { FaPlay, FaStop } from 'react-icons/fa'


function PlayButtons({ onPlay, onStop }) {
  return (
    <>
      <div className="d-flex gap-3 justify-content-center">
        <button className="btn btn-outline-primary rounded-circle p-3" onClick={onPlay}>
          <FaPlay size={25}/>
        </button>
        <button className="btn btn-outline-danger rounded-circle p-3" onClick={onStop}>
          <FaStop size={25}/>
        </button>
      </div>
    
    </>
  )
}

export default PlayButtons

