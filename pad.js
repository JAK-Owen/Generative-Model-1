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
            wet: 0.9,
        }).toDestination();

        const delay = new Tone.FeedbackDelay({
            wet: 0.5,
            delayTime: Math.random() * 0.5 + 0.1,
            feedback: Math.random() * 0.5,
        }).toDestination();

        this.effectRack.chain(highPassFilter, reverb, delay);

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
        const octave = 2;

        return {
            oscillator: {
                type: this.randomOscillatorType(),
                Type: 'sine',
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
            min: 400, // Minimum filter frequency (closed position)
            max: 2000, // Maximum filter frequency (open position)
            phase: 180, // Start the LFO in the middle to go up and then down
        }).start();
        
        // Connect the LFO to the filter frequency
        this.lfo.connect(this.effectRack.frequency);
    }

    automateParameterChanges() {
        const automationTime = 60;
    
        // Schedule the filter frequency changes to repeat using Tone.Transport.scheduleRepeat
        Tone.Transport.scheduleRepeat((time) => {
            // Ensure the time is in the future
            const startTime = Math.max(time, Tone.now() + 0.01);
    
            // Schedule the linear ramp up and down for filter frequency
            this.effectRack.frequency.setValueAtTime(400, startTime);
            this.effectRack.frequency.linearRampToValueAtTime(2000, startTime + automationTime / 2);
            this.effectRack.frequency.linearRampToValueAtTime(400, startTime + automationTime);
        }, automationTime);
    
        // Start the Transport to trigger the scheduled changes
        Tone.Transport.start();
    }
    
}

// Instantiate the Pad class
const pad = new Pad(globalControls.volumes.pad, globalControls.globalKey);

// Export the pad instance for use in other files
window.pad = pad;
