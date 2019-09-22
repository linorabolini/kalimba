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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FsaW1iYS1lZjE1OGY3Zi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvYnVmZmVyTG9hZGVyLmpzIiwiLi4vLi4vLi4vc3JjL2hlbHBlcnMvYXVkaW9BUEkuanMiLCIuLi8uLi8uLi9zcmMvc29uZ3MvcGlyYXRlcy5qcyIsIi4uLy4uLy4uL3NyYy9zb25ncy91cC5qcyIsIi4uLy4uLy4uL3NyYy9zb25ncy9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0thbGltYmEuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEJ1ZmZlckxvYWRlcihjb250ZXh0LCB1cmxMaXN0LCBjYWxsYmFjaykge1xuXHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXHR0aGlzLnVybExpc3QgPSB1cmxMaXN0O1xuXHR0aGlzLm9ubG9hZCA9IGNhbGxiYWNrO1xuXHR0aGlzLmJ1ZmZlckxpc3QgPSBuZXcgQXJyYXkoKTtcblx0dGhpcy5sb2FkQ291bnQgPSAwO1xufVxuXG5CdWZmZXJMb2FkZXIucHJvdG90eXBlLmxvYWRCdWZmZXIgPSBmdW5jdGlvbih1cmwsIGluZGV4KSB7XG5cdC8vIExvYWQgYnVmZmVyIGFzeW5jaHJvbm91c2x5XG5cdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHJlcXVlc3Qub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuXHRyZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcblxuXHR2YXIgbG9hZGVyID0gdGhpcztcblxuXHRyZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdC8vIEFzeW5jaHJvbm91c2x5IGRlY29kZSB0aGUgYXVkaW8gZmlsZSBkYXRhIGluIHJlcXVlc3QucmVzcG9uc2Vcblx0XHRsb2FkZXIuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG5cdFx0XHRyZXF1ZXN0LnJlc3BvbnNlLFxuXHRcdFx0ZnVuY3Rpb24oYnVmZmVyKSB7XG5cdFx0XHRcdGlmICghYnVmZmVyKSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJlcnJvciBkZWNvZGluZyBmaWxlIGRhdGE6IFwiICsgdXJsKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9hZGVyLmJ1ZmZlckxpc3RbaW5kZXhdID0gYnVmZmVyO1xuXHRcdFx0XHRpZiAoKytsb2FkZXIubG9hZENvdW50ID09IGxvYWRlci51cmxMaXN0Lmxlbmd0aClcblx0XHRcdFx0XHRsb2FkZXIub25sb2FkKGxvYWRlci5idWZmZXJMaXN0KTtcblx0XHRcdH0sXG5cdFx0XHRmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiZGVjb2RlQXVkaW9EYXRhIGVycm9yXCIsIGVycm9yKTtcblx0XHRcdH1cblx0XHQpO1xuXHR9O1xuXG5cdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdGFsZXJ0KFwiQnVmZmVyTG9hZGVyOiBYSFIgZXJyb3JcIik7XG5cdH07XG5cblx0cmVxdWVzdC5zZW5kKCk7XG59O1xuXG5CdWZmZXJMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVybExpc3QubGVuZ3RoOyArK2kpXG5cdFx0dGhpcy5sb2FkQnVmZmVyKHRoaXMudXJsTGlzdFtpXSwgaSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXJMb2FkZXI7XG4iLCJpbXBvcnQgQnVmZmVyTG9hZGVyIGZyb20gXCIuL2J1ZmZlckxvYWRlclwiO1xuXG5jb25zdCBhdWRpb0FQSSA9IHtcblx0Y29udGV4dDogdW5kZWZpbmVkLFxuXHRsb2FkOiBhdWRpb0ZpbGVzID0+XG5cdFx0bmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHR2YXIgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXHRcdFx0Y29uc3QgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuXHRcdFx0Y29uc3QgcGxheVNvdW5kID0gKGJ1ZmZlciwgZGV0dW5lID0gMCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpOyAvLyBjcmVhdGVzIGEgc291bmQgc291cmNlXG5cdFx0XHRcdHNvdXJjZS5idWZmZXIgPSBidWZmZXI7IC8vIHRlbGwgdGhlIHNvdXJjZSB3aGljaCBzb3VuZCB0byBwbGF5XG5cdFx0XHRcdHNvdXJjZS5kZXR1bmUudmFsdWUgPSBkZXR1bmU7XG5cdFx0XHRcdHNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pOyAvLyBjb25uZWN0IHRoZSBzb3VyY2UgdG8gdGhlIGNvbnRleHQncyBkZXN0aW5hdGlvbiAodGhlIHNwZWFrZXJzKVxuXHRcdFx0XHRzb3VyY2Uuc3RhcnQoMCk7IC8vIHBsYXkgdGhlIHNvdXJjZSBub3dcblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGJ1ZmZlckxvYWRlciA9IG5ldyBCdWZmZXJMb2FkZXIoY29udGV4dCwgYXVkaW9GaWxlcywgc291bmRzID0+XG5cdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdHNvdW5kcyxcblx0XHRcdFx0XHRjb250ZXh0LFxuXHRcdFx0XHRcdHBsYXlTb3VuZFxuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblxuXHRcdFx0YnVmZmVyTG9hZGVyLmxvYWQoKTtcblx0XHR9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXVkaW9BUEk7XG4iLCJjb25zdCBJTlRSTyA9IFtcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtcIkUzXCJdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl1cbl07XG5cbmNvbnN0IFAxX0EgPSBbW1wiQjRcIl0sIFtcIkQ0XCJdLCBbXCJFNFwiLCBcIkUzXCJdLCBbXSwgW1wiRTRcIiwgXCJHM1wiXV07XG5cbmNvbnN0IFAxID0gW1xuXHRbXCJCNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkU0XCIsIFwiRTNcIl0sXG5cdFtdLFxuXHRbXCJFNFwiLCBcIkczXCJdLFxuXHRbXSxcblx0W1wiRTRcIl0sXG5cdFtcIkYjNVwiXSxcblx0W1wiRzVcIiwgXCJDM1wiXSxcblx0W10sXG5cdFtcIkc1XCIsIFwiRTNcIl0sXG5cdFtdLFxuXHRbXCJHNVwiXSxcblx0W1wiQTVcIl0sXG5cdFtcIkQzXCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRiM0XCIsIFwiRiM1XCJdXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBbXG5cdC4uLklOVFJPLFxuXHQuLi5QMSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJENFwiXSxcblx0W1wiRTNcIiwgXCJHNFwiLCBcIkI0XCIsIFwiRDRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0Li4uUDEsXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkUzXCIsIFwiRTRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiQjRcIl0sXG5cdFtcIkQ0XCJdLFxuXHRbXCJFNFwiLCBcIkUzXCJdLFxuXHRbXSxcblx0W1wiRTRcIiwgXCJHM1wiXSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJHNVwiXSxcblx0W1wiRDNcIiwgXCJBNVwiXSxcblx0W10sXG5cdFtcIkYjNFwiLCBcIkE1XCJdLFxuXHRbXSxcblx0W1wiQTVcIl0sXG5cdFtcIkI1XCJdLFxuXHRbXCJDM1wiLCBcIkM1XCJdLFxuXHRbXSxcblx0W1wiRTNcIiwgXCJDNVwiXSxcblx0W10sXG5cdFtcIkI1XCJdLFxuXHRbXCJBNVwiXSxcblx0W1wiRTNcIiwgXCJCNVwiXSxcblx0W1wiRTRcIl0sXG5cdFtdLFxuXHRbXCJHNFwiXSxcblx0W1wiQjRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJGIzVcIl0sXG5cdFtdLFxuXHRbXCJDM1wiLCBcIkc1XCJdLFxuXHRbXSxcblx0W1wiRTRcIiwgXCJHNVwiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiRTNcIiwgXCJCNVwiXSxcblx0W1wiRTRcIl0sXG5cdFtdLFxuXHRbXCJHNFwiXSxcblx0W1wiQjRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJHNVwiXSxcblx0W10sXG5cdFtcIkQzXCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRiM0XCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJEM1wiLCBcIkYjNVwiXSwgLy8gMThcblx0W10sXG5cdFtdLFxuXHQuLi5QMSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJENFwiXSxcblx0W1wiRTNcIiwgXCJHNFwiLCBcIkI0XCIsIFwiRDRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0Li4uUDEsXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkUzXCIsIFwiRTRcIl0sXG5cdFtdLFxuXHRbXCJGIzVcIl0sIC8vIDM0XG5cdFtdLFxuXHRbXCJHNVwiLCBcIkMzXCJdLFxuXHRbXSxcblx0W1wiRzVcIiwgXCJFM1wiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiQjVcIiwgXCJFM1wiLCBcIkc0XCIsIFwiQjRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJCNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W1wiQzNcIiwgXCJFM1wiLCBcIkc0XCIsIFwiQzVcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkc1XCJdLFxuXHRbXCJFNFwiXSxcblx0W1wiQzRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiQTRcIiwgXCJGIzRcIiwgXCJEM1wiLCBcIkYjNVwiXSxcblx0W11cbl07XG4iLCJjb25zdCBzb25nID0gW1xuXHRbXCJHNVwiXSxcblx0W10sXG5cdFtcIkI1XCJdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtdLFxuXHRbXCJGIzVcIiwgXCJCNFwiLCBcIkQ0XCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkYjNVwiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiRiM1XCJdLFxuXHRbXSxcblx0W1wiRDRcIiwgXCJBNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkQ0XCJdLFxuXHRbXSxcblx0W1wiRiM1XCIsIFwiRiM0XCJdLFxuXHRbXSxcblx0W1wiRDRcIl0sXG5cdFtdLFxuXHRbXCJDNFwiLCBcIkUzXCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0W1wiQjVcIiwgXCJCNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W1wiQTVcIiwgXCJBNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W10sXG5cdFtcIkI1XCIsIFwiQjRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkE1XCIsIFwiQTRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkc1XCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuICAgIFtcIkU0XCIsIFwiRTNcIl0sXG4gICAgW10sXG5cdFtdLFxuICAgIFtdLFxuICAgIFtdLFxuXHRbXSxcblx0W10sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBzb25nO1xuIiwiaW1wb3J0IHBpcmF0ZXMgZnJvbSBcIi4vcGlyYXRlc1wiO1xuaW1wb3J0IHVwIGZyb20gXCIuL3VwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0cGlyYXRlcyxcblx0dXBcbn07XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgYXVkaW9BUEkgZnJvbSBcIi4uL2hlbHBlcnMvYXVkaW9BUEkuanNcIjtcbiAgaW1wb3J0IHNvbmdzIGZyb20gXCIuLi9zb25nc1wiO1xuXG4gIGNvbnNvbGUubG9nKHNvbmdzKTtcblxuICAkOiBhcGkgPSB7XG4gICAgc291bmRzOiBbXVxuICB9O1xuXG4gIGF1ZGlvQVBJLmxvYWQoW1wiL2thbGltYmEvbGFtMDEtdGlwLW1lZC53YXZcIl0pLnRoZW4oYSA9PiB7XG4gICAgYXBpID0gYTtcbiAgfSk7XG5cbiAgJDogYWN0aXZlID0gW107XG5cbiAgY29uc3Qgbm90ZXMgPSAxMjtcbiAgY29uc3Qgb2N0YXZlcyA9IDM7XG4gIGxldCBzb25nSW50ZXJ2YWw7XG5cbiAgY29uc3QgTk9URVMgPSBbXG4gICAgXCJGXCIsXG4gICAgXCJGI1wiLFxuICAgIFwiR1wiLFxuICAgIFwiQWJcIixcbiAgICBcIkFcIixcbiAgICBcIkJiXCIsXG4gICAgXCJCXCIsXG4gICAgXCJDXCIsXG4gICAgXCJDI1wiLFxuICAgIFwiRFwiLFxuICAgIFwiRWJcIixcbiAgICBcIkVcIlxuICBdO1xuXG4gIGNvbnN0IE9DVEFWRVMgPSBbMywgNCwgNV07XG5cbiAgY29uc3Qgbm90ZXNEaWN0ID0ge307XG5cbiAgT0NUQVZFUy5mb3JFYWNoKChvLCBvY3RhdmUpID0+IHtcbiAgICBOT1RFUy5mb3JFYWNoKChuLCBub3RlKSA9PiB7XG4gICAgICBub3Rlc0RpY3RbYCR7bn0ke299YF0gPSBub3RlICogMTAwICsgb2N0YXZlICogMTIwMDtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc29sZS5sb2cobm90ZXNEaWN0KTtcblxuICBjb25zdCBJTlRSTyA9IFtcbiAgICBbXCJFM1wiXSxcbiAgICBbXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXSxcbiAgICBbXCJFM1wiXSxcbiAgICBbXCJFM1wiXVxuICBdO1xuXG4gIGZ1bmN0aW9uIHN0b3BTb25nKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoc29uZ0ludGVydmFsKTtcbiAgfVxuICBmdW5jdGlvbiBwbGF5U29uZyhzb25nKSB7XG4gICAgY29uc3QgcyA9IFsuLi5zb25nXTtcbiAgICBsZXQgdCA9IDA7XG4gICAgY2xlYXJJbnRlcnZhbChzb25nSW50ZXJ2YWwpO1xuICAgIHNvbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHQrKztcbiAgICAgIGlmICh0ICUgMikge1xuICAgICAgICBhY3RpdmUgPSBbXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJ0ID0gcy5zaGlmdCgpO1xuICAgICAgaWYgKCFzLmxlbmd0aCkgY2xlYXJJbnRlcnZhbChzb25nSW50ZXJ2YWwpO1xuICAgICAgYWN0aXZlID0gcGFydDtcbiAgICAgIHBhcnQuZm9yRWFjaChwID0+IHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IG5vdGVzRGljdFtwXTtcbiAgICAgICAgaWYgKCFub3RlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3RlIG5vdCBmb3VuZDogXCIsIG5vdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFwaS5wbGF5U291bmQoYXBpLnNvdW5kc1swXSwgbm90ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBjb25zdCBLTk9URVMgPSBbXG4gICAgXCJDM1wiLFxuICAgIFwiRDNcIixcbiAgICBcIkUzXCIsXG4gICAgXCJGIzRcIixcbiAgICBcIkc0XCIsXG4gICAgXCJBNFwiLFxuICAgIFwiQjRcIixcbiAgICBcIkM0XCIsXG4gICAgXCJENFwiLFxuICAgIFwiRTRcIixcbiAgICBcIkYjNVwiLFxuICAgIFwiRzVcIixcbiAgICBcIkE1XCIsXG4gICAgXCJCNVwiLFxuICAgIFwiQzVcIixcbiAgICBcIkQ1XCIsXG4gICAgXCJFNVwiXG4gIF07XG5cbiAgbGV0IEtLRVlTID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgS05PVEVTLmxlbmd0aDsgaSsrKSB7XG4gICAgaSAlIDIgPyBLS0VZUy51bnNoaWZ0KEtOT1RFU1tpXSkgOiBLS0VZUy5wdXNoKEtOT1RFU1tpXSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhLS0VZUyk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAua2FsaW1iYSB7XG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLi4vdXAyX3RleHR1cmUuanBnKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiA2MHB4IDIwcHggMjAwcHg7XG4gICAgYm94LXNoYWRvdzogMHB4IC0xM3B4IDVweCBpbnNldCByZ2JhKDAsIDAsIDAsIDAuNSksXG4gICAgICAzcHggMTBweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICB9XG4gIC5rZXkge1xuICAgIGNvbG9yOiByZ2JhKDE1LCAxNSwgMTUsIDAuNyk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDAzYjtcbiAgICBtYXJnaW46IDRweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAxMjBweDtcbiAgICB3aWR0aDogMzVweDtcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLi4vbWV0YWxfdGV4dHVyZS5qcGcpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYm94LXNoYWRvdzogMHB4IC0xcHggN3B4IGluc2V0ICNmZmZmZmYsIDBweCA1cHggMTJweCBibGFjaztcbiAgfVxuICAua2V5OmhvdmVyLFxuICAua2V5W2FjdGl2ZT1cInRydWVcIl0ge1xuICAgIGJhY2tncm91bmQ6ICNhZWFhZDg7XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXY+XG4gIDxidXR0b24gb246Y2xpY2s9eygpID0+IHBsYXlTb25nKHNvbmdzWydwaXJhdGVzJ10pfT5QTEFZIFBJUkFURVM8L2J1dHRvbj5cbiAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gcGxheVNvbmcoc29uZ3NbJ3VwJ10pfT5QTEFZIFVQPC9idXR0b24+XG4gIDxidXR0b24gb246Y2xpY2s9eygpID0+IHN0b3BTb25nKCl9PlNUT1AgU09OR1M8L2J1dHRvbj5cblxuICA8ZGl2IGNsYXNzPVwia2FsaW1iYVwiPlxuICAgIHsjZWFjaCBLS0VZUyBhcyBrZXksIGluZHh9XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwia2V5XCJcbiAgICAgICAgYWN0aXZlPXthY3RpdmUuaW5jbHVkZXMoa2V5KX1cbiAgICAgICAgc3R5bGU9e2BoZWlnaHQ6ICR7MzAwIC0gS05PVEVTLmluZGV4T2Yoa2V5KSAqIDE1fXB4YH1cbiAgICAgICAgb246bW91c2VvdmVyPXsoKSA9PiBhcGkucGxheVNvdW5kKGFwaS5zb3VuZHNbMF0sIG5vdGVzRGljdFtrZXldKX0+XG4gICAgICAgIHtrZXl9XG4gICAgICA8L2Rpdj5cbiAgICB7L2VhY2h9XG4gIDwvZGl2PlxuPC9kaXY+XG4iXSwibmFtZXMiOlsidXAiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxTQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtDQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztDQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztDQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztDQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxF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QUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDO0FBQ0YsQUFFQTtBQUNBLE1BQU0sRUFBRSxHQUFHO0NBQ1YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLEtBQUssQ0FBQztDQUNQLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztDQUNiLEVBQUU7Q0FDRixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7Q0FDZCxDQUFDOztBQUVGLGNBQWU7Q0FDZCxHQUFHLEtBQUs7Q0FDUixHQUFHLEVBQUU7Q0FDTCxFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ3hCLENBQUMsSUFBSSxDQUFDO0NBQ04sRUFBRTtDQUNGLEdBQUcsRUFBRTtDQUNMLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztDQUNiLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osQ0FBQyxJQUFJLENBQUM7Q0FDTixFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxLQUFLLENBQUM7Q0FDUCxFQUFFO0NBQ0YsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLEVBQUU7Q0FDRixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixDQUFDLElBQUksQ0FBQztDQUNOLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLEVBQUU7Q0FDRixDQUFDLElBQUks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
