<script>
  import audioAPI from "../helpers/audioAPI.js";
  import songs from "../songs";

  console.log(songs);

  $: api = {
    sounds: []
  };

  audioAPI.load(["/kalimba.wav"]).then(a => {
    api = a;
  });

  $: active = [];

  const notes = 12;
  const octaves = 3;
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
      notesDict[`${n}${o}`] = note * 100 + octave * 1200;
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
        active = [];
        return;
      }

      const part = s.shift();
      if (!s.length) clearInterval(songInterval);
      active = part;
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
</script>

<style>
  .kalimba {
    margin-bottom: 40px;
    background: url(../up2_texture.jpg);
    background-size: cover;
    text-align: center;
    padding: 60px 20px 200px;
    box-shadow: 0px -13px 5px inset rgba(0, 0, 0, 0.5),
      3px 10px 15px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
  }
  .key {
    color: rgba(15, 15, 15, 0.7);
    text-align: center;
    border: 1px solid #0000003b;
    margin: 4px;
    display: inline-block;
    height: 120px;
    width: 35px;
    border-radius: 0 0 5px 5px;
    background: url(../metal_texture.jpg);
    background-size: cover;
    box-shadow: 0px -1px 7px inset #ffffff, 0px 5px 12px black;
  }
  .key:hover,
  .key[active="true"] {
    background: #aeaad8;
  }
</style>

<div>
  <button on:click={() => playSong(songs['pirates'])}>PLAY PIRATES</button>
  <button on:click={() => playSong(songs['up'])}>PLAY UP</button>
  <button on:click={() => stopSong()}>STOP SONGS</button>

  <div class="kalimba">
    {#each KKEYS as key, indx}
      <div
        class="key"
        active={active.includes(key)}
        style={`height: ${300 - KNOTES.indexOf(key) * 15}px`}
        on:mouseover={() => api.playSound(api.sounds[0], notesDict[key])}>
        {key}
      </div>
    {/each}
  </div>
</div>
