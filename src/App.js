import './App.css';
import { useEffect, useRef, useState } from "react";
import { coastline_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import StrudelReplView from './components/StrudelReplView';
import { preprocess } from './preprocess';
import Graph from './components/Graph';
import banner from './images/banner.png';




// let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

// export function SetupButtons() {

//     document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//     document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (globalEditor != null) {
//             Proc()
//             globalEditor.evaluate()
//         }
//     }
//     )
// }



// export function ProcAndPlay() {
//     if (globalEditor != null && globalEditor.repl.state.started == true) {
//         console.log(globalEditor)
//         Proc()
//         globalEditor.evaluate();
//     }
// }

// export function Proc() {

//     let proc_text = document.getElementById('proc').value
//     let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//     ProcessText(proc_text);
//     globalEditor.setCode(proc_text_replaced)
// }

// export function ProcessText(match, ...args) {

//     let replace = ""
//     // if (document.getElementById('flexRadioDefault2').checked) {
//     //     replace = "_"
//     // }

//     return replace
// }

export default function StrudelDemo() {

    // const hasRun = useRef(false);

    const [songText, setSongText] = useState(coastline_tune)
    const [editor, setEditor] = useState()

    const [tracks, setTracks] = useState({
        drums: true,
        chords: true,
        melody: true,
    })


    const handleEditorReady = (i) => setEditor(i);

    const [bpm, setBpm] = useState(90)
    const cps = bpm / 120;

    const [volume, setVolume] = useState(0.5);

    const [hasCode, setHasCode] = useState(false)


    const handlePlay = () => {
        if (!editor || !hasCode){
            window.alert('No strudle code yet. Click "Preprocess" first or use “Proc & Play”')
            return;
        }
        try{
            editor.evaluate()
        }catch(e){
            console.error(e);
            window.alert('Please "Preprocess" to play!')         
        }       
    }

    const handleStop = () => {
        editor.stop()
    }

    const handleProcess = () => {
        if (!editor) return;
        const code = preprocess(songText, tracks, { cps, volume });
        editor.setCode(code);
        setHasCode(true);
    }

    const handleProcAndPlay = () => {
        handleProcess();
        editor?.evaluate();
    }



// useEffect(() => {

//     if (!hasRun.current) {
//         // document.addEventListener("d3Data", handleD3Data);
//         // console_monkey_patch();
//         // hasRun.current = true;
//         // //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
//         //     //init canvas
//         //     const canvas = document.getElementById('roll');
//         //     canvas.width = canvas.width * 2;
//         //     canvas.height = canvas.height * 2;
//         //     const drawContext = canvas.getContext('2d');
//         //     const drawTime = [-2, 2]; // time window of drawn haps

            
//         document.getElementById('proc').value = stranger_tune
//         // SetupButtons()
//         // Proc()
//     }
//     globalEditor.setCode(songText);

// }, [songText]);


return (
    <div className='App'>
        <div className="top-rail"></div>
        <header className="app-header mb-4">
            <div className="container-fluid px-4">  
                <div className="row align-items-end g-3">
                {/* title & subtitle */}
                <div className="col-12 col-md-8">
                    <h1 className="app-title mb-2">Strudel Demo</h1>
                    <p className="app-subtitle mb-0">~~ Live code Music: Preprocess → Play → Visualize ~~</p>
                </div>
                {/* banner */}
                <div className="col-12 col-md-4">
                    <img
                    src={banner}
                    alt="Music banner"
                    className="header-banner w-100"
                    />
                </div>
                </div>
            </div>
        </header>
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <PreprocessTextarea  defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <div className=' panel-card sticky-top' style={{ top: 16 }} >
                            <h2 className='panel-title mb-3'>Control Panel</h2>
                            < ProcButtons onProcess={handleProcess} onProAndPlay={handleProcAndPlay}/>                            
                            < DJControls 
                                tracks={tracks} onTracksChange={setTracks}
                                volume={volume} onVolumeChange = {setVolume}
                                bpm={bpm} onBpmChange={setBpm}
                            />
                            < PlayButtons onPlay={handlePlay} onStop={handleStop} />
                        </div>                        
                    </div>
                </div>
                <div className="row">
                    <StrudelReplView  onEditorReady={handleEditorReady} volume={volume}/>
                    <div className="col-md-4 mt-5">
                        <div className=' panel-card sticky-top' style={{ top: 16 }} >
                            <h2 className='panel-title mb-3'>Graph Panel</h2>
                            <Graph />
                        </div>                       
                    </div>
                </div>
            </div>
        </main >
    </div >
);


}