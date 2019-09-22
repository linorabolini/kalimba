'use strict';

var index = require('./index-6b73da11.js');

function BufferLoader(context, urlList, callback) {
	this.context = context;
	this.urlList = urlList;
	this.onload = callback;
	this.bufferList = new Array();
	this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	var loader = this;

	request.onload = function() {
		// Asynchronously decode the audio file data in request.response
		loader.context.decodeAudioData(
			request.response,
			function(buffer) {
				if (!buffer) {
					alert("error decoding file data: " + url);
					return;
				}
				loader.bufferList[index] = buffer;
				if (++loader.loadCount == loader.urlList.length)
					loader.onload(loader.bufferList);
			},
			function(error) {
				console.error("decodeAudioData error", error);
			}
		);
	};

	request.onerror = function() {
		alert("BufferLoader: XHR error");
	};

	request.send();
};

BufferLoader.prototype.load = function() {
	for (var i = 0; i < this.urlList.length; ++i)
		this.loadBuffer(this.urlList[i], i);
};

const audioAPI = {
	context: undefined,
	load: audioFiles =>
		new Promise(resolve => {
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			const context = new AudioContext();

			const playSound = (buffer, detune = 0) => {
				const source = context.createBufferSource(); // creates a sound source
				source.buffer = buffer; // tell the source which sound to play
				source.detune.value = detune;
				source.connect(context.destination); // connect the source to the context's destination (the speakers)
				source.start(0); // play the source now
			};

			const bufferLoader = new BufferLoader(context, audioFiles, sounds =>
				resolve({
					sounds,
					context,
					playSound
				})
			);

			bufferLoader.load();
		})
};

const INTRO = [
	["E3"],
	[],
	["E3"],
	["E3"],
	[],
	["E3"],
	["E3"],
	[],
	["E3"],
	["E3"],
	["E3"],
	["E3"],
	["E3"],
	[],
	["E3"],
	["E3"],
	[],
	["E3"],
	["E3"]
];

const P1 = [
	["B4"],
	["D4"],
	["E4", "E3"],
	[],
	["E4", "G3"],
	[],
	["E4"],
	["F#5"],
	["G5", "C3"],
	[],
	["G5", "E3"],
	[],
	["G5"],
	["A5"],
	["D3", "F#5"],
	[],
	["F#4", "F#5"]
];

var pirates = [
	...INTRO,
	...P1,
	[],
	["E4"],
	["D4"],
	["E3", "G4", "B4", "D4"],
	["E4"],
	[],
	...P1,
	[],
	["E4"],
	["D4"],
	["E3", "E4"],
	[],
	[],
	["B4"],
	["D4"],
	["E4", "E3"],
	[],
	["E4", "G3"],
	[],
	["E4"],
	["G5"],
	["D3", "A5"],
	[],
	["F#4", "A5"],
	[],
	["A5"],
	["B5"],
	["C3", "C5"],
	[],
	["E3", "C5"],
	[],
	["B5"],
	["A5"],
	["E3", "B5"],
	["E4"],
	[],
	["G4"],
	["B4"],
	["E4"],
	["F#5"],
	[],
	["C3", "G5"],
	[],
	["E4", "G5"],
	[],
	["A5"],
	[],
	["E3", "B5"],
	["E4"],
	[],
	["G4"],
	["B4"],
	["E4"],
	["G5"],
	[],
	["D3", "F#5"],
	[],
	["F#4", "F#5"],
	[],
	["G5"],
	["E4"],
	["D3", "F#5"], // 18
	[],
	[],
	...P1,
	[],
	["E4"],
	["D4"],
	["E3", "G4", "B4", "D4"],
	["E4"],
	[],
	...P1,
	[],
	["E4"],
	["D4"],
	["E3", "E4"],
	[],
	["F#5"], // 34
	[],
	["G5", "C3"],
	[],
	["G5", "E3"],
	[],
	["A5"],
	[],
	["B5", "E3", "G4", "B4"],
	[],
	[],
	["G5"],
	["E4"],
	["B4"],
	[],
	[],
	[],
	["C3", "E3", "G4", "C5"],
	[],
	[],
	[],
	["G5"],
	["E4"],
	["C4"],
	[],
	[],
	["A4", "F#4", "D3", "F#5"],
	[]
];

