import BufferLoader from "./bufferLoader";

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

export default audioAPI;
