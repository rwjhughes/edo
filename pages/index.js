import { SlideshowContainer, SlideshowImage, FlexRow, FlexGrow } from '../shared/styles'
import { useEffect, useState, useRef } from 'react'
import * as Tone from 'tone'

import { Mp3MediaRecorder } from 'mp3-mediarecorder'
import Mp3RecorderWorker from 'workerize-loader!../lib/worker'

const worker = Mp3RecorderWorker()

window.MediaRecorder = (stream) => new Mp3MediaRecorder(
  mediaStream, // MediaStream instance
  { worker: Mp3RecorderWorker() }
)

// const keyboard = "qwertyuiop[]asdfghjkl;'zxcvbnm,./"

const keyboardCodes = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash"]


const makeSynth = () => {
  //TONE.JS SYNTH//
  // const actx  = Tone.context;
  // const dest  = actx.createMediaStreamDestination();
  // const recorder = new MediaRecorder(dest.stream);
  const recorder = new Tone.Recorder();
  //effects chain
  const inmix = new Tone.Gain(0.8);
  const gain = new Tone.Gain(0.8);
  const reverb = new Tone.Reverb({
        wet: .6,
        decay: 30,
      });
  const delay = new Tone.PingPongDelay({
        time: 0.1,
        feedback: 0.7,
        wet: 0.5,
      });
  const lowpass = new Tone.Filter(2000, "lowpass");
    // inmix => reverb => delay
    // => lowpass filter => gain
    inmix.connect(reverb);
    reverb.connect(delay);
    delay.connect(lowpass);
    lowpass.connect(gain);
    gain.toDestination();
    gain.connect(recorder);

  //synth
  const synth = new Tone.FMSynth({
    oscillator: {
      type: 'sine'
    },
    modulationIndex: 10,
    modulation: {
      type: 'sawtooth'
    },
    modulationEnvelope: {
          attack: 5,
          release: 9
      },
    envelope: {
      attack: 3,
      decay: 3,
      sustain: .8,
      release: 8,
      attackCurve: 'sine'
    }
  }).connect(inmix);

  return {
    synth,
    lowpass,
    delay,
    reverb,
    gain,
    recorder,
  }
}

const parameters = {
  attack: {
    label: "attack (s)",
    definition: "attack is the time taken for the note to fade in.",
    mapping: input => (10 * Math.exp(input * 0.0206) - 10) / 6.342, //scaling from 127
    round: false,
    device: "synth",
    assign: (synth, value) => {
      synth.envelope.attack = value;
      synth.modulationEnvelope.attack = value;
    }
  },
  release: {
    label: "release (s)",
    definition: "release is the time taken for the note to fade out.",
    mapping: input => (10 * Math.exp(input * 0.0206) - 10) / 3.9635,
    round: false,
    device: "synth",
    assign: (synth, value) => {
      synth.envelope.release = value;
      synth.modulationEnvelope.release = value;
    }
  },
  modulation: {
    label: "modulation",
    definition: "modulation is the multiplication of one oscillator on the oscillator of your choice. The more modulation creates a noisier and distorted timbre.",
    mapping: input => (10 * Math.exp(input * 0.0206) - 10) * 7.884,
    round: true,
    device: "synth",
    assign: (synth, value) => synth.modulationIndex.value = value
  },
  reverb: {
    label: "reverb",
    definition: "reverb is the effect of having reflections of the sound, it adds a sense of space and depth.",
    mapping: input => (input / 127),
    round: false,
    device: "reverb",
    assign: (reverb, value) => reverb.wet.value = value
  },
  feedback: {
    label: "feedback",
    definition: "feedback is one of two delay effects. the more feedback the louder and long lasting the delay will sound.",
    mapping: input => input / 158,
    round: false,
    device: "delay",
    assign: (delay, value) => {
      delay.feedback.value = value
    }
  },
  time: {
    label: "time (s)",
    definition: "time is one of two delay effects. The sound is replayed after the time chosen.",
    mapping: input => (10 * Math.exp(input * 0.0206) - 10) / 12.68,
    round: false,
    device: "delay",
    assign: (delay, value) => delay.delayTime.value = value
  },
  lowpass: {
    label: "lowpass (Hz)",
    definition: "lowpass filter cuts out the high frequencies. The frequencies above the value set are cut off.",
    mapping: input => (Math.exp(input * 0.038205) - 1) * 157.32 +20,
    round: true,
    device: "lowpass",
    assign: (lowpass, value) => lowpass.frequency.value = value
  },
  gain: {
    label: "gain",
    definition: "gain is the volume.",
    mapping: input => input / 127,
    round: false,
    device: "gain",
    assign: (gain, value) => gain.gain.value = value
  },
}