const song = [
	["G5"],
	[],
	["B5"],
	[],
	["G5"],
	[],
	["F#5", "B4", "D4"],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	["F#5"],
	[],
	["A5"],
	[],
	["F#5"],
	[],
	["D4", "A4"],
	[],
	[],
	[],
	[],
	["D4"],
	[],
	["F#5", "F#4"],
	[],
	["D4"],
	[],
	["C4", "E3"],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	["E4"],
	[],
	["B5", "B4"],
	[],
	[],
	[],
	["A5", "A4"],
	[],
	[],
	[],
	[],
	[],
	["E4"],
	[],
	["B5", "B4"],
	[],
	[],
	[],
	["A5", "A4"],
	[],
	[],
	[],
	["G5"],
	[],
	[],
	[],
    ["E4", "E3"],
    [],
	[],
    [],
    [],
	[],
	[],
];

var songs = {
	pirates,
	up: song
};

/* src/components/Kalimba.svelte generated by Svelte v3.12.1 */

const css = {
	code: ".kalimba.svelte-bbsc4h{margin-bottom:40px;background:url(../up2_texture.jpg);background-size:cover;text-align:center;padding:60px 20px 200px;box-shadow:0px -13px 5px inset rgba(0, 0, 0, 0.5),\n      3px 10px 15px rgba(0, 0, 0, 0.4);border-radius:20px}.key.svelte-bbsc4h{color:rgba(15, 15, 15, 0.7);text-align:center;border:1px solid #0000003b;margin:4px;display:inline-block;height:120px;width:35px;border-radius:0 0 5px 5px;background:url(../metal_texture.jpg);background-size:cover;box-shadow:0px -1px 7px inset #ffffff, 0px 5px 12px black}.key.svelte-bbsc4h:hover,.key[active=\"true\"].svelte-bbsc4h{background:#aeaad8}",
	map: "{\"version\":3,\"file\":\"Kalimba.svelte\",\"sources\":[\"Kalimba.svelte\"],\"sourcesContent\":[\"<script>\\n  import audioAPI from \\\"../helpers/audioAPI.js\\\";\\n  import songs from \\\"../songs\\\";\\n\\n  console.log(songs);\\n\\n  $: api = {\\n    sounds: []\\n  };\\n\\n  audioAPI.load([\\\"/kalimba/lam01-tip-med.wav\\\"]).then(a => {\\n    api = a;\\n  });\\n\\n  $: active = [];\\n\\n  const notes = 12;\\n  const octaves = 3;\\n  let songInterval;\\n\\n  const NOTES = [\\n    \\\"F\\\",\\n    \\\"F#\\\",\\n    \\\"G\\\",\\n    \\\"Ab\\\",\\n    \\\"A\\\",\\n    \\\"Bb\\\",\\n    \\\"B\\\",\\n    \\\"C\\\",\\n    \\\"C#\\\",\\n    \\\"D\\\",\\n    \\\"Eb\\\",\\n    \\\"E\\\"\\n  ];\\n\\n  const OCTAVES = [3, 4, 5];\\n\\n  const notesDict = {};\\n\\n  OCTAVES.forEach((o, octave) => {\\n    NOTES.forEach((n, note) => {\\n      notesDict[`${n}${o}`] = note * 100 + octave * 1200;\\n    });\\n  });\\n\\n  console.log(notesDict);\\n\\n  const INTRO = [\\n    [\\\"E3\\\"],\\n    [],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"],\\n    [],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"],\\n    [],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"],\\n    [],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"],\\n    [],\\n    [\\\"E3\\\"],\\n    [\\\"E3\\\"]\\n  ];\\n\\n  function stopSong() {\\n    clearInterval(songInterval);\\n  }\\n  function playSong(song) {\\n    const s = [...song];\\n    let t = 0;\\n    clearInterval(songInterval);\\n    songInterval = setInterval(() => {\\n      t++;\\n      if (t % 2) {\\n        active = [];\\n        return;\\n      }\\n\\n      const part = s.shift();\\n      if (!s.length) clearInterval(songInterval);\\n      active = part;\\n      part.forEach(p => {\\n        const note = notesDict[p];\\n        if (!note) {\\n          console.log(\\\"Note not found: \\\", note);\\n        } else {\\n          api.playSound(api.sounds[0], note);\\n        }\\n      });\\n    }, 100);\\n  }\\n\\n  const KNOTES = [\\n    \\\"C3\\\",\\n    \\\"D3\\\",\\n    \\\"E3\\\",\\n    \\\"F#4\\\",\\n    \\\"G4\\\",\\n    \\\"A4\\\",\\n    \\\"B4\\\",\\n    \\\"C4\\\",\\n    \\\"D4\\\",\\n    \\\"E4\\\",\\n    \\\"F#5\\\",\\n    \\\"G5\\\",\\n    \\\"A5\\\",\\n    \\\"B5\\\",\\n    \\\"C5\\\",\\n    \\\"D5\\\",\\n    \\\"E5\\\"\\n  ];\\n\\n  let KKEYS = [];\\n  for (let i = 0; i < KNOTES.length; i++) {\\n    i % 2 ? KKEYS.unshift(KNOTES[i]) : KKEYS.push(KNOTES[i]);\\n  }\\n\\n  console.log(KKEYS);\\n</script>\\n\\n<style>\\n  .kalimba {\\n    margin-bottom: 40px;\\n    background: url(../up2_texture.jpg);\\n    background-size: cover;\\n    text-align: center;\\n    padding: 60px 20px 200px;\\n    box-shadow: 0px -13px 5px inset rgba(0, 0, 0, 0.5),\\n      3px 10px 15px rgba(0, 0, 0, 0.4);\\n    border-radius: 20px;\\n  }\\n  .key {\\n    color: rgba(15, 15, 15, 0.7);\\n    text-align: center;\\n    border: 1px solid #0000003b;\\n    margin: 4px;\\n    display: inline-block;\\n    height: 120px;\\n    width: 35px;\\n    border-radius: 0 0 5px 5px;\\n    background: url(../metal_texture.jpg);\\n    background-size: cover;\\n    box-shadow: 0px -1px 7px inset #ffffff, 0px 5px 12px black;\\n  }\\n  .key:hover,\\n  .key[active=\\\"true\\\"] {\\n    background: #aeaad8;\\n  }\\n</style>\\n\\n<div>\\n  <button on:click={() => playSong(songs['pirates'])}>PLAY PIRATES</button>\\n  <button on:click={() => playSong(songs['up'])}>PLAY UP</button>\\n  <button on:click={() => stopSong()}>STOP SONGS</button>\\n\\n  <div class=\\\"kalimba\\\">\\n    {#each KKEYS as key, indx}\\n      <div\\n        class=\\\"key\\\"\\n        active={active.includes(key)}\\n        style={`height: ${300 - KNOTES.indexOf(key) * 15}px`}\\n        on:mouseover={() => api.playSound(api.sounds[0], notesDict[key])}>\\n        {key}\\n      </div>\\n    {/each}\\n  </div>\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA8HE,QAAQ,cAAC,CAAC,AACR,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,kBAAkB,CAAC,CACnC,eAAe,CAAE,KAAK,CACtB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,KAAK,CACxB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;MACjD,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAClC,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAC5B,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,SAAS,CAC3B,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAC1B,UAAU,CAAE,IAAI,oBAAoB,CAAC,CACrC,eAAe,CAAE,KAAK,CACtB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,AAC5D,CAAC,AACD,kBAAI,MAAM,CACV,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,cAAC,CAAC,AACnB,UAAU,CAAE,OAAO,AACrB,CAAC\"}"
};

