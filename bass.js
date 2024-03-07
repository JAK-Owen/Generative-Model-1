class Bass {
  constructor(volume, globalKey) {
    this.params = this.generateTechnoBassParams();
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: volume + globalControls.volumes.bass,
    }).toDestination();
  }

  generateTechnoBassParams() {
    const minPitch = Tone.Frequency("F1").toMidi();
    const maxPitch = Tone.Frequency("C1").toMidi();

    return {
      pitchDecay: Math.random() * 0.01 + 0.001,
      octaves: Math.floor(Math.random() * 3) + 4,
      oscillator: { type: "sine" },
      envelope: {
        attack: Math.random() * 0.01 + 0.1,
        decay: Math.random() * 0.05 + 0.5,
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
    this.synth.triggerAttackRelease("C2", "8n", time);
  }

  createNewTechnoBass() {
    this.synth.dispose();
    this.params = this.generateTechnoBassParams();
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: volume + globalControls.volumes.bass,
    }).toDestination();
  }

  updateGlobalControls(newControls) {
    this.synth.dispose(); // Dispose the existing synth
    Object.assign(globalControls, newControls);
    this.params = this.generateTechnoBassParams();
    // Recreate the synth with updated parameters
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: volume + globalControls.volumes.bass,
    }).toDestination();
  }
}
