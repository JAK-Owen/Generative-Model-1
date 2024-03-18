class Lead {
  constructor(volume, globalKey) {
    this.rootNote = globalKey + '3';
    this.scale = this.generateMinorTriad(globalKey);
    this.synth = new Tone.PolySynth().toDestination();
    this.synth.volume.value = volume + globalControls.volumes.lead;
    this.randomizeSynthParams();
    this.generateRandomMelody(); // Generate melody when instantiated
    this.arpeggiateMelody();
    this.playMelody();
  }

  generateMinorTriad(rootNote) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(rootNote.charAt(0).toUpperCase() + rootNote.slice(1));
    const minorTriad = [rootIndex, (rootIndex + 3) % 12, (rootIndex + 7) % 12];
    return minorTriad.map(index => notes[index]);
  }

  generateRandomMelody() {
    const melodyLength = globalControls.patternLength * 3;
    const octaves = ['3', '4', '5'];

    // Generate a new melody pattern only if it doesn't exist
    if (!this.melody) {
      const pattern = Array.from({ length: melodyLength }, () => {
        const numNotes = Math.floor(Math.random() * 3) + 1;
        const selectedNotes = [];
        for (let i = 0; i < numNotes; i++) {
          const randomNote = this.scale[Math.floor(Math.random() * this.scale.length)];
          const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
          selectedNotes.push(randomNote + randomOctave);
        }
        return selectedNotes;
      });
      this.melody = pattern.flat(); // Flatten the array
    }
  }

  arpeggiateMelody() {
    this.melody = this.melody.flatMap((note, index) => [note, note, note]);
  }

  playMelody() {
    const loopLength = globalControls.patternLength * this.melody.length;
    const tempo = Tone.Transport.bpm.value;
    const noteDuration = (60 / tempo) / 1; // Convert to seconds

    // Create a sequence to hold the melody
    const sequence = new Tone.Sequence((time, note) => {
        this.synth.triggerAttackRelease(note, '8n', time);
    }, this.melody).start(0);

    // Set the loop
    sequence.loop = true;
    sequence.loopEnd = loopLength;

    // Start the transport
    Tone.Transport.start();
}


  randomizeNoteDuration() {
    const noteDurations = ['16n', '8n'];
    return noteDurations[Math.floor(Math.random() * noteDurations.length)];
  }

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

// Usage
// const lead = new Lead(0, 'C');
