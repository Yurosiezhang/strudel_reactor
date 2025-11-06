import React from 'react'

function SettingControls({ bpm, volume, tracks, setBpm, setVolume, setTracks }) {
    const handleSave = () =>{
        const settings = { bpm, volume, tracks}
        localStorage.setItem('controlSettings', JSON.stringify(settings))
        alert('Control settings saved to local storage!')
    }

    const handleLoad = () =>{
        const savedSettings = localStorage.getItem('controlSettings')
        if (!savedSettings){
            return alert('You have not saved any settings yet')
        }
        try {
            const parsed = JSON.parse(savedSettings)
            setBpm(parsed.bpm);
            setVolume(parsed.volume);
            setTracks(parsed.tracks);
            alert('Settings loaded successfully');            
        } catch (error) {
            alert('Settings data loading error ')            
        }
    }
  return (
    <>  
        <div className="d-flex gap-3 justify-content-center mb-3">
            <button id="process" className="btn btn-outline-primary" onClick={handleSave}>Save Settings</button>
            <button id="process_play" className="btn btn-outline-primary" onClick={handleLoad} >Load Settings</button>
        </div>   
    </>
  )
}

export default SettingControls
