
export function preprocess(rawText, tracks ={}){
    let processedText = rawText;
        
        //Handle the track of different stacks/instruments 
        const handleTrackToggle = (tag, enabled) => {

            // match the block with tags 
            const trackPattern = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g')
            // if enabled, keep the inner code, otherwise replace with "_"
            processedText = processedText.replace(trackPattern, (_, inner) => (enabled ? inner : "_"))

        }

        // treat the toggles 
        handleTrackToggle('track_drums', !!tracks.drums);
        handleTrackToggle('track_chords', !!tracks.chords);
        handleTrackToggle('track_melody', !!tracks.melody);

        return processedText;

}