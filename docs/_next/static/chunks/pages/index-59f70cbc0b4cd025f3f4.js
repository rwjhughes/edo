(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6124:function(e,n,t){"use strict";t.r(n);var i=t(1626),r=t(8216),a=t(5997),o=t(5893),s=t(2809),c=t(809),l=t.n(c),u=t(266),d=t(7618),h=t(4877),f=t(7294),p=t(5851);function m(e,n){var t;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"===typeof e)return v(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(e,n)}(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,s=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||null==t.return||t.return()}finally{if(s)throw a}}}}function v(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function y(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?g(Object(t),!0).forEach((function(n){(0,s.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var x=["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash"],j={attack:{label:"attack (s)",definition:"attack is the time taken for the note to fade in.",mapping:function(e){return(10*Math.exp(.0206*e)-10)/6.342},round:!1,device:"synth",assign:function(e,n){e.envelope.attack=n,e.modulationEnvelope.attack=n}},release:{label:"release (s)",definition:"release is the time taken for the note to fade out.",mapping:function(e){return(10*Math.exp(.0206*e)-10)/3.9635},round:!1,device:"synth",assign:function(e,n){e.envelope.release=n,e.modulationEnvelope.release=n}},modulation:{label:"modulation",definition:"modulation creates a noisier and distorted timbre.",mapping:function(e){return 7.884*(10*Math.exp(.0206*e)-10)},round:!0,device:"synth",assign:function(e,n){return e.modulationIndex.value=n}},reverb:{label:"reverb",definition:"reverb is the effect of having reflections of the sound, it adds a sense of space and depth.",mapping:function(e){return e/127},round:!1,device:"reverb",assign:function(e,n){return e.wet.value=n}},feedback:{label:"feedback",definition:"feedback is one of two delay effects. The more feedback the louder and long lasting the delay will sound.",mapping:function(e){return e/158},round:!1,device:"delay",assign:function(e,n){e.feedback.value=n}},time:{label:"time (s)",definition:"time is one of two delay effects. The sound is replayed after the time chosen.",mapping:function(e){return(10*Math.exp(.0206*e)-10)/12.68},round:!1,device:"delay",assign:function(e,n){return e.delayTime.value=n}},lowpass:{label:"lowpass (Hz)",definition:"lowpass filter cuts out the high frequencies. The frequencies above the value set are cut off.",mapping:function(e){return 157.32*(Math.exp(.038205*e)-1)+20},round:!0,device:"lowpass",assign:function(e,n){return e.frequency.value=n}},gain:{label:"gain",definition:"gain is the volume.",mapping:function(e){return e/127},round:!1,device:"gain",assign:function(e,n){return e.gain.value=n}}},b=function(e){var n=e.label,t=e.definition,i=e.displayValue,r=e.input,a=e.setInput,s=e.midiInput,c=e.changeParameter;return(0,o.jsxs)(h.X2,{p:"10px 0",children:[(0,o.jsxs)(h.gq,{alignItems:"baseline",children:[(0,o.jsx)(h.zh,{children:(0,o.jsxs)("span",{className:"tooltip",children:[n,(0,o.jsx)("span",{className:"tooltiptext",children:t})]})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("span",{children:i}),(0,o.jsx)("button",{className:"midimap",onClick:c,children:s?"set"===s?"map":"".concat(s):"map"})]})]}),(0,o.jsx)(h.iR,{type:"range",min:"0",max:"127",value:r,onChange:function(e){return a(Number(e.target.value))}})]})};n.default=function(){var e="ontouchstart"in window,n=(0,f.useRef)(null),t=(0,f.useState)(500*Math.random()+20),i=t[0],r=t[1],a=(0,f.useState)(Math.round(23*Math.random()+1)),c=a[0],m=a[1],v=(0,f.useState)(),g=v[0],k=v[1],N=(0,f.useState)(null),S=N[0],D=N[1],M=(0,f.useState)({attack:60*Math.random(),release:127*Math.random(),modulation:60*Math.random(),reverb:127*Math.random(),feedback:127*Math.random(),time:127*Math.random(),lowpass:100*Math.random()+27,gain:101}),O=M[0],E=M[1],I=(0,f.useState)(),K=I[0],T=I[1],q=(0,f.useState)([{},{}]),C=q[0],R=q[1],A=(0,f.useState)(),P=A[0],_=A[1],H=(0,f.useState)(),Z=H[0],z=H[1],L=isNaN(i)||isNaN(c)||c<1||c>24||i<1,Y=[],F=2*c;if(!L)for(var X=0,J=(0,d.Z)(Array(F).keys());X<J.length;X++){var U=J[X];0===U?Y.push(i):Y.push(Math.pow(2,1/c)*Y[U-1])}var B,V=function(){var e=(0,u.Z)(l().mark((function e(){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("record"),k(null),S.recorder.start();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=(0,u.Z)(l().mark((function e(){var n,t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("stop"),e.next=3,S.recorder.stop();case 3:n=e.sent,t=URL.createObjectURL(n),k(t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Q=function(e){var n=e.input,t=e.value;if(K){var i=y(y({},C[0]),{},(0,s.Z)({},K,n)),r=Object.keys(i).reduce((function(e,n){return y(y({},e),{},(0,s.Z)({},i[n],e[i[n]]?e[i[n]].concat([n]):[n]))}),{}),a=[i,r];R(a),T(void 0),localStorage.midiMap=JSON.stringify(a)}else{var o=C[1][n];if(o){var c=y({},O);o.forEach((function(e){return c[e]=t})),E(c)}}};return(0,f.useEffect)((function(){if(n.current){console.log("setting message callback");var e=Q;window.onDeviceInput=e,n.current.onDeviceInput=e}}),[K,O,C]),(0,f.useEffect)((function(){if(S||D(function(){var e=new p.KN({mimeType:"audio/webm; codecs=opus"}),n=new p.S9(.8),t=new p.S9(.8),i=new p.E8({wet:.6,decay:30}),r=new p.D0({time:.1,feedback:.7,wet:.5}),a=new p.wn(2e3,"lowpass");return n.connect(i),i.connect(r),r.connect(a),a.connect(t),t.toDestination(),t.connect(e),{synth:new p.tC({oscillator:{type:"sine"},modulationIndex:10,modulation:{type:"sawtooth"},modulationEnvelope:{attack:5,release:9},envelope:{attack:3,decay:3,sustain:.8,release:8,attackCurve:"sine"}}).connect(n),lowpass:a,delay:r,reverb:i,gain:t,recorder:e}}()),!n.current){var e=new w;e.start().then((function(){console.log("Started!")})).catch(console.error),n.current=e}if(localStorage.midiMap){var t=JSON.parse(localStorage.midiMap);R(t)}navigator&&navigator.keyboard&&navigator.keyboard.getLayoutMap().then((function(e){_(e)}))}),[]),(0,f.useEffect)((function(){var e=function(e){console.log(e.code);var n=x.indexOf(e.code);-1!==n&&n<Y.length&&(S.synth.triggerAttack(Y[n]),z(n))},n=function(e){S.synth.triggerRelease(),z(void 0)};return document.addEventListener("keydown",e),document.addEventListener("keyup",n),function(){document.removeEventListener("keydown",e),document.removeEventListener("keyup",n)}}),[Y,S]),(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{className:"deeper",children:[(0,o.jsx)("title",{children:"EDO SYNTH - Richard Hughes"}),(0,o.jsx)("h1",{children:"EDO SYNTH"}),(0,o.jsx)("h2",{children:(0,o.jsx)("a",{href:"https://richardhughes.ie",target:"_blank",title:"Get me out of here!",children:"Richard Hughes"})})]}),(0,o.jsxs)(h.gq,{children:[(0,o.jsxs)("ul",{children:[(0,o.jsxs)("li",{children:["Welcome to ",(0,o.jsx)("b",{children:"EDO SYNTH"}),", an interactive microtonal synthesiser which lets you create your own tuning systems and sounds. Here's an overview of how it works."]}),(0,o.jsxs)("li",{children:["Two sliders determine the pitches of the synth. ",(0,o.jsxs)("b",{children:[(0,o.jsx)("i",{children:" f"}),(0,o.jsx)("sub",{children:"0"})]})," is the lowest note of the scale and ",(0,o.jsx)("b",{children:"divisions"})," changes how much the octave is divided into equal parts, hence equal divisions of the octave - EDO."]}),(0,o.jsx)("li",{children:"Two octaves of your microtonal scale are generated."}),(0,o.jsx)("li",{children:"The computer keyboard can be used to play the notes. EDO SYNTH is a monotonal synthesiser, meaning only one note can be played at a time."})]}),(0,o.jsxs)("ul",{children:[(0,o.jsxs)("li",{children:["It is possible to record yourself playing and download it. Just click the ",(0,o.jsx)("b",{children:(0,o.jsx)("red",{children:"record"})})," button to begin and ",(0,o.jsx)("b",{children:"stop"})," to end the recording."]}),(0,o.jsxs)("li",{children:["The drop down menu lets you choose an ",(0,o.jsx)("b",{children:"oscillator"}),", or waveform. It determines the fundamental timbre of the synthesiser."]}),(0,o.jsxs)("li",{children:["The 8 sliders are the audio effects. They each have a definition when you hover over them. You can click and drag the sliders or you can also ",(0,o.jsx)("b",{children:"MIDI map"})," them to a device. Just click the ",(0,o.jsx)("b",{children:"map"})," button then move the knob or slider on your device you wish to be mapped. The MIDI mapping is remembered when you return, you can also remap or clear it. Make sure your MIDI device is plugged in before you load the page."]})]})]}),(0,o.jsx)(h.gq,{justify:"center",children:(0,o.jsxs)("ul",{id:"acknowledge",children:["Thanks to ",(0,o.jsx)("b",{children:(0,o.jsx)("a",{href:"https://twitter.com/rorhug",target:"_blank",children:"Rory Hughes"})})," for help with coding.",(0,o.jsx)("br",{}),"And to the Screen Dive team for helping to realise this project.",(0,o.jsx)("br",{})]})}),(0,o.jsxs)("p",{children:[(0,o.jsx)("br",{}),(0,o.jsx)("button",{id:"record",onClick:V,disabled:!S||"started"===S.recorder.state}),(0,o.jsx)("button",{id:"stopRecord",disabled:!S||"stopped"===S.recorder.state,onClick:G,children:"stop"}),g&&(0,o.jsx)("a",{id:"downloadButton",href:g,download:"EDO SYNTH - "+(new Date).toLocaleString()+".ogg",children:"download"})]}),g&&(0,o.jsx)("p",{children:(0,o.jsx)(h.zF,{controls:!0,children:(0,o.jsx)("source",{src:g,type:"audio/webm"})})}),(0,o.jsxs)(h.Z0,{p:"20px 0",justify:"space-between",children:[(0,o.jsxs)(h.X2,{children:[(0,o.jsxs)("div",{className:"tooltip slider-header",children:[(0,o.jsxs)("span",{className:"header",children:[(0,o.jsx)("i",{children:" f"}),(0,o.jsx)("sub",{children:"0"})," (Hz)"]}),(0,o.jsxs)("span",{className:"tooltiptext",children:[(0,o.jsx)("i",{children:"f"}),(0,o.jsx)("sub",{children:"0"})," is the lowest note of the scale."]})]}),(0,o.jsx)("input",{name:"f0",id:"f0",type:"text",placeholder:"e.g 110",size:"10",required:!0,className:"fundamental",value:i.toFixed(2),onChange:function(e){return r(Number(e.target.value))}}),(0,o.jsx)(h.iR,{big:!0,type:"range",min:"6050",max:"13951",value:(B=i,Math.log(B)/.00049517438),onChange:function(e){return r(function(e){return Math.exp(.00049517438*e)}(Number(e.target.value)))}})]}),(0,o.jsxs)(h.X2,{children:[(0,o.jsxs)("div",{className:"tooltip",children:[(0,o.jsx)("span",{className:"header",children:"divisions"}),(0,o.jsx)("span",{className:"tooltiptext",children:"divisions is how many times the octave will be divided equally."})]}),(0,o.jsx)("input",{name:"divisions",type:"text",placeholder:"max: 24",size:"10",required:!0,className:"fundamental",value:c,onChange:function(e){return m(Number(e.target.value))}}),(0,o.jsx)(h.iR,{big:!0,type:"range",min:"1",max:"24",value:c,className:"slider1",onChange:function(e){return m(Number(e.target.value))}})]}),L&&(0,o.jsxs)("p",{id:"invalid",children:["invalid numbers ",(0,o.jsx)("br",{}),(0,o.jsx)("br",{})," ",(0,o.jsxs)("b",{children:[(0,o.jsx)("i",{children:"f"}),(0,o.jsx)("sub",{children:"0"})]})," 20-20,000Hz | ",(0,o.jsx)("b",{children:"divisions"})," 1-24"]})]}),(0,o.jsx)(h.gq,{justify:"center",children:(0,o.jsx)(h.Z0,{p:"20px 0",mw:"990px",children:P&&Y.map((function(n,t){return(0,o.jsxs)(f.Fragment,{children:[(0,o.jsx)(h.jC,{className:Z===t&&"current",onMouseDown:e?void 0:function(){return S.synth.triggerAttack(n)},onTouchStart:e?function(){return S.synth.triggerAttack(n)}:void 0,onMouseUp:e?void 0:function(){return S.synth.triggerRelease()},onTouchEnd:e?function(){return S.synth.triggerRelease()}:void 0,onMouseLeave:e?void 0:function(){return S.synth.triggerRelease()},children:(0,o.jsx)("span",{children:P.get(x[t])})}),0===(t<24?(t+1)%12:t<44?(t-1)%11:t%44)&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(h.aw,{}),(0,o.jsx)(h.YS,{w:"".concat(t/10*30,"px")})]})]},n)}))})}),(0,o.jsxs)("div",{className:"field",children:[(0,o.jsxs)("div",{className:"tooltip",children:[(0,o.jsx)("span",{children:"oscillator"}),(0,o.jsx)("span",{className:"tooltiptext",children:"oscillator is the type of waveform which have distinct timbres."})]}),(0,o.jsxs)("select",{id:"oscillator-type",onChange:function(e){return S.synth.oscillator.type=e.target.value},children:[(0,o.jsx)("option",{value:"sine",children:"sine"}),(0,o.jsx)("option",{value:"triangle",children:"triangle"}),(0,o.jsx)("option",{value:"sawtooth",children:"sawtooth"}),(0,o.jsx)("option",{value:"square",children:"square"})]}),(0,o.jsx)("button",{onClick:function(){R([{},{}]),localStorage.removeItem("midiMap")},className:"clear midimap",children:"clear midi map"})]}),(0,o.jsx)(h.Z0,{justify:"space-between",children:Object.keys(j).map((function(e){var n=j[e],t=n.label,i=n.definition,r=n.mapping,a=n.round,c=n.device,l=n.assign,u=O[e],d=r(u);S&&l(S[c],d);var h=a?Math.round(d):d.toFixed(2);return(0,o.jsx)(b,{label:t,definition:i,displayValue:h,input:u,setInput:function(n){E(y(y({},O),{},(0,s.Z)({},e,n)))},midiInput:K&&K===e?"set":C[0][e],changeParameter:function(){return T(e)}},e)}))}),(0,o.jsx)("br",{}),(0,o.jsx)("footer",{children:"\xa9 Richard Hughes 2021"})]})};var w=function(){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,r.Z)(this,e),this.onDeviceInput=n.onDeviceInput||console.log}return(0,a.Z)(e,[{key:"start",value:function(){var e=this;return new Promise((function(n,t){e._requestAccess().then((function(t){e.initalize(t),n()})).catch((function(){return t("Something went wrong.")}))}))}},{key:"initalize",value:function(e){var n,t=m(e.inputs.values());try{for(t.s();!(n=t.n()).done;){var i=n.value;this.initalizeDevice(i)}}catch(r){t.e(r)}finally{t.f()}}},{key:"initalizeDevice",value:function(e){e.onmidimessage=this.onMessage.bind(this)}},{key:"onMessage",value:function(e){var n=(0,i.Z)(e.data,3),t=(n[0],n[1]),r=n[2];this.onDeviceInput({input:t,value:r})}},{key:"_requestAccess",value:function(){return new Promise((function(e,n){navigator.requestMIDIAccess?navigator.requestMIDIAccess().then(e).catch(n):n()}))}}]),e}()},8581:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(6124)}])}},function(e){e.O(0,[137,774,888,179],(function(){return n=8581,e(e.s=n);var n}));var n=e.O();_N_E=n}]);