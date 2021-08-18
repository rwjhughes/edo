import { SlideshowContainer, SlideshowImage, FlexRow, FlexGrow } from '../shared/styles'
import { useEffect, useState, useRef } from 'react'
import * as Tone from 'tone'

// const keyboard = "qwertyuiop[]asdfghjkl;'zxcvbnm,./"

const keyboardCodes = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash"]


const makeSynth = () => {
  //TONE.JS SYNTH//

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
  }
}

const parameters = {
  attack: {
    label: "attack (s)",
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
    mapping: input => (10 * Math.exp(input * 0.0206) - 10) * 7.884,
    round: true,
    device: "synth",
    assign: (synth, value) => synth.modulationIndex.value = value
  },
  reverb: {
    label: "reverb",
    mapping: input => (input / 127),
    round: false,
    device: "reverb",
    assign: (reverb, value) => reverb.wet.value = value
  },
  feedback: {
    label: "feedback",
    mapping: input => input / 158,
    round: false,
    device: "delay",
    assign: (delay, value) => {
      delay.feedback.value = value
    }
  },
  time: {
    label: "time (s)",
    mapping: input => (10 * Math.exp(input * 0.0206) - 10) / 12.68,
    round: false,
    device: "delay",
    assign: (delay, value) => delay.delayTime.value = value
  },
  lowpass: {
    label: "lowpass (Hz)",
    mapping: input => (Math.exp(input * 0.038205) - 1) * 157.32 +20,
    round: true,
    device: "lowpass",
    assign: (lowpass, value) => lowpass.frequency.value = value
  },
  gain: {
    label: "gain",
    mapping: input => input / 127,
    round: false,
    device: "gain",
    assign: (gain, value) => gain.gain.value = value
  },
}

const MidiSlider = ({ label, displayValue, input, setInput, midiInput, changeParameter }) => {
  return <div className="effect">
    <p class="effectinfo">{label}</p><div class="effectlogo"></div>
    <span>{displayValue}</span>
    {/* <input type="number" id="attch" class="midich" /> */}
    <button className="midimap" onClick={changeParameter}>{midiInput ? (midiInput === "set" ? "map" : `${midiInput}`) : `map`}</button>
    <input type="range" min="0" max="127" value={input} className="slider" onChange={e => setInput(Number(e.target.value))} />
  </div>
}

const f0Exp = input => Math.exp(input * 0.000495175)
const f0InvExp = input => Math.log(input) / 0.000495175

const Home = () => {
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window
  const midiRef = useRef(null)

  const [f0, setF0] = useState(Math.random()*500)
  const [divisions, setDivisions] = useState(Math.round(Math.random()*23+1))

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
    <div>
      <title>EDO SYNTH</title>
      <h1>EDO SYNTH [beta]</h1>
      <h2><a href="https://richardhughes.ie" target="_blank" title="Get me out of here!">Richard Hughes</a></h2>
    </div>
    <ul>
      <li>Generate a microtonal synth by entering in the starting frequency and the amount of ocatve divisions.</li>
    </ul>
    <ul id="acknowledge">
      Thanks to <a href="https://rory.ie" target="_blank">Rory Hughes</a> for help with coding<br/>
    </ul>

    {/* <FlexRow> */}
      <div>
        <form name="edo-cal">
          <span className="tooltiptext"><i> f</i><sub>0</sub> (Hz)</span>
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
            min="6000"
            max="20000"
            value={f0InvExp(f0)}
            className="sideslider1 tooltip"
            onChange={e => setF0(f0Exp(Number(e.target.value)))}
          />

          <span className="tooltiptext">divisions</span>  
          <input 
            name="divisions" 
            type="text" 
            placeholder="max: 24" 
            size="10"
            required
            className="divisions"
            value={divisions} 
            onChange={e => setDivisions(Number(e.target.value))}
          />
          <input 
            type="range" 
            min="1" 
            max="24" 
            value={divisions} 
            className="sideslider2 tooltip"
            onChange={e => setDivisions(Number(e.target.value))}
          />

          {invalidNumbers && <p id="invalid">enter a valid number in both boxes</p>}
        </form><br/>

        <div className='field'>
          <span>oscillator</span>
          <select id='oscillator-type' onChange={e => audioDevices.synth.oscillator.type = e.target.value}>
            <option value='sine'>sine</option>
            <option value='triangle'>triangle</option>
            <option value='sawtooth'>sawtooth</option>
            <option value='square'>square</option>
          </select>
        </div>
        
        <div className="lowersliders">
          {Object.keys(parameters).map(name => {
            const { label, mapping, round, device, assign } = parameters[name]

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
      </div>
      {/* <FlexGrow> */}
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
      {/* </FlexGrow> */}
    {/* </FlexRow> */}

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