const Kalimba = index.create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

  console.log(songs);

  audioAPI.load(["/kalimba/lam01-tip-med.wav"]).then(a => {
  });

  const NOTES = [
    "F",
    "F#",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
    "C",
    "C#",
    "D",
    "Eb",
    "E"
  ];

  const OCTAVES = [3, 4, 5];

  const notesDict = {};

  OCTAVES.forEach((o, octave) => {
    NOTES.forEach((n, note) => {
      notesDict[`${n}${o}`] = note * 100 + octave * 1200;
    });
  });

  console.log(notesDict);

  const KNOTES = [
    "C3",
    "D3",
    "E3",
    "F#4",
    "G4",
    "A4",
    "B4",
    "C4",
    "D4",
    "E4",
    "F#5",
    "G5",
    "A5",
    "B5",
    "C5",
    "D5",
    "E5"
  ];

  let KKEYS = [];
  for (let i = 0; i < KNOTES.length; i++) {
    i % 2 ? KKEYS.unshift(KNOTES[i]) : KKEYS.push(KNOTES[i]);
  }

  console.log(KKEYS);

	$$result.css.add(css);
	let active = [];

	return `<div>
	  <button>PLAY PIRATES</button>
	  <button>PLAY UP</button>
	  <button>STOP SONGS</button>

	  <div class="kalimba svelte-bbsc4h">
	    ${index.each(KKEYS, (key, indx) => `<div class="key svelte-bbsc4h"${index.add_attribute("active", active.includes(key), 0)}${index.add_attribute("style", `height: ${300 - KNOTES.indexOf(key) * 15}px`, 0)}>
	        ${index.escape(key)}
	      </div>`)}
	  </div>
	</div>`;
});

exports.default = Kalimba;
