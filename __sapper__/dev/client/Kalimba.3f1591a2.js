import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, e as element, p as text, v as space, a as claim_element, b as children, q as claim_text, x as claim_space, f as detach_dev, g as attr_dev, h as add_location, H as listen_dev, j as insert_dev, r as append_dev, n as noop, I as destroy_each, J as run_all } from './index.e016ec25.js';

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

const file = "src/components/Kalimba.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.key = list[i];
	child_ctx.indx = i;
	return child_ctx;
}

// (139:4) {#each KKEYS as key, indx}
function create_each_block(ctx) {
	var div, t0_value = ctx.key + "", t0, t1, div_active_value, dispose;

	function mouseover_handler() {
		return ctx.mouseover_handler(ctx);
	}

	const block = {
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			this.h();
		},

		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, active: true, style: true }, false);
			var div_nodes = children(div);

			t0 = claim_text(div_nodes, t0_value);
			t1 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},

		h: function hydrate() {
			attr_dev(div, "class", "key svelte-bbsc4h");
			attr_dev(div, "active", div_active_value = ctx.active.includes(ctx.key));
			attr_dev(div, "style", `height: ${300 - ctx.KNOTES.indexOf(ctx.key) * 15}px`);
			add_location(div, file, 139, 6, 2587);
			dispose = listen_dev(div, "mouseover", mouseover_handler);
		},

		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t0);
			append_dev(div, t1);
		},

		p: function update(changed, new_ctx) {
			ctx = new_ctx;
			if ((changed.active) && div_active_value !== (div_active_value = ctx.active.includes(ctx.key))) {
				attr_dev(div, "active", div_active_value);
			}
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			dispose();
		}
	};
	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(139:4) {#each KKEYS as key, indx}", ctx });
	return block;
}

function create_fragment(ctx) {
	var div1, button0, t0, t1, button1, t2, t3, button2, t4, t5, div0, dispose;

	let each_value = ctx.KKEYS;

	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div1 = element("div");
			button0 = element("button");
			t0 = text("PLAY PIRATES");
			t1 = space();
			button1 = element("button");
			t2 = text("PLAY UP");
			t3 = space();
			button2 = element("button");
			t4 = text("STOP SONGS");
			t5 = space();
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
			this.h();
		},

		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", {}, false);
			var div1_nodes = children(div1);

			button0 = claim_element(div1_nodes, "BUTTON", {}, false);
			var button0_nodes = children(button0);

			t0 = claim_text(button0_nodes, "PLAY PIRATES");
			button0_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);

			button1 = claim_element(div1_nodes, "BUTTON", {}, false);
			var button1_nodes = children(button1);

			t2 = claim_text(button1_nodes, "PLAY UP");
			button1_nodes.forEach(detach_dev);
			t3 = claim_space(div1_nodes);

			button2 = claim_element(div1_nodes, "BUTTON", {}, false);
			var button2_nodes = children(button2);

			t4 = claim_text(button2_nodes, "STOP SONGS");
			button2_nodes.forEach(detach_dev);
			t5 = claim_space(div1_nodes);

			div0 = claim_element(div1_nodes, "DIV", { class: true }, false);
			var div0_nodes = children(div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div0_nodes);
			}

			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},

		h: function hydrate() {
			add_location(button0, file, 133, 2, 2327);
			add_location(button1, file, 134, 2, 2403);
			add_location(button2, file, 135, 2, 2469);
			attr_dev(div0, "class", "kalimba svelte-bbsc4h");
			add_location(div0, file, 137, 2, 2528);
			add_location(div1, file, 132, 0, 2319);

			dispose = [
				listen_dev(button0, "click", ctx.click_handler),
				listen_dev(button1, "click", ctx.click_handler_1),
				listen_dev(button2, "click", ctx.click_handler_2)
			];
		},

		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, button0);
			append_dev(button0, t0);
			append_dev(div1, t1);
			append_dev(div1, button1);
			append_dev(button1, t2);
			append_dev(div1, t3);
			append_dev(div1, button2);
			append_dev(button2, t4);
			append_dev(div1, t5);
			append_dev(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}
		},

		p: function update(changed, ctx) {
			if (changed.active || changed.KKEYS || changed.KNOTES) {
				each_value = ctx.KKEYS;

				let i;
				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}
				each_blocks.length = each_value.length;
			}
		},

		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div1);
			}

			destroy_each(each_blocks, detaching);

			run_all(dispose);
		}
	};
	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
	return block;
}

