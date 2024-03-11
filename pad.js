class Pad {
    constructor(volume, globalKey) {
        this.effectRack = new Tone.Filter({
            type: 'lowpass',
            frequency: 400,
            rolloff: -12,
        }).toDestination();

        const highPassFilter = new Tone.Filter({
            type: 'highpass',
            frequency: 300,
            rolloff: -12,
        });

        const reverb = new Tone.Reverb({
            decay: Math.random() * 10 + 1,
            wet: Math.random(),
        }).toDestination();

        const delay = new Tone.FeedbackDelay({
            delayTime: Math.random() * 0.5 + 0.1,
            feedback: Math.random() * 0.5,
        }).toDestination();

        const modulation = new Tone.Vibrato({
            maxDelay: Math.random() * 0.005 + 0.001,
            frequency: Math.random() * 0.1 + 1,
            depth: Math.random(),
        }).toDestination();

        this.effectRack.chain(highPassFilter, reverb, delay, modulation);

        this.synth = new Tone.PolySynth().connect(this.effectRack);
        this.synth.volume.value = volume + globalControls.volumes.pad;
        this.globalKey = globalKey;
        this.note = [this.globalKey + "2", this.globalKey + "3", this.globalKey + "4"];
        this.params = this.generateRandomPadParams();

        this.setupSynthesizer();
        this.playConstantMinorChord();
        this.setupLFO();
        this.automateParameterChanges();
    }

    playConstantMinorChord() {
        if (this.note.every((note) => note !== null)) {
            this.synth.triggerAttack(this.note);
        }
    }

    stopPad() {
        this.synth.triggerRelease(this.note);
    }

    initialize() {
        this.playConstantMinorChord();
    }

    generateRandomPadParams() {
        const octave = 3;

        return {
            oscillator: {
                type: this.randomOscillatorType(),
                modulationType: 'sine',
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

    updateSynthParams() {
        this.synth.set(this.params);
    }

    setupSynthesizer() {
        this.updateSynthParams();
    }

    createNewRandomPad() {
        this.synth.dispose();
        this.synth = new Tone.PolySynth().connect(this.effectRack);
        this.synth.volume.value = globalControls.volumes.pad;
        this.params = this.generateRandomPadParams();
        this.setupSynthesizer();
        this.playConstantMinorChord();
    }

    updateGlobalControls(newControls) {
        this.synth.dispose();
        Object.assign(globalControls, newControls);
        this.synth = new Tone.PolySynth().connect(this.effectRack);
        this.synth.volume.value = globalControls.volumes.pad;
        this.params = this.generateRandomPadParams();
        this.setupSynthesizer();
        this.playConstantMinorChord();
    }

    adjustSynthParams() {
        // Add any specific adjustments you want for the pad
    }

    randomOscillatorType() {
        const oscillatorTypes = ["triangle", "sine", "sawtooth", "square"];
        return oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
    }

    setupLFO() {
        // Create an LFO for the filter frequency
        this.lfo = new Tone.LFO({
            type: 'sine',
            frequency: 0.01, // Keep a low frequency for slow modulation
            min: 400, // Set the minimum frequency (closed position)
            max: 2000, // Set the maximum frequency (open position)
            phase: 180, // Start the LFO in the middle to go up and then down
        }).start().connect(this.effectRack.frequency);
    }

    automateParameterChanges() {
        const automationTime = 60;

        // Set the LFO to start at the minimum frequency and go to the maximum
        this.lfo.min = 400;
        this.lfo.max = 2000;

        // Schedule the LFO changes to repeat using Tone.Transport.scheduleRepeat
        Tone.Transport.scheduleRepeat((time) => {
            // Start the LFO at the specified time
            this.lfo.start(time);

            // Linearly ramp up the LFO frequency over the first half of the automation time
            this.lfo.frequency.rampTo(2000, time + automationTime / 2);

            // Stop the LFO after the first half of the automation time
            this.lfo.stop(time + automationTime / 2);

            // Linearly ramp down the LFO frequency over the second half of the automation time
            this.lfo.frequency.rampTo(400, time + automationTime);
        }, automationTime);

        // Start the Transport to trigger the scheduled changes
        Tone.Transport.start();
    }
}

// Instantiate the Pad class
const pad = new Pad(globalControls.volumes.pad, globalControls.globalKey);

// Export the pad instance for use in other files
window.pad = pad;
