# Strudel Demo – Live-Coding Music & Real-Time Graph

This project is a Strudel live-coding environment featuring a custom Control Panel, a code editor, and a real-time D3 graph that visualizes selected audio parameters(such as shape, room, and fmi) from Strudel console logs.

## How to run:

1. Download or clone this repository.
2. Run npm install.
3. Run npm start.
4. Open the project in Google Chrome.

## Design

Following Bootstrap components are used across the UI:

1. Buttons to save and load settings, as well as controll play actions(play/stop/preprocess/Pro&play).
2. Checkboxes to enable/disable specific tracks.
3. Sliders to control volume.
4. Text entry to control song speed(BMP).
5. Alerts if a problem or validation error occurs(valid BMP input & setting saving).
6. Dropdown to select the parameter used in graph display(eg. shape, room and fmi)

## Code Editor:

Displays the auto-generated Strudel code based on settings and allows manual edits. 
Users must press Play to run any edited changes.

## Control Panel (Controls):

The Control Panel lets users shape how the music is built using text input, sliders, toggles and buttons. These controls adjust the sound by generating the Strudel code behind the scenes, rather than directly controlling playback.

1. Preprocess:

When the user clicks Preprocess, the system gathers all current settings such as BPM, volume, and track selection, and generates/modifies the Strudel code. This convertes the editor contents to match the current UI control settings. This runs a custom preprocess function.

2. Proc & Play:

This performs the Preprocess step and then immediately plays the resulting tune by evaluating the editor content.

3. Play and Stop:

Play executes the current Strudel code inside the editor (requires "Preprocessed" first).

Stop stops playback. 

There is a validation alert if the user presses Play before code has been preprocessed.

4. DJ Controls:

1） BPM adjusts musical tempo (Beats per minute) and is mapped to Strudel’s cps (cycles per second) in code.

2） Volume controls the overall gain from 0 to 1. Responsive volume icon: changes based on the level, larger for louder, smaller or muted for lower values.

3） Track toggle (checkboxes) allow users turn tracks (drums, chords, or melody) on or off. These selections are managed by the preprocess function and only the selected tracks are included in the generated code.

5. Setting Controls (Save & Load Settings):

Allows users to Save & Load the control panel settings. It stores the settings as JSON using loaclStorage and restores them by parsing the data to update the state.

## Graph Panel (Real-time Audio Parameter Visualizer):

Track-based parameter mapping:
The dropdown allows selecting a parameter to visualise in real time.

Shape displays values logged from drum patterns.
Room displays values logged from chord patterns.
FMI displays values logged from melody patterns.

The visualization updates incrementally based on the most recent console log. 
The system maintains a rolling data window and scales the y-scale depending on the selected parameter.

## Usage Guidelines:

The user must click Preprocess before Play Or click Proc & Play if any setting is changed.

The graph only displays logged parameters. 
If a toggled track does not contain shape, room, or fmi logging, the graph will remain empty.
The graph stores only recent values and does not retain historical data after page refresh.

## Demonstration Video:
https://youtu.be/TQdO-KUTdbU


## Tech Stack:

-React 
-Strudel for live-coding music
-D3 for real-time graphing
-Bootstrap and CSS for layout/styles

# Song Code and Attribution:

The base composition used is "coastline" @by eddyflux, with mirror modifications by Yu
@version 1.0
Sample source: samples('github:eddyflux/crate')

## AI Usage:

AI Tool: ChatGPT

Input:
Pls see my strudle music, the method I used to mute a certain track/instrument is to replace the <tag> with "_", but after replacing, the music did not play, I guess the strudle was not able to handle it somehow, why? Do I need to use different method to replace/mute the track? I am working with react
Outputs:
What’s happening is about Strudel’s parser, not React.
Those angle-bracket bits like <track_drums> ... </track_drums> aren’t comments; they’re track markers that Strudel’s transpiler uses to segment/rout layers. When you replace a whole <track_...> block with a lone _, you leave the DSL in a state it doesn’t understand (e.g., unexpected token / missing pattern where a block was expected). The transpile step fails → nothing plays.
Using s("~") yields rests, so the track is effectively silent but still valid syntax.
`<track_drums> stack(s("~")) </track_drums>` // all rests
Why not _?
_ isn’t a recognized “silent layer” token in this DSL. Removing or replacing the tag block changes the program structure and breaks parsing. Keeping the tags while making the contents silent (gain 0, full mask, or s("~")) preserves valid structure, so Strudel can still compile and run the rest.


Input:
I tried to set the volume range css but did not work? why? how can I fix it?
Outputs:
Bootstrap applies very aggressive default styles to .form-range
Bootstrap’s slider input (<input type="range" class="form-range">) has:
A predefined thumb size
A gradient track
Browser-specific rules
appearance rules that override most custom CSS
And it uses pseudo-selectors like ::-webkit-slider-thumb and ::-webkit-slider-runnable-track
So when you first tried styling it, your CSS was being overridden by Bootstrap’s defaults because:
Bootstrap styles were more specific,
and also loaded after your CSS (depending on import order),
and range inputs require vendor-prefixed selectors (the plain class alone won’t change the UI).
How to fix it:
1. Added higher specificity
.form-range.volume-range
This selector is more specific than Bootstrap’s .form-range, so your rules now override theirs.
2. Reset browser & Bootstrap styling
appearance: none;
-webkit-appearance: none;
background: transparent !important;
This removes:
default browser rendering
default Bootstrap track styling
background that prevented your gradient from showing
This is essential — without resetting, the browser still shows its native slider UI.
3. Styled required vendor pseudo-elements
Range inputs must be styled through these selectors:
::-webkit-slider-runnable-track → track
::-webkit-slider-thumb → knob
Without these, applying style to the input element does nothing.

Input:
Initially, I only have one gain wrapped at the end, but now I have multiple gains within each track. So how do I process my volume with only replacing the last gain to control gloable volume?
Outputs:
You can use a negative lookahead regex to target only the last occurrence:
processedText = processedText.replace(/\.gain\([^)]+\)(?![\s\S]*\.gain\()/, `.gain(${volume})`);
Explanation
\.gain\([^)]+\) → matches .gain(something)
(?![\s\S]*\.gain\() → asserts that no other .gain( appears after this one
(i.e., it’s the last one in the entire string)
So this expression replaces only the final .gain(...), no matter how many earlier .gain() calls appear in your tune.

