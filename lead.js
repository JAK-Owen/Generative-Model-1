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

  generateRandomMelody() {
    // Logic to generate a random melody using notes from the minor triad
    const melodyLength = globalControls.patternLength * 3; // Limit to 3 notes per pattern
    const octaves = ['3', '4', '5'];
    const pattern = Array.from({ length: melodyLength }, () => {
        const numNotes = Math.floor(Math.random() * 3) + 1; // Randomly choose 1 to 3 notes
        const selectedNotes = [];
        for (let i = 0; i < numNotes; i++) {
            const randomNote = this.scale[Math.floor(Math.random() * this.scale.length)];
            const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
            selectedNotes.push(randomNote + randomOctave);
        }
        return selectedNotes;
    });
    return pattern.flat(); // Flatten the array
}


  // Method to arpeggiate the melody
  arpeggiateMelody() {
    // Logic to arpeggiate the melody
    // Example: Spread out the notes in the melody to create an arpeggio effect
    this.melody = this.melody.flatMap((note, index) => [note, note, note]);
  }

  playMelody() {
    const loopLength = globalControls.patternLength * this.melody.length * (1 / 8); // Calculate loop length based on melody length
    const sequence = new Tone.Sequence((time, note) => {
        this.synth.triggerAttackRelease(note, '8n', time);
    }, this.melody, '2n.').start(0);
    
    // Set loop parameters
    sequence.loop = true;
    sequence.loopEnd = `0:${loopLength}`;
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

// Use the Lead class directly in your application without exporting

// Example usage:
// const lead = new Lead(0, 'C');
