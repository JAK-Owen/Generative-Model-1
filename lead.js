class Lead {
  constructor(volume, globalKey) {
    this.rootNote = globalKey + '3'; // Setting the root note based on the global key
    this.scale = this.generateMinorTriad(globalKey); // Generating the minor triad based on the global key
    this.synth = new Tone.PolySynth().toDestination(); // Creating a polyphonic synthesizer

    // Setting volume of the synthesizer
    this.synth.volume.value = volume + globalControls.volumes.lead;

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
    return minorTriad.map(index => notes[index] + '3');
  }

  // Method to generate a random melody using notes from the minor triad
  generateRandomMelody() {
    // Logic to generate a random melody using notes from the minor triad
    const melodyLength = globalControls.patternLength * this.scale.length;
    const pattern = Array.from({ length: melodyLength }, (_, index) => this.scale[index % this.scale.length]);
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
    // Play the arpeggiated melody with a tone.js sequence
    const sequence = new Tone.Sequence((time, note) => {
      this.synth.triggerAttackRelease(note, '8n', time);
    }, this.melody).start();
  }
}
