import React, { useEffect, useRef } from 'react'
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';


function  StrudelReplView({ onEditorReady }) {


    // Create reference to canvas
    const canvasRef = useRef(null);

    // Create reference to editor
    const editorRef = useRef(null);

    const hasRun = useRef(false);

    useEffect(() => {

        if (!hasRun.current) {
            // document.addEventListener("d3Data", handleD3Data);
            // console_monkey_patch();
            hasRun.current = true;

            // Initialise canvas
            const canvas = canvasRef.current; // acccess element
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps

            drawContext.fillRect(0, 0, canvas.width, canvas.height );

            // Initialse the editor
            const editor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: editorRef.current,
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );

                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
            onEditorReady?.(editor);
        }

    }, []);

    return (
        <>
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                <div ref={editorRef} />
                <div id="output" />
                <canvas ref={canvasRef} id='roll' width={1000} height={300} style={{ border: '1px solid black'}} />
            </div>   
        </>
    )
}

export default StrudelReplView