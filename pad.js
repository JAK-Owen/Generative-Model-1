class Pad {
  constructor(volume, globalKey) {
    this.effectRack = new Tone.Filter({
      type: 'lowpass',
      frequency: 400,
      rolloff: -12,
    }).toDestination();

    const highPassFilter = new Tone.Filter({
      type: 'highpass',
      frequency: 500,
      rolloff: -12,
    });

    const reverb = new Tone.Reverb({
      decay: Math.random() * 10 + 1,
      wet: 0.9,
    }).toDestination();

    const delay = new Tone.FeedbackDelay({
      wet: 0.5,
      delayTime: Math.random() * 0.5 + 0.1,
      feedback: Math.random() * 0.5,
    }).toDestination();

    this.effectRack.chain(reverb, delay, highPassFilter);

    this.synth = new Tone.PolySynth().connect(this.effectRack);
    this.synth.volume.value = volume + globalControls.volumes.pad;
    this.globalKey = globalKey;
    this.note = [this.globalKey + '2', this.globalKey + '3', this.globalKey + '4'];

    this.synthUp = new Tone.PolySynth().connect(this.effectRack);
    this.synthUp.volume.value = volume + globalControls.volumes.pad;
    this.noteUp = [this.globalKey + '3', this.globalKey + '4', this.globalKey + '5'];

    this.synthDown = new Tone.PolySynth().connect(this.effectRack);
    this.synthDown.volume.value = volume + globalControls.volumes.pad;
    this.noteDown = [this.globalKey + '1', this.globalKey + '2', this.globalKey + '3'];

    this.setupSynthesizers();
    this.playHarmony();
    this.setupLFO();
    this.automateParameterChanges();
  }

  playHarmony() {
    this.synth.triggerAttack(this.note);
    this.synthUp.triggerAttack(this.noteUp);
    this.synthDown.triggerAttack(this.noteDown);
  }

  stopPad() {
    this.synth.triggerRelease(this.note);
    this.synthUp.triggerRelease(this.noteUp);
    this.synthDown.triggerRelease(this.noteDown);
  }

  initialize() {
    this.playHarmony();
    this.lfo.sync().start();
    this.automateParameterChanges();
  }

  setupSynthesizers() {
    this.updateSynthParams();
  }

  createNewRandomPad() {
    this.synth.dispose();
    this.synth = new Tone.PolySynth().connect(this.effectRack);
    this.synth.volume.value = globalControls.volumes.pad;

    this.synthUp.dispose();
    this.synthUp = new Tone.PolySynth().connect(this.effectRack);
    this.synthUp.volume.value = globalControls.volumes.pad;

    this.synthDown.dispose();
    this.synthDown = new Tone.PolySynth().connect(this.effectRack);
    this.synthDown.volume.value = globalControls.volumes.pad;

    this.setupSynthesizers();
    this.playHarmony();
  }

  updateSynthParams() {
    const params = this.generateRandomPadParams();
    this.synth.set(params);
    this.synthUp.set(params);
    this.synthDown.set(params);
  }

  generateRandomPadParams() {
    const octave = 2;

    return {
      oscillator: {
        type: this.randomOscillatorType(),
        harmonicity: Math.random() * 3 + 1,
        detune: Math.random() * 10 - 5,
      },
      filter: {
        type: 'lowpass',
        frequency: Math.random() * 500 + 200,
        rolloff: -12,
      },
      octave,
    };
  }

  randomOscillatorType() {
    const oscillatorTypes = ['triangle', 'sine', 'sawtooth', 'square'];
    return oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
  }

  setupLFO() {
    this.lfo = new Tone.LFO({
      type: 'sine',
      frequency: Math.random() * 0.05 + 0.01,
      min: 400,
      max: 2000,
      phase: Math.random() * 360,
    }).start();

    this.lfo.connect(this.effectRack.frequency);
  }

  automateParameterChanges() {
    const automationTime = 60;
    this.lfo.stop();
    this.lfo.phase = Math.random() * 360;
    this.lfo.start();

    setTimeout(() => {
      this.lfo.stop();
    }, automationTime * 1000);

    Tone.Transport.start();
  }
}

// Export the Pad class
window.Pad = Pad;
