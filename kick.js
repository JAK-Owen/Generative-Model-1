// kick.js

class Kick {
  constructor(volume) {
    this.params = this.generateRandomKickParams();
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: volume + globalControls.volumes.kick,
    }).toDestination();
  }

  generateRandomKickParams() {
    const minPitch = Tone.Frequency(`${globalControls.globalKey}1`).toMidi();
    const maxPitch = Tone.Frequency(`${globalControls.globalKey}2`).toMidi();

    return {
      pitchDecay: Math.random() * 0.1 + 0.01,
      octaves: Math.floor(Math.random() * 3) + 4,
      oscillator: { type: this.randomOscillatorType() }, // Randomize oscillator type
      envelope: {
        attack: Math.random() * 0.01 + 0.001,
        decay: Math.random() * 0.2 + 0.2,
        sustain: 0,
        release: Math.random() * 0.1 + 0.01,
      },
      pitch: {
        min: minPitch,
        max: maxPitch,
      },
    };
  }

  triggerAttackRelease(time) {
    // Trigger attack release with specific note and duration
    const note = Tone.Frequency(this.params.pitch.min, "midi").toNote();
    this.synth.triggerAttackRelease(note, "8n", time);
  }

  createNewKick(volume) {
    this.synth.dispose();
    this.params = this.generateRandomKickParams();
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: volume + globalControls.volumes.kick,
    }).toDestination();
  }

  // Function to generate a random oscillator type
  randomOscillatorType() {
    const oscillatorTypes = ["sine", "triangle"];
    return oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
  }
}