function instance($$self, $$props, $$invalidate) {
	

  console.log(songs);

  audioAPI.load(["/Misiones.wav"]).then(a => {
    $$invalidate('api', api = a);
  });
  let songInterval;

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
      $$invalidate('notesDict', notesDict[`${n}${o}`] = note * 100 + octave * 1200, notesDict);
    });
  });

  function stopSong() {
    clearInterval(songInterval);
  }

  function playSong(song) {
    const s = [...song];
    let t = 0;
    clearInterval(songInterval);
    songInterval = setInterval(() => {
      t++;
      if (t % 2) {
        $$invalidate('active', active = []);
        return;
      }

      const part = s.shift();
      if (!s.length) clearInterval(songInterval);
      $$invalidate('active', active = part);
      part.forEach(p => {
        const note = notesDict[p];
        if (!note) {
          console.log("Note not found: ", note);
        } else {
          api.playSound(api.sounds[0], note);
        }
      });
    }, 100);
  }

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

	const click_handler = () => playSong(songs['pirates']);

	const click_handler_1 = () => playSong(songs['up']);

	const click_handler_2 = () => stopSong();

	const mouseover_handler = ({ key }) => api.playSound(api.sounds[0], notesDict[key]);

	$$self.$capture_state = () => {
		return {};
	};

	$$self.$inject_state = $$props => {
		if ('songInterval' in $$props) songInterval = $$props.songInterval;
		if ('KKEYS' in $$props) $$invalidate('KKEYS', KKEYS = $$props.KKEYS);
		if ('api' in $$props) $$invalidate('api', api = $$props.api);
		if ('active' in $$props) $$invalidate('active', active = $$props.active);
	};

	let api, active;

	$$invalidate('api', api = {
        sounds: []
      });
	$$invalidate('active', active = []);

	return {
		notesDict,
		stopSong,
		playSong,
		KNOTES,
		KKEYS,
		api,
		active,
		click_handler,
		click_handler_1,
		click_handler_2,
		mouseover_handler
	};
}

class Kalimba extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Kalimba", options, id: create_fragment.name });
	}
}

