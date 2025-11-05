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
import BPMInput from './components/BPMInput';


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

    const [bpm, setBmp] = useState(90)
    const cps = bpm / 120;

    const [volume, setVolume] = useState(0.5);


    const handlePlay = () => {
        editor.evaluate()
    }

    const handleStop = () => {
        editor.stop()
    }

    const handleProcess = () => {
        if (!editor) return;
        const code = preprocess(songText, tracks, { cps, volume });
        editor.setCode(code)
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
    <div>
        <h2>Strudel Demo- test</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessTextarea  defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-4">

                        <nav>
                            < ProcButtons onProcess={handleProcess} onProAndPlay={handleProcAndPlay}/>
                            <br />
                            < PlayButtons onPlay={handlePlay} onStop={handleStop} />
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <StrudelReplView  onEditorReady={handleEditorReady} volume={volume}/>
                    <div className="col-md-4">
                        < BPMInput bpm={bpm} onChange={setBmp} />
                        < DJControls tracks={tracks} onTracksChange={setTracks}
                        volume={volume}
                        onVolumeChange = {setVolume}
                         />
                    </div>
                </div>
            </div>
        </main >
    </div >
);


}