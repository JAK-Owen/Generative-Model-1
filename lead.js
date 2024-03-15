class Lead {
  constructor(volume, globalKey) {
    this.rootNote = globalKey + '3'; // Setting the root note based on the global key
    this.scale = this.generateMinorTriad(globalKey); // Generating the minor triad based on the global key
    this.synth = new Tone.PolySynth().toDestination(); // Creating a polyphonic synthesizer

    // Setting volume of the synthesizer
    this.synth.volume.value = volume + globalControls.volumes.lead;

    // Randomize synth parameters
    this.randomizeSynthParams();

    // Generate random melody
    this.melody = this.generateRandomMelody();

    // Arpeggiate the melody
    this.arpeggiateMelody();

    // Start playing the melody
    this.playMelody();
  }

  // Method to generate the minor triad based on the root note
  generateMinorTriad(rootNote) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(rootNote.charAt(0).toUpperCase() + rootNote.slice(1));
    const minorTriad = [rootIndex, (rootIndex + 3) % 12, (rootIndex + 7) % 12]; // Minor triad pattern
    return minorTriad.map(index => notes[index]);
  }

  // Method to generate a random melody using notes from the minor triad
  generateRandomMelody() {
    // Logic to generate a random melody using notes from the minor triad
    const melodyLength = globalControls.patternLength * this.scale.length;
    const octaves = ['3', '4', '5'];
    const pattern = Array.from({ length: melodyLength }, () => {
      const randomNote = this.scale[Math.floor(Math.random() * this.scale.length)];
      const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
      return randomNote + randomOctave;
    });
    return pattern;
  }

  // Method to arpeggiate the melody
  arpeggiateMelody() {
    // Logic to arpeggiate the melody
    // Example: Spread out the notes in the melody to create an arpeggio effect
    this.melody = this.melody.flatMap((note, index) => [note, note, note]);
  }

  // Method to play the melody
  playMelody() {
    // Play the melody with a polyrhythmic pattern
    const polyrhythm = [3, 4, 5, 6]; // Define polyrhythmic divisions
    const subdivision = polyrhythm[Math.floor(Math.random() * polyrhythm.length)]; // Randomly select subdivision
    const sequence = new Tone.Sequence((time, note) => {
      this.synth.triggerAttackRelease(note, '8n', time);
    }, this.melody, `1:${subdivision}`).start();
  }

  // Method to randomize synthesizer parameters
  randomizeSynthParams() {
    const oscillatorTypes = ['sine', 'triangle', 'sawtooth', 'square'];
    const randomOscillatorType = oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];

    const minHarmonicity = 0.5;
    const maxHarmonicity = 2.5;
    const randomHarmonicity = Math.random() * (maxHarmonicity - minHarmonicity) + minHarmonicity;

    const minFrequency = 200;
    const maxFrequency = 2000;
    const randomFrequency = Math.random() * (maxFrequency - minFrequency) + minFrequency;

    const minDecay = 0.5;
    const maxDecay = 10;
    const randomDecay = Math.random() * (maxDecay - minDecay) + minDecay;

    const minDelayTime = 0.1;
    const maxDelayTime = 0.6;
    const randomDelayTime = Math.random() * (maxDelayTime - minDelayTime) + minDelayTime;

    const minFeedback = 0.1;
    const maxFeedback = 0.5;
    const randomFeedback = Math.random() * (maxFeedback - minFeedback) + minFeedback;

    // Set synth parameters
    this.synth.set({
      oscillator: {
        type: randomOscillatorType,
        harmonicity: randomHarmonicity,
      },
      filter: {
        frequency: randomFrequency,
      },
      envelope: {
        decay: randomDecay,
      },
      delayTime: randomDelayTime,
      feedback: randomFeedback,
    });
  }
}