export default Kalimba;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FsaW1iYS4zZjE1OTFhMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvYnVmZmVyTG9hZGVyLmpzIiwiLi4vLi4vLi4vc3JjL2hlbHBlcnMvYXVkaW9BUEkuanMiLCIuLi8uLi8uLi9zcmMvc29uZ3MvcGlyYXRlcy5qcyIsIi4uLy4uLy4uL3NyYy9zb25ncy91cC5qcyIsIi4uLy4uLy4uL3NyYy9zb25ncy9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0thbGltYmEuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEJ1ZmZlckxvYWRlcihjb250ZXh0LCB1cmxMaXN0LCBjYWxsYmFjaykge1xuXHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXHR0aGlzLnVybExpc3QgPSB1cmxMaXN0O1xuXHR0aGlzLm9ubG9hZCA9IGNhbGxiYWNrO1xuXHR0aGlzLmJ1ZmZlckxpc3QgPSBuZXcgQXJyYXkoKTtcblx0dGhpcy5sb2FkQ291bnQgPSAwO1xufVxuXG5CdWZmZXJMb2FkZXIucHJvdG90eXBlLmxvYWRCdWZmZXIgPSBmdW5jdGlvbih1cmwsIGluZGV4KSB7XG5cdC8vIExvYWQgYnVmZmVyIGFzeW5jaHJvbm91c2x5XG5cdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHJlcXVlc3Qub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuXHRyZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcblxuXHR2YXIgbG9hZGVyID0gdGhpcztcblxuXHRyZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdC8vIEFzeW5jaHJvbm91c2x5IGRlY29kZSB0aGUgYXVkaW8gZmlsZSBkYXRhIGluIHJlcXVlc3QucmVzcG9uc2Vcblx0XHRsb2FkZXIuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG5cdFx0XHRyZXF1ZXN0LnJlc3BvbnNlLFxuXHRcdFx0ZnVuY3Rpb24oYnVmZmVyKSB7XG5cdFx0XHRcdGlmICghYnVmZmVyKSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJlcnJvciBkZWNvZGluZyBmaWxlIGRhdGE6IFwiICsgdXJsKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9hZGVyLmJ1ZmZlckxpc3RbaW5kZXhdID0gYnVmZmVyO1xuXHRcdFx0XHRpZiAoKytsb2FkZXIubG9hZENvdW50ID09IGxvYWRlci51cmxMaXN0Lmxlbmd0aClcblx0XHRcdFx0XHRsb2FkZXIub25sb2FkKGxvYWRlci5idWZmZXJMaXN0KTtcblx0XHRcdH0sXG5cdFx0XHRmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiZGVjb2RlQXVkaW9EYXRhIGVycm9yXCIsIGVycm9yKTtcblx0XHRcdH1cblx0XHQpO1xuXHR9O1xuXG5cdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdGFsZXJ0KFwiQnVmZmVyTG9hZGVyOiBYSFIgZXJyb3JcIik7XG5cdH07XG5cblx0cmVxdWVzdC5zZW5kKCk7XG59O1xuXG5CdWZmZXJMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVybExpc3QubGVuZ3RoOyArK2kpXG5cdFx0dGhpcy5sb2FkQnVmZmVyKHRoaXMudXJsTGlzdFtpXSwgaSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXJMb2FkZXI7XG4iLCJpbXBvcnQgQnVmZmVyTG9hZGVyIGZyb20gXCIuL2J1ZmZlckxvYWRlclwiO1xuXG5jb25zdCBhdWRpb0FQSSA9IHtcblx0Y29udGV4dDogdW5kZWZpbmVkLFxuXHRsb2FkOiBhdWRpb0ZpbGVzID0+XG5cdFx0bmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHR2YXIgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXHRcdFx0Y29uc3QgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuXHRcdFx0Y29uc3QgcGxheVNvdW5kID0gKGJ1ZmZlciwgZGV0dW5lID0gMCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpOyAvLyBjcmVhdGVzIGEgc291bmQgc291cmNlXG5cdFx0XHRcdHNvdXJjZS5idWZmZXIgPSBidWZmZXI7IC8vIHRlbGwgdGhlIHNvdXJjZSB3aGljaCBzb3VuZCB0byBwbGF5XG5cdFx0XHRcdHNvdXJjZS5kZXR1bmUudmFsdWUgPSBkZXR1bmU7XG5cdFx0XHRcdHNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pOyAvLyBjb25uZWN0IHRoZSBzb3VyY2UgdG8gdGhlIGNvbnRleHQncyBkZXN0aW5hdGlvbiAodGhlIHNwZWFrZXJzKVxuXHRcdFx0XHRzb3VyY2Uuc3RhcnQoMCk7IC8vIHBsYXkgdGhlIHNvdXJjZSBub3dcblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGJ1ZmZlckxvYWRlciA9IG5ldyBCdWZmZXJMb2FkZXIoY29udGV4dCwgYXVkaW9GaWxlcywgc291bmRzID0+XG5cdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdHNvdW5kcyxcblx0XHRcdFx0XHRjb250ZXh0LFxuXHRcdFx0XHRcdHBsYXlTb3VuZFxuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblxuXHRcdFx0YnVmZmVyTG9hZGVyLmxvYWQoKTtcblx0XHR9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXVkaW9BUEk7XG4iLCJjb25zdCBJTlRSTyA9IFtcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtcIkUzXCJdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl0sXG5cdFtdLFxuXHRbXCJFM1wiXSxcblx0W1wiRTNcIl1cbl07XG5cbmNvbnN0IFAxX0EgPSBbW1wiQjRcIl0sIFtcIkQ0XCJdLCBbXCJFNFwiLCBcIkUzXCJdLCBbXSwgW1wiRTRcIiwgXCJHM1wiXV07XG5cbmNvbnN0IFAxID0gW1xuXHRbXCJCNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkU0XCIsIFwiRTNcIl0sXG5cdFtdLFxuXHRbXCJFNFwiLCBcIkczXCJdLFxuXHRbXSxcblx0W1wiRTRcIl0sXG5cdFtcIkYjNVwiXSxcblx0W1wiRzVcIiwgXCJDM1wiXSxcblx0W10sXG5cdFtcIkc1XCIsIFwiRTNcIl0sXG5cdFtdLFxuXHRbXCJHNVwiXSxcblx0W1wiQTVcIl0sXG5cdFtcIkQzXCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRiM0XCIsIFwiRiM1XCJdXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBbXG5cdC4uLklOVFJPLFxuXHQuLi5QMSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJENFwiXSxcblx0W1wiRTNcIiwgXCJHNFwiLCBcIkI0XCIsIFwiRDRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0Li4uUDEsXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkUzXCIsIFwiRTRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiQjRcIl0sXG5cdFtcIkQ0XCJdLFxuXHRbXCJFNFwiLCBcIkUzXCJdLFxuXHRbXSxcblx0W1wiRTRcIiwgXCJHM1wiXSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJHNVwiXSxcblx0W1wiRDNcIiwgXCJBNVwiXSxcblx0W10sXG5cdFtcIkYjNFwiLCBcIkE1XCJdLFxuXHRbXSxcblx0W1wiQTVcIl0sXG5cdFtcIkI1XCJdLFxuXHRbXCJDM1wiLCBcIkM1XCJdLFxuXHRbXSxcblx0W1wiRTNcIiwgXCJDNVwiXSxcblx0W10sXG5cdFtcIkI1XCJdLFxuXHRbXCJBNVwiXSxcblx0W1wiRTNcIiwgXCJCNVwiXSxcblx0W1wiRTRcIl0sXG5cdFtdLFxuXHRbXCJHNFwiXSxcblx0W1wiQjRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJGIzVcIl0sXG5cdFtdLFxuXHRbXCJDM1wiLCBcIkc1XCJdLFxuXHRbXSxcblx0W1wiRTRcIiwgXCJHNVwiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiRTNcIiwgXCJCNVwiXSxcblx0W1wiRTRcIl0sXG5cdFtdLFxuXHRbXCJHNFwiXSxcblx0W1wiQjRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJHNVwiXSxcblx0W10sXG5cdFtcIkQzXCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRiM0XCIsIFwiRiM1XCJdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJEM1wiLCBcIkYjNVwiXSwgLy8gMThcblx0W10sXG5cdFtdLFxuXHQuLi5QMSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXCJENFwiXSxcblx0W1wiRTNcIiwgXCJHNFwiLCBcIkI0XCIsIFwiRDRcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0Li4uUDEsXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W1wiRDRcIl0sXG5cdFtcIkUzXCIsIFwiRTRcIl0sXG5cdFtdLFxuXHRbXCJGIzVcIl0sIC8vIDM0XG5cdFtdLFxuXHRbXCJHNVwiLCBcIkMzXCJdLFxuXHRbXSxcblx0W1wiRzVcIiwgXCJFM1wiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiQjVcIiwgXCJFM1wiLCBcIkc0XCIsIFwiQjRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtcIkU0XCJdLFxuXHRbXCJCNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W1wiQzNcIiwgXCJFM1wiLCBcIkc0XCIsIFwiQzVcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkc1XCJdLFxuXHRbXCJFNFwiXSxcblx0W1wiQzRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W1wiQTRcIiwgXCJGIzRcIiwgXCJEM1wiLCBcIkYjNVwiXSxcblx0W11cbl07XG4iLCJjb25zdCBzb25nID0gW1xuXHRbXCJHNVwiXSxcblx0W10sXG5cdFtcIkI1XCJdLFxuXHRbXSxcblx0W1wiRzVcIl0sXG5cdFtdLFxuXHRbXCJGIzVcIiwgXCJCNFwiLCBcIkQ0XCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkYjNVwiXSxcblx0W10sXG5cdFtcIkE1XCJdLFxuXHRbXSxcblx0W1wiRiM1XCJdLFxuXHRbXSxcblx0W1wiRDRcIiwgXCJBNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkQ0XCJdLFxuXHRbXSxcblx0W1wiRiM1XCIsIFwiRiM0XCJdLFxuXHRbXSxcblx0W1wiRDRcIl0sXG5cdFtdLFxuXHRbXCJDNFwiLCBcIkUzXCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkU0XCJdLFxuXHRbXSxcblx0W1wiQjVcIiwgXCJCNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W1wiQTVcIiwgXCJBNFwiXSxcblx0W10sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuXHRbXCJFNFwiXSxcblx0W10sXG5cdFtcIkI1XCIsIFwiQjRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkE1XCIsIFwiQTRcIl0sXG5cdFtdLFxuXHRbXSxcblx0W10sXG5cdFtcIkc1XCJdLFxuXHRbXSxcblx0W10sXG5cdFtdLFxuICAgIFtcIkU0XCIsIFwiRTNcIl0sXG4gICAgW10sXG5cdFtdLFxuICAgIFtdLFxuICAgIFtdLFxuXHRbXSxcblx0W10sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBzb25nO1xuIiwiaW1wb3J0IHBpcmF0ZXMgZnJvbSBcIi4vcGlyYXRlc1wiO1xuaW1wb3J0IHVwIGZyb20gXCIuL3VwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0cGlyYXRlcyxcblx0dXBcbn07XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgYXVkaW9BUEkgZnJvbSBcIi4uL2hlbHBlcnMvYXVkaW9BUEkuanNcIjtcbiAgaW1wb3J0IHNvbmdzIGZyb20gXCIuLi9zb25nc1wiO1xuXG4gIGNvbnNvbGUubG9nKHNvbmdzKTtcblxuICAkOiBhcGkgPSB7XG4gICAgc291bmRzOiBbXVxuICB9O1xuXG4gIGF1ZGlvQVBJLmxvYWQoW1wiL01pc2lvbmVzLndhdlwiXSkudGhlbihhID0+IHtcbiAgICBhcGkgPSBhO1xuICB9KTtcblxuICAkOiBhY3RpdmUgPSBbXTtcblxuICBjb25zdCBub3RlcyA9IDEyO1xuICBjb25zdCBvY3RhdmVzID0gMztcbiAgbGV0IHNvbmdJbnRlcnZhbDtcblxuICBjb25zdCBOT1RFUyA9IFtcbiAgICBcIkZcIixcbiAgICBcIkYjXCIsXG4gICAgXCJHXCIsXG4gICAgXCJBYlwiLFxuICAgIFwiQVwiLFxuICAgIFwiQmJcIixcbiAgICBcIkJcIixcbiAgICBcIkNcIixcbiAgICBcIkMjXCIsXG4gICAgXCJEXCIsXG4gICAgXCJFYlwiLFxuICAgIFwiRVwiXG4gIF07XG5cbiAgY29uc3QgT0NUQVZFUyA9IFszLCA0LCA1XTtcblxuICBjb25zdCBub3Rlc0RpY3QgPSB7fTtcblxuICBPQ1RBVkVTLmZvckVhY2goKG8sIG9jdGF2ZSkgPT4ge1xuICAgIE5PVEVTLmZvckVhY2goKG4sIG5vdGUpID0+IHtcbiAgICAgIG5vdGVzRGljdFtgJHtufSR7b31gXSA9IG5vdGUgKiAxMDAgKyBvY3RhdmUgKiAxMjAwO1xuICAgIH0pO1xuICB9KTtcblxuICBmdW5jdGlvbiBzdG9wU29uZygpIHtcbiAgICBjbGVhckludGVydmFsKHNvbmdJbnRlcnZhbCk7XG4gIH1cblxuICBmdW5jdGlvbiBwbGF5U29uZyhzb25nKSB7XG4gICAgY29uc3QgcyA9IFsuLi5zb25nXTtcbiAgICBsZXQgdCA9IDA7XG4gICAgY2xlYXJJbnRlcnZhbChzb25nSW50ZXJ2YWwpO1xuICAgIHNvbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHQrKztcbiAgICAgIGlmICh0ICUgMikge1xuICAgICAgICBhY3RpdmUgPSBbXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJ0ID0gcy5zaGlmdCgpO1xuICAgICAgaWYgKCFzLmxlbmd0aCkgY2xlYXJJbnRlcnZhbChzb25nSW50ZXJ2YWwpO1xuICAgICAgYWN0aXZlID0gcGFydDtcbiAgICAgIHBhcnQuZm9yRWFjaChwID0+IHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IG5vdGVzRGljdFtwXTtcbiAgICAgICAgaWYgKCFub3RlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3RlIG5vdCBmb3VuZDogXCIsIG5vdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFwaS5wbGF5U291bmQoYXBpLnNvdW5kc1swXSwgbm90ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBjb25zdCBLTk9URVMgPSBbXG4gICAgXCJDM1wiLFxuICAgIFwiRDNcIixcbiAgICBcIkUzXCIsXG4gICAgXCJGIzRcIixcbiAgICBcIkc0XCIsXG4gICAgXCJBNFwiLFxuICAgIFwiQjRcIixcbiAgICBcIkM0XCIsXG4gICAgXCJENFwiLFxuICAgIFwiRTRcIixcbiAgICBcIkYjNVwiLFxuICAgIFwiRzVcIixcbiAgICBcIkE1XCIsXG4gICAgXCJCNVwiLFxuICAgIFwiQzVcIixcbiAgICBcIkQ1XCIsXG4gICAgXCJFNVwiXG4gIF07XG5cbiAgbGV0IEtLRVlTID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgS05PVEVTLmxlbmd0aDsgaSsrKSB7XG4gICAgaSAlIDIgPyBLS0VZUy51bnNoaWZ0KEtOT1RFU1tpXSkgOiBLS0VZUy5wdXNoKEtOT1RFU1tpXSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhLS0VZUyk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAua2FsaW1iYSB7XG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLi4vdXAyX3RleHR1cmUuanBnKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiA2MHB4IDIwcHggMjAwcHg7XG4gICAgYm94LXNoYWRvdzogMHB4IC0xM3B4IDVweCBpbnNldCByZ2JhKDAsIDAsIDAsIDAuNSksXG4gICAgICAzcHggMTBweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICB9XG4gIC5rZXkge1xuICAgIGNvbG9yOiByZ2JhKDE1LCAxNSwgMTUsIDAuNyk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDAzYjtcbiAgICBtYXJnaW46IDRweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAxMjBweDtcbiAgICB3aWR0aDogMzVweDtcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLi4vbWV0YWxfdGV4dHVyZS5qcGcpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYm94LXNoYWRvdzogMHB4IC0xcHggN3B4IGluc2V0ICNmZmZmZmYsIDBweCA1cHggMTJweCBibGFjaztcbiAgfVxuICAua2V5OmhvdmVyLFxuICAua2V5W2FjdGl2ZT1cInRydWVcIl0ge1xuICAgIGJhY2tncm91bmQ6ICNhZWFhZDg7XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXY+XG4gIDxidXR0b24gb246Y2xpY2s9eygpID0+IHBsYXlTb25nKHNvbmdzWydwaXJhdGVzJ10pfT5QTEFZIFBJUkFURVM8L2J1dHRvbj5cbiAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gcGxheVNvbmcoc29uZ3NbJ3VwJ10pfT5QTEFZIFVQPC9idXR0b24+XG4gIDxidXR0b24gb246Y2xpY2s9eygpID0+IHN0b3BTb25nKCl9PlNUT1AgU09OR1M8L2J1dHRvbj5cblxuICA8ZGl2IGNsYXNzPVwia2FsaW1iYVwiPlxuICAgIHsjZWFjaCBLS0VZUyBhcyBrZXksIGluZHh9XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwia2V5XCJcbiAgICAgICAgYWN0aXZlPXthY3RpdmUuaW5jbHVkZXMoa2V5KX1cbiAgICAgICAgc3R5bGU9e2BoZWlnaHQ6ICR7MzAwIC0gS05PVEVTLmluZGV4T2Yoa2V5KSAqIDE1fXB4YH1cbiAgICAgICAgb246bW91c2VvdmVyPXsoKSA9PiBhcGkucGxheVNvdW5kKGFwaS5zb3VuZHNbMF0sIG5vdGVzRGljdFtrZXldKX0+XG4gICAgICAgIHtrZXl9XG4gICAgICA8L2Rpdj5cbiAgICB7L2VhY2h9XG4gIDwvZGl2PlxuPC9kaXY+XG4iXSwibmFtZXMiOlsidXAiXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBUyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7Q0FDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7Q0FDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0NBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0NBQ25COztBQUVELFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsR0FBRyxFQUFFLEtBQUssRUFBRTs7Q0FFeEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztDQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDL0IsT0FBTyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7O0NBRXJDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7Q0FFbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFXOztFQUUzQixN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R0FBRztDQUNWLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixFQUFFO0NBQ0YsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxLQUFLLENBQUM7Q0FDUCxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixFQUFFO0NBQ0YsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7Q0FDYixFQUFFO0NBQ0YsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0NBQ2QsQ0FBQzs7QUFFRixjQUFlO0NBQ2QsR0FBRyxLQUFLO0NBQ1IsR0FBRyxFQUFFO0NBQ0wsRUFBRTtDQUNGLENBQUMsSUFBSSxDQUFDO0NBQ04sQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztDQUN4QixDQUFDLElBQUksQ0FBQztDQUNOLEVBQUU7Q0FDRixHQUFHLEVBQUU7Q0FDTCxFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Q0FDWixFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUM7Q0FDTixDQUFDLElBQUksQ0FBQztDQUNOLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUNaLEVBQUU7Q0FDRixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7Q0FDYixFQUFFO0NBQ0YsQ0FB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QUFDO0dBQ1Q7O0VBRUQsTUFBTSxNQUFNLEdBQUc7SUFDYixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixLQUFLO0lBQ0wsSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osS0FBSztJQUNMLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtHQUNMLENBQUM7O0VBRUYsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0VBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDMUQ7O0VBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBN0ZoQixHQUFHLEdBQUc7UUFDUCxNQUFNLEVBQUUsRUFBRTtRQUNYLENBQUM7d0JBTUMsTUFBTSxHQUFHLEdBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9