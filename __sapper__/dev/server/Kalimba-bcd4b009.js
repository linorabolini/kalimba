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
	map: "{\"version\":3,\"file\":\"Kalimba.svelte\",\"sources\":[\"Kalimba.svelte\"],\"sourcesContent\":[\"<script>\\n  import audioAPI from \\\"../helpers/audioAPI.js\\\";\\n  import songs from \\\"../songs\\\";\\n\\n  console.log(songs);\\n\\n  $: api = {\\n    sounds: []\\n  };\\n\\n  audioAPI.load([\\\"/kalimba.wav\\\"]).then(a => {\\n    api = a;\\n  });\\n\\n  $: active = [];\\n\\n  const notes = 12;\\n  const octaves = 3;\\n  let songInterval;\\n\\n  const NOTES = [\\n    \\\"F\\\",\\n    \\\"F#\\\",\\n    \\\"G\\\",\\n    \\\"Ab\\\",\\n    \\\"A\\\",\\n    \\\"Bb\\\",\\n    \\\"B\\\",\\n    \\\"C\\\",\\n    \\\"C#\\\",\\n    \\\"D\\\",\\n    \\\"Eb\\\",\\n    \\\"E\\\"\\n  ];\\n\\n  const OCTAVES = [3, 4, 5];\\n\\n  const notesDict = {};\\n\\n  OCTAVES.forEach((o, octave) => {\\n    NOTES.forEach((n, note) => {\\n      notesDict[`${n}${o}`] = note * 100 + octave * 1200;\\n    });\\n  });\\n\\n  function stopSong() {\\n    clearInterval(songInterval);\\n  }\\n\\n  function playSong(song) {\\n    const s = [...song];\\n    let t = 0;\\n    clearInterval(songInterval);\\n    songInterval = setInterval(() => {\\n      t++;\\n      if (t % 2) {\\n        active = [];\\n        return;\\n      }\\n\\n      const part = s.shift();\\n      if (!s.length) clearInterval(songInterval);\\n      active = part;\\n      part.forEach(p => {\\n        const note = notesDict[p];\\n        if (!note) {\\n          console.log(\\\"Note not found: \\\", note);\\n        } else {\\n          api.playSound(api.sounds[0], note);\\n        }\\n      });\\n    }, 100);\\n  }\\n\\n  const KNOTES = [\\n    \\\"C3\\\",\\n    \\\"D3\\\",\\n    \\\"E3\\\",\\n    \\\"F#4\\\",\\n    \\\"G4\\\",\\n    \\\"A4\\\",\\n    \\\"B4\\\",\\n    \\\"C4\\\",\\n    \\\"D4\\\",\\n    \\\"E4\\\",\\n    \\\"F#5\\\",\\n    \\\"G5\\\",\\n    \\\"A5\\\",\\n    \\\"B5\\\",\\n    \\\"C5\\\",\\n    \\\"D5\\\",\\n    \\\"E5\\\"\\n  ];\\n\\n  let KKEYS = [];\\n  for (let i = 0; i < KNOTES.length; i++) {\\n    i % 2 ? KKEYS.unshift(KNOTES[i]) : KKEYS.push(KNOTES[i]);\\n  }\\n\\n  console.log(KKEYS);\\n</script>\\n\\n<style>\\n  .kalimba {\\n    margin-bottom: 40px;\\n    background: url(../up2_texture.jpg);\\n    background-size: cover;\\n    text-align: center;\\n    padding: 60px 20px 200px;\\n    box-shadow: 0px -13px 5px inset rgba(0, 0, 0, 0.5),\\n      3px 10px 15px rgba(0, 0, 0, 0.4);\\n    border-radius: 20px;\\n  }\\n  .key {\\n    color: rgba(15, 15, 15, 0.7);\\n    text-align: center;\\n    border: 1px solid #0000003b;\\n    margin: 4px;\\n    display: inline-block;\\n    height: 120px;\\n    width: 35px;\\n    border-radius: 0 0 5px 5px;\\n    background: url(../metal_texture.jpg);\\n    background-size: cover;\\n    box-shadow: 0px -1px 7px inset #ffffff, 0px 5px 12px black;\\n  }\\n  .key:hover,\\n  .key[active=\\\"true\\\"] {\\n    background: #aeaad8;\\n  }\\n</style>\\n\\n<div>\\n  <button on:click={() => playSong(songs['pirates'])}>PLAY PIRATES</button>\\n  <button on:click={() => playSong(songs['up'])}>PLAY UP</button>\\n  <button on:click={() => stopSong()}>STOP SONGS</button>\\n\\n  <div class=\\\"kalimba\\\">\\n    {#each KKEYS as key, indx}\\n      <div\\n        class=\\\"key\\\"\\n        active={active.includes(key)}\\n        style={`height: ${300 - KNOTES.indexOf(key) * 15}px`}\\n        on:mouseover={() => api.playSound(api.sounds[0], notesDict[key])}>\\n        {key}\\n      </div>\\n    {/each}\\n  </div>\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAuGE,QAAQ,cAAC,CAAC,AACR,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,kBAAkB,CAAC,CACnC,eAAe,CAAE,KAAK,CACtB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,KAAK,CACxB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;MACjD,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAClC,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAC5B,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,SAAS,CAC3B,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAC1B,UAAU,CAAE,IAAI,oBAAoB,CAAC,CACrC,eAAe,CAAE,KAAK,CACtB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,AAC5D,CAAC,AACD,kBAAI,MAAM,CACV,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,cAAC,CAAC,AACnB,UAAU,CAAE,OAAO,AACrB,CAAC\"}"
};

