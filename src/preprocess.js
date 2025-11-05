
export function preprocess(rawText, tracks ={}, { cps, volume } = {}){
    let processedText = rawText;

    // replace cps value
    if (typeof cps === 'number') {
        const setcpsMatch = /setcps\s*\(\s*[^)]+\s*\)/i;  
        if (setcpsMatch.test(processedText)) {
        processedText = processedText.replace(setcpsMatch, `setcps(${cps})`);
        } 
    }

    // Change volume
    if (typeof volume === 'number') {
        processedText = processedText.replace(/\.gain\([^)]+\)/, `.gain(${volume})`);
    }

        
    //Handle the track of different stacks/instruments 
    const handleTrackToggle = (tag, enabled) => {

        // match the block with tags 
        const trackPattern = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g')
        // if enabled, keep the inner code, otherwise replace with s("~") to mute the block
        processedText = processedText.replace(trackPattern, (_, inner) => (enabled ? inner : `s("~")`))

    }

    // treat the toggles 
    handleTrackToggle('track_drums', !!tracks.drums);
    handleTrackToggle('track_chords', !!tracks.chords);
    handleTrackToggle('track_melody', !!tracks.melody);

    return processedText;

}