const MidiSlider = ({ label, definition, displayValue, input, setInput, midiInput, changeParameter }) => {
  return <div>
    <div className="tooltip">
      <p>{label}</p>
      <span className="tooltiptext">{definition}</span>
    </div>
    <span>{displayValue}</span>
    {/* <input type="number" id="attch" class="midich" /> */}
    <button className="midimap" onClick={changeParameter}>{midiInput ? (midiInput === "set" ? "map" : `${midiInput}`) : `map`}</button>
    <input type="range" min="0" max="127" value={input} className="slider" onChange={e => setInput(Number(e.target.value))} />
  </div>
}

const f0Exp = input => Math.exp(input * 0.00049517438)
const f0InvExp = input => Math.log(input) / 0.00049517438

const Home = () => {
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window
  const midiRef = useRef(null)

  const [f0, setF0] = useState(Math.random()*500)
  const [divisions, setDivisions] = useState(Math.round(Math.random()*23+1))

  const [recordingURL, setRecordingURL] = useState()

  const [audioDevices, setAudioDevices] = useState(null)
  const [paramValues, setParamValues] = useState({
    attack: Math.random()*60,
    release: Math.random()*127,
    modulation: Math.random()*60,
    reverb: Math.random()*127,
    feedback: Math.random()*127,
    time: Math.random()*127,
    lowpass: Math.random()*120+7,
    gain: 101,
  })
  const [changingParameter, setChangingParameter] = useState()
  const [midiInputMap, setMidiInputMap] = useState([{}, {}])
  const [layoutMap, setLayoutMap] = useState()

  const invalidNumbers = isNaN(f0) || isNaN(divisions) || divisions < 1 || divisions >24 || f0 < 1

  const notes = []
  const twoDivisions = divisions * 2
  if (!invalidNumbers) {
    for (let index of [...Array(twoDivisions).keys()]) {
      if (index === 0) {
        notes.push(f0)
      } else {
        notes.push(
          (Math.pow(2, 1/divisions)) * notes[index - 1]
        )
      }
    }
  }

  const startRecording = () => {
    console.log('record')
    // record.disabled = true;
    // record.style.backgroundColor = "red"
    // stopRecord.disabled=false;
    // audioChunks = [];
    audioDevices.recorder.start()
  }

  const stopRecording = async () => {
    console.log("stop")
    const recording = await audioDevices.recorder.stop()
    const url = URL.createObjectURL(recording)

    // Returns the current state of the MediaRecorder object (inactive, recording, or paused.)
    // audioDevices.recorder.state === ''

    setRecordingURL(url)

    // const anchor = document.createElement("audio");
    // anchor.download = "recording.webm";
    // anchor.href = url;
    // anchor.click();
  }


    // stopRecord.onclick = e => {
    //   record.disabled = false;
    //   stop.disabled=true;
    //   record.style.backgroundColor = "pink"
    //   recorder.stop();
    //   const url = URL.createObjectURL(recording);
    //   const anchor = document.createElement("audio");
    //   anchor.download = "recording.webm";
    //   anchor.href = url;
    //   anchor.click();
    // }

  const onDeviceInput = ({ input, value }) => {
    if (changingParameter) {
      const newMap = {
        ...midiInputMap[0],
        [changingParameter]: input,
      }
      const newReverseMap = Object.keys(newMap).reduce((o, k) => ({
        ...o,
        [newMap[k]]: o[newMap[k]] ? o[newMap[k]].concat([k]) : [k]
      }), {})

      const bothWays = [newMap, newReverseMap]
      setMidiInputMap(bothWays)
      setChangingParameter(undefined)
      localStorage.midiMap = JSON.stringify(bothWays)
    } else {
      const paramNames = midiInputMap[1][input]
      if (paramNames) {
        const newParamValues = {...paramValues}
        paramNames.forEach(n => newParamValues[n] = value)
        setParamValues(newParamValues)
      }
    }
  }

  useEffect(() => {
    if (midiRef.current) {
      console.log("setting message callback")
      const fn = onDeviceInput
      window.onDeviceInput = fn
      midiRef.current.onDeviceInput = fn
    }
  }, [changingParameter, paramValues, midiInputMap])

  useEffect(() => {
    if (!audioDevices) { setAudioDevices(makeSynth()) }

    if (!midiRef.current) {
      const midi = new MIDIAccess()
      midi.start().then(() => {
        console.log('Started!');
      }).catch(console.error);
  
      midiRef.current = midi
    }

    if (localStorage.midiMap) {
      const parsed = JSON.parse(localStorage.midiMap)
      setMidiInputMap(parsed)
    }

    if (navigator && navigator.keyboard) {
      navigator.keyboard.getLayoutMap().then(keyboardLayoutMap => {
        setLayoutMap(keyboardLayoutMap)
      })
    }
  }, [])

  useEffect(() => {
    const keyInput = (e) => {
      console.log(e.code)
      const noteIndex = keyboardCodes.indexOf(e.code)
      if (noteIndex !== -1 && noteIndex < notes.length) {
        audioDevices.synth.triggerAttack(notes[noteIndex])
      }
    }
    const keyUp = (e) => audioDevices.synth.triggerRelease()

    document.addEventListener("keydown", keyInput)
    document.addEventListener("keyup", keyUp)
    return () => {
      document.removeEventListener("keydown", keyInput)
      document.removeEventListener("keyup", keyUp)
    }
  }, [notes, audioDevices])

  return <div>
    <div className="deeper">
    <title>EDO SYNTH</title>
      <h1>EDO SYNTH [beta]</h1>
      <h2><a href="https://richardhughes.ie" title="Get me out of here!">Richard Hughes</a></h2>
    </div>
    <ul>
      <li>Generate a microtonal synth by entering in the starting frequency and the amount of ocatve divisions.</li>
      <li>You can MIDI map your own deivce to the sliders and the map will be stored locally.</li>
      <li>The keys are assigned to your computer keyboard, from top left to bottom right.</li>
    </ul>
    <ul id="acknowledge">
      Thanks to <a href="https://rory.ie" target="_blank">Rory Hughes</a> for help with coding<br/>
    </ul>

    <p>
      {audioDevices?.recorder?.state}
      <br />
      <button id="record" onClick={startRecording}></button>
      <button id="stopRecord"
        // disabled={!audioDevices || audioDevices.recorder.state !== "recording"}
        onClick={stopRecording}>Stop</button>
    </p>

    {recordingURL && <p>
      <audio id="audio" controls>
        <source src={recordingURL} type="audio/webm" />
      </audio>
    </p>}

    <FlexRow>
          <div className="fundHeader">
            <div className="tooltip">
              <span className="header"><i> f</i><sub>0</sub> (Hz)</span>
              <span className="tooltiptext"><i>f</i><sub>0</sub> is the lowest note of the scale.</span>
            </div>
          <input 
            name="f0" 
            id="f0" 
            type="text" 
            placeholder="e.g 110" 
            size="10"
            required
            className="fundamental"
            value={f0.toFixed(2)} 
            onChange={e => setF0(Number(e.target.value))}
          />
          <input
            type="range"
            min="6050"
            max="20000"
            value={f0InvExp(f0)}
            className="slider1"
            onChange={e => setF0(f0Exp(Number(e.target.value)))}
          />
        <div>
          <div className="tooltip">
            <span className="header">divisions</span>  
            <span className="tooltiptext">divisions is how many times the octave will be divided equally.</span>
          </div>
          <input 
            name="divisions" 
            type="text" 
            placeholder="max: 24" 
            size="10"
            required
            className="fundamental"
            value={divisions} 
            onChange={e => setDivisions(Number(e.target.value))}
          />
          <input 
            type="range" 
            min="1" 
            max="24" 
            value={divisions} 
            className="slider1" 
            onChange={e => setDivisions(Number(e.target.value))}
          />
        </div>
          {invalidNumbers && <p id="invalid">enter a valid number in both boxes</p>}
          </div>
     {/* </FlexRow>
      <FlexRow> */}
      <div id='container'>
          {layoutMap && notes.map((note, i) => {
            return <div
              key={note}
              className="note"
              onMouseDown={!isTouchDevice ? () => audioDevices.synth.triggerAttack(note) : undefined}
              onTouchStart={isTouchDevice ? () => audioDevices.synth.triggerAttack(note) : undefined}
              onMouseUp={!isTouchDevice ? () => audioDevices.synth.triggerRelease() : undefined}
              onTouchEnd={isTouchDevice ? () => audioDevices.synth.triggerAttack() : undefined}
              onMouseLeave={!isTouchDevice ? () => audioDevices.synth.triggerRelease() : undefined}
            >
              <span>
                {layoutMap.get(keyboardCodes[i])}
                {/* {note.toFixed(3)} */}
              </span>
            </div>
          })}
        </div>
      </FlexRow>
      <FlexRow>
        <div className='field'>
          <div className="tooltip">
            <span>oscillator</span>
            <span className="tooltiptext">oscillator is the type of waveform which have distinct timbres.</span>
          </div>
          <select id='oscillator-type' onChange={e => audioDevices.synth.oscillator.type = e.target.value}>
            <option value='sine'>sine</option>
            <option value='triangle'>triangle</option>
            <option value='sawtooth'>sawtooth</option>
            <option value='square'>square</option>
          </select>
        </div>
        
        <div className="slidecontainer">
          {Object.keys(parameters).map(name => {
            const { label, definition, mapping, round, device, assign } = parameters[name]

            const setInput = (input) => {
              setParamValues({
                ...paramValues,
                [name]: input
              })
            }
            const input = paramValues[name]
            const scaled = mapping(input)
            if (audioDevices) {
              assign(audioDevices[device], scaled)
            }

            const displayValue = round ? Math.round(scaled) : scaled.toFixed(2)
            return <MidiSlider
              key={name}
              label={label}
              definition={definition}
              displayValue={displayValue}
              input={input}
              setInput={setInput}
              midiInput={changingParameter && changingParameter === name ? "set" : midiInputMap[0][name]}
              changeParameter={() => setChangingParameter(name)}
            />
          })}
          <br/>
          <button onClick={() => { setMidiInputMap([{}, {}]); localStorage.removeItem("midiMap") }} className="clear">clear midi map</button>
        </div>
    </FlexRow>

    <footer>&copy; Richard Hughes 2021</footer>

  </div>

}

export default Home

class MIDIAccess{
  constructor(args = {}) {
      this.onDeviceInput = args.onDeviceInput || console.log;
  }

  start() {
     return new Promise((resolve, reject) => {
      this._requestAccess().then(access => {
          this.initalize(access);
          resolve();
      }).catch(() => reject('Something went wrong.'));
     });     
  }

  initalize(access) {
      const devices = access.inputs.values();
      for (let device of devices)
          this.initalizeDevice(device);
  }

  initalizeDevice(device) {
      device.onmidimessage = this.onMessage.bind(this);
  }

  onMessage(message) {
      let [_, input, value] = message.data;
      this.onDeviceInput({ input, value });
      // console.log({ input, value });
  }

  _requestAccess() {
    return new Promise((resolve, reject) => {
        if (navigator.requestMIDIAccess)
            navigator.requestMIDIAccess()
            .then(resolve)
            .catch(reject);
        else reject();
    });
  }
}