const Kalimba = index.create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

  console.log(songs);

  audioAPI.load(["/kalimba.wav"]).then(a => {
  });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FsaW1iYS1iY2Q0YjAwOS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvYnVmZmVyTG9hZGVyLmpzIiwiLi4vLi4vLi4vc3JjL2hlbHBlcnMvYXVkaW9BUEkuanMiLCIuLi8uLi8uLi9zcmMvc29uZ3MvcGlyYXRlcy5qcyIsIi4uLy4uLy4uL3NyYy9zb25ncy91cC5qcyIsIi4uLy4uLy4uL3NyYy9zb25ncy9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0thbGltYmEuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEJ1ZmZlckxvYWRlcihjb250ZXh0LCB1cmxMaXN0LCBjYWxsYmFjaykge1xuXHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXHR0aGlzLnVybExpc3QgPSB1cmxMaXN0O1xuXHR0aGlzLm9ubG9hZCA9IGNhbGxiYWNrO1xuXHR0aGlzLmJ1ZmZlckxpc3QgPSBuZXcgQXJyYXkoKTtcblx0dGhpcy5sb2FkQ291bnQgPSAwO1xufVxuXG5CdWZmZXJMb2FkZXIucHJvdG90eXBlLmxvYWRCdWZmZXIgPSBmdW5jdGlvbih1cmwsIGluZGV4KSB7XG5cdC8vIExvYWQgYnVmZmVyIGFzeW5jaHJvbm91c2x5XG5cdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHJlcXVlc3Qub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuXHRyZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcblxuXHR2YXIgbG9hZGVyID0gdGhpcztcblxuXHRyZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdC8vIEFzeW5jaHJvbm91c2x5IGRlY29kZSB0aGUgYXVkaW8gZmlsZSBkYXRhIGluIHJlcXVlc3QucmVzcG9uc2Vcblx0XHRsb2FkZXIuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG5cdFx0XHRyZXF1ZXN0LnJlc3BvbnNlLFxuXHRcdFx0ZnVuY3Rpb24oYnVmZmVyKSB7XG5cdFx0XHRcdGlmICghYnVmZmVyKSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJlcnJvciBkZWNvZGluZyBmaWxlIGRhdGE6IFwiICsgdXJsKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9hZGVyLmJ1ZmZlckxpc3RbaW5kZXhdID0gYnVmZmVyO1xuXHRcdFx0XHRpZiAoKytsb2FkZXIubG9hZENvdW50ID09IGxvYWRlci51cmxMaXN0Lmxlbmd0aClcblx0XHRcdFx0XHRsb2FkZXIub25sb2FkKGxvYWRlci5idWZmZXJMaXN0KTtcblx0XHRcdH0sXG5cdFx0XHRmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiZGVjb2RlQXVkaW9EYXRhIGVycm9yXCIsIGVycm9yKTtcblx0XHRcdH1cblx0XHQpO1xuXHR9O1xuXG5cdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdGFsZXJ0KFwiQnVmZmVyTG9hZGVyOiBYSFIgZXJyb3JcIik7XG5cdH07XG5cblx0cmVxdWVzdC5zZW5kKCk7XG59O1xuXG5CdWZmZXJMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVybExpc3QubGVuZ3RoOyArK2kpXG5cdFx0dGhpcy5sb2FkQnVmZmVyKHRoaXMudXJsTGlzdFtpXSwgaSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXJMb2FkZXI7XG4iLCJpbXBvcnQgQnVmZmVyTG9hZGVyIGZyb20gXCIuL2J1ZmZlckxvYWRlclwiO1xuXG5jb25zdCBhdWRpb0FQSSA9IHtcblx0Y29udGV4dDogdW5kZWZpbmVkLFxuXHRsb2FkOiBhdWRpb0ZpbGVzID0+XG5cdFx0bmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHR2YXIgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXHRcdFx0Y29uc3QgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuXHRcdFx0Y29uc3QgcGxheVNvdW5kID0gKGJ1ZmZlciwgZGV0dW5lID0gMCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpOyAvLyBjcmVhdGVzIGEgc291bmQgc291cmNlXG5cdFx0XHRcdHNvdXJjZS5idWZmZXIgPSBidWZmZXI7IC8vIHRlbGwgdGhlIHNvdXJjZSB3aGljaCBzb3VuZCB0byBwbGF5XG5cdFx0XHRcdHNvdXJjZS5kZXR1bmUudmFsdWUgPSBkZXR1bmU7XG5cdFx0XHRcdHNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pOyAvLyBjb25uZWN0IHRoZSBzb3VyY2UgdG8gdGhlIGNvbnRleHQncyBkZXN0aW5hdGlvbiAodGhlIHNwZWFrZXJzKVxuXHRcdFx0XHRzb3VyY2Uuc3RhcnQoMCk7IC8vIHBsYXkgdGhlIHNvdXJjZSBub3dcblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGJ1ZmZlckxvYWRlciA9IG5ldyBCdWZmZXJMb2FkZXIoY29udGV4dCwgYXVkaW9GaWxlcywgc291bmRzID0+XG5cdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdHNvdW5kcyxcblx0XHRcdFx0XHRjb250ZXh0LFxuXHRcdFx0XHRcdHBsYXlTb3VuZFxuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblxuXHRcdFx0YnVmZmVyTG9hZGVyLmxvYWQoKTtcblx0XHR9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXVkaW9BUEk7XG4iLCJjb25zdCBJTlRSTyA9IFtcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtcIkUzXCJdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl1cbl07XG5cbmNvbnN0IFAxX0EgPSBbW1wiQjRcIl0sIFtcIkQ0XCJdLCBbXCJFNFwiLCBcIkUzXCJdLCBbXSwgW1wiRTRcIiwgXCJHM1wiXV07XG5cbmNvbnN0IFAxID0gW1xuXHRbXCJCNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkU0XCIsIFwiRTNcIl0sXG5cdFtdLFxuXHRbXCJFNFwiLCBcIkczXCJdLFxuXHRbXSxcblx0W1wiRTRcIl0sXG5cdFtcIkYjNVwiXSxcblx0W1wiRzVcIiwgXCJDM1wiXSxcblx0W10sXG5cdFtcIkc1XCIsIFwiRTNcIl0sXG5cdFtdLFxuXHRbXCJHNVwiXSxcblx0W1wiQTVcIl0sXG5cdFtcIkQzXCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRiM0XCIsIFwiRiM1XCJdXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBbXG5cdC4uLklOVFJPLFxuXHQuLi5QMSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJENFwiXSxcblx0W1wiRTNcIiwgXCJHNFwiLCBcIkI0XCIsIFwiRDRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0Li4uUDEsXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkUzXCIsIFwiRTRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiQjRcIl0sXG5cdFtcIkQ0XCJdLFxuXHRbXCJFNFwiLCBcIkUzXCJdLFxuXHRbXSxcblx0W1wiRTRcIiwgXCJHM1wiXSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJHNVwiXSxcblx0W1wiRDNcIiwgXCJBNVwiXSxcblx0W10sXG5cdFtcIkYjNFwiLCBcIkE1XCJdLFxuXHRbXSxcblx0W1wiQTVcIl0sXG5cdFtcIkI1XCJdLFxuXHRbXCJDM1wiLCBcIkM1XCJdLFxuXHRbXSxcblx0W1wiRTNcIiwgXCJDNVwiXSxcblx0W10sXG5cdFtcIkI1XCJdLFxuXHRbXCJBNVwiXSxcblx0W1wiRTNcIiwgXCJCNVwiXSxcblx0W1wiRTRcIl0sXG5cdFtdLFxuXHRbXCJHNFwiXSxcblx0W1wiQjRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJGIzVcIl0sXG5cdFtdLFxuXHRbXCJDM1wiLCBcIkc1XCJdLFxuXHRbXSxcblx0W1wiRTRcIiwgXCJHNVwiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiRTNcIiwgXCJCNVwiXSxcblx0W1wiRTRcIl0sXG5cdFtdLFxuXHRbXCJHNFwiXSxcblx0W1wiQjRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJHNVwiXSxcblx0W10sXG5cdFtcIkQzXCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRiM0XCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJEM1wiLCBcIkYjNVwiXSwgLy8gMThcblx0W10sXG5cdFtdLFxuXHQuLi5QMSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJENFwiXSxcblx0W1wiRTNcIiwgXCJHNFwiLCBcIkI0XCIsIFwiRDRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0Li4uUDEsXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkUzXCIsIFwiRTRcIl0sXG5cdFtdLFxuXHRbXCJGIzVcIl0sIC8vIDM0XG5cdFtdLFxuXHRbXCJHNVwiLCBcIkMzXCJdLFxuXHRbXSxcblx0W1wiRzVcIiwgXCJFM1wiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiQjVcIiwgXCJFM1wiLCBcIkc0XCIsIFwiQjRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJCNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W1wiQzNcIiwgXCJFM1wiLCBcIkc0XCIsIFwiQzVcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkc1XCJdLFxuXHRbXCJFNFwiXSxcblx0W1wiQzRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiQTRcIiwgXCJGIzRcIiwgXCJEM1wiLCBcIkYjNVwiXSxcblx0W11cbl07XG4iLCJjb25zdCBzb25nID0gW1xuXHRbXCJHNVwiXSxcblx0W10sXG5cdFtcIkI1XCJdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtdLFxuXHRbXCJGIzVcIiwgXCJCNFwiLCBcIkQ0XCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkYjNVwiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiRiM1XCJdLFxuXHRbXSxcblx0W1wiRDRcIiwgXCJBNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkQ0XCJdLFxuXHRbXSxcblx0W1wiRiM1XCIsIFwiRiM0XCJdLFxuXHRbXSxcblx0W1wiRDRcIl0sXG5cdFtdLFxuXHRbXCJDNFwiLCBcIkUzXCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0W1wiQjVcIiwgXCJCNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W1wiQTVcIiwgXCJBNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W10sXG5cdFtcIkI1XCIsIFwiQjRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkE1XCIsIFwiQTRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkc1XCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuICAgIFtcIkU0XCIsIFwiRTNcIl0sXG4gICAgW10sXG5cdFtdLFxuICAgIFtdLFxuICAgIFtdLFxuXHRbXSxcblx0W10sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBzb25nO1xuIiwiaW1wb3J0IHBpcmF0ZXMgZnJvbSBcIi4vcGlyYXRlc1wiO1xuaW1wb3J0IHVwIGZyb20gXCIuL3VwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0cGlyYXRlcyxcblx0dXBcbn07XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgYXVkaW9BUEkgZnJvbSBcIi4uL2hlbHBlcnMvYXVkaW9BUEkuanNcIjtcbiAgaW1wb3J0IHNvbmdzIGZyb20gXCIuLi9zb25nc1wiO1xuXG4gIGNvbnNvbGUubG9nKHNvbmdzKTtcblxuICAkOiBhcGkgPSB7XG4gICAgc291bmRzOiBbXVxuICB9O1xuXG4gIGF1ZGlvQVBJLmxvYWQoW1wiL2thbGltYmEud2F2XCJdKS50aGVuKGEgPT4ge1xuICAgIGFwaSA9IGE7XG4gIH0pO1xuXG4gICQ6IGFjdGl2ZSA9IFtdO1xuXG4gIGNvbnN0IG5vdGVzID0gMTI7XG4gIGNvbnN0IG9jdGF2ZXMgPSAzO1xuICBsZXQgc29uZ0ludGVydmFsO1xuXG4gIGNvbnN0IE5PVEVTID0gW1xuICAgIFwiRlwiLFxuICAgIFwiRiNcIixcbiAgICBcIkdcIixcbiAgICBcIkFiXCIsXG4gICAgXCJBXCIsXG4gICAgXCJCYlwiLFxuICAgIFwiQlwiLFxuICAgIFwiQ1wiLFxuICAgIFwiQyNcIixcbiAgICBcIkRcIixcbiAgICBcIkViXCIsXG4gICAgXCJFXCJcbiAgXTtcblxuICBjb25zdCBPQ1RBVkVTID0gWzMsIDQsIDVdO1xuXG4gIGNvbnN0IG5vdGVzRGljdCA9IHt9O1xuXG4gIE9DVEFWRVMuZm9yRWFjaCgobywgb2N0YXZlKSA9PiB7XG4gICAgTk9URVMuZm9yRWFjaCgobiwgbm90ZSkgPT4ge1xuICAgICAgbm90ZXNEaWN0W2Ake259JHtvfWBdID0gbm90ZSAqIDEwMCArIG9jdGF2ZSAqIDEyMDA7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHN0b3BTb25nKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoc29uZ0ludGVydmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXlTb25nKHNvbmcpIHtcbiAgICBjb25zdCBzID0gWy4uLnNvbmddO1xuICAgIGxldCB0ID0gMDtcbiAgICBjbGVhckludGVydmFsKHNvbmdJbnRlcnZhbCk7XG4gICAgc29uZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdCsrO1xuICAgICAgaWYgKHQgJSAyKSB7XG4gICAgICAgIGFjdGl2ZSA9IFtdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnQgPSBzLnNoaWZ0KCk7XG4gICAgICBpZiAoIXMubGVuZ3RoKSBjbGVhckludGVydmFsKHNvbmdJbnRlcnZhbCk7XG4gICAgICBhY3RpdmUgPSBwYXJ0O1xuICAgICAgcGFydC5mb3JFYWNoKHAgPT4ge1xuICAgICAgICBjb25zdCBub3RlID0gbm90ZXNEaWN0W3BdO1xuICAgICAgICBpZiAoIW5vdGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGUgbm90IGZvdW5kOiBcIiwgbm90ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBpLnBsYXlTb3VuZChhcGkuc291bmRzWzBdLCBub3RlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIGNvbnN0IEtOT1RFUyA9IFtcbiAgICBcIkMzXCIsXG4gICAgXCJEM1wiLFxuICAgIFwiRTNcIixcbiAgICBcIkYjNFwiLFxuICAgIFwiRzRcIixcbiAgICBcIkE0XCIsXG4gICAgXCJCNFwiLFxuICAgIFwiQzRcIixcbiAgICBcIkQ0XCIsXG4gICAgXCJFNFwiLFxuICAgIFwiRiM1XCIsXG4gICAgXCJHNVwiLFxuICAgIFwiQTVcIixcbiAgICBcIkI1XCIsXG4gICAgXCJDNVwiLFxuICAgIFwiRDVcIixcbiAgICBcIkU1XCJcbiAgXTtcblxuICBsZXQgS0tFWVMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBLTk9URVMubGVuZ3RoOyBpKyspIHtcbiAgICBpICUgMiA/IEtLRVlTLnVuc2hpZnQoS05PVEVTW2ldKSA6IEtLRVlTLnB1c2goS05PVEVTW2ldKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKEtLRVlTKTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIC5rYWxpbWJhIHtcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICAgIGJhY2tncm91bmQ6IHVybCguLi91cDJfdGV4dHVyZS5qcGcpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDYwcHggMjBweCAyMDBweDtcbiAgICBib3gtc2hhZG93OiAwcHggLTEzcHggNXB4IGluc2V0IHJnYmEoMCwgMCwgMCwgMC41KSxcbiAgICAgIDNweCAxMHB4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIH1cbiAgLmtleSB7XG4gICAgY29sb3I6IHJnYmEoMTUsIDE1LCAxNSwgMC43KTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDNiO1xuICAgIG1hcmdpbjogNHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIHdpZHRoOiAzNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDAgMCA1cHggNXB4O1xuICAgIGJhY2tncm91bmQ6IHVybCguLi9tZXRhbF90ZXh0dXJlLmpwZyk7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBib3gtc2hhZG93OiAwcHggLTFweCA3cHggaW5zZXQgI2ZmZmZmZiwgMHB4IDVweCAxMnB4IGJsYWNrO1xuICB9XG4gIC5rZXk6aG92ZXIsXG4gIC5rZXlbYWN0aXZlPVwidHJ1ZVwiXSB7XG4gICAgYmFja2dyb3VuZDogI2FlYWFkODtcbiAgfVxuPC9zdHlsZT5cblxuPGRpdj5cbiAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gcGxheVNvbmcoc29uZ3NbJ3BpcmF0ZXMnXSl9PlBMQVkgUElSQVRFUzwvYnV0dG9uPlxuICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiBwbGF5U29uZyhzb25nc1sndXAnXSl9PlBMQVkgVVA8L2J1dHRvbj5cbiAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gc3RvcFNvbmcoKX0+U1RPUCBTT05HUzwvYnV0dG9uPlxuXG4gIDxkaXYgY2xhc3M9XCJrYWxpbWJhXCI+XG4gICAgeyNlYWNoIEtLRVlTIGFzIGtleSwgaW5keH1cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJrZXlcIlxuICAgICAgICBhY3RpdmU9e2FjdGl2ZS5pbmNsdWRlcyhrZXkpfVxuICAgICAgICBzdHlsZT17YGhlaWdodDogJHszMDAgLSBLTk9URVMuaW5kZXhPZihrZXkpICogMTV9cHhgfVxuICAgICAgICBvbjptb3VzZW92ZXI9eygpID0+IGFwaS5wbGF5U291bmQoYXBpLnNvdW5kc1swXSwgbm90ZXNEaWN0W2tleV0pfT5cbiAgICAgICAge2tleX1cbiAgICAgIDwvZGl2PlxuICAgIHsvZWFjaH1cbiAgPC9kaXY+XG48L2Rpdj5cbiJdLCJuYW1lcyI6WyJ1cCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFNBQVMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO0NBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO0NBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztDQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUNuQjs7QUFFRCxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUU7O0NBRXhELElBQUksT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7Q0FDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQy9CLE9BQU8sQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDOztDQUVyQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7O0NBRWxCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVzs7RUFFM0Is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QUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixFQUFFO0NBQ0YsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixDQUFDLElBQUksQ0FBQztDQUNOLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLEtBQUssQ0FBQztDQUNQLEVBQUU7Q0FDRixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixFQUFFO0NBQ0YsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sRUFBRTtDQUNGLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLENBQUMsSUFBSSxDQUFDO0NBQ04sRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxDQUFDO0NBQ04sRUFBRTtDQUNGLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztDQUNiLEVBQUU7Q0FDRixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7Q0FDZCxFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztDQUNiLEVBQUU7Q0FDRixFQUFFO0NBQ0YsR0FBRyxFQUFFO0NBQ0wsRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztDQUN4QixDQUFDLElBQUksQ0FBQztDQUNOLEVBQUU7Q0FDRixHQUFHLEVBQUU7Q0FDTCxF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